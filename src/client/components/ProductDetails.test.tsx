import { RenderResult, fireEvent, render } from "@testing-library/react";
import { ProductDetails } from "./ProductDetails";
import { Product } from "../../common/types";
import React from "react";
import { CartApi } from "../api";
import { initStore } from "../store";
import { Provider } from "react-redux";

jest.mock('./CartBadge', () => ({
  CartBadge: () => <span>Cart Badge Mock</span>
}));

describe('ProductDetails', () => {
  const mockProduct: Product = {
    id: 123,
    name: 'Лыжи',
    description: 'Красивые лыжи',
    material: 'Углеволокно',
    color: 'Сиреневый',
    price: 100500,
    variants: [
      { id: 0, displayText: 'Handmade' }
    ]
  }
  let renderResult: RenderResult;
  let mockCart: CartApi;

  beforeEach(() => {
    mockCart = {
      getState: jest.fn(() => ({})),
      setState: jest.fn()
    }
    const store = initStore({} as any, mockCart);
    renderResult = render(<Provider store={store}>
      <ProductDetails product={mockProduct} />
    </Provider>);
  });
  it('должен отображать имя продукта', () => {
    expect(renderResult.getByRole('heading').textContent).toBe(mockProduct.name);
  });
  it('должен отображать описание продукта', () => {
    expect(renderResult.getByText(mockProduct.description)).toBeDefined();
  });
  it('должен отображать цену продукта', () => {
    expect(renderResult.getByText('$' + mockProduct.price)).toBeDefined();
  });
  it('должен отображать цвет продукта', () => {
    expect(renderResult.getByText(mockProduct.color)).toBeDefined();
  });
  it('должен отображать материал продукта', () => {
    expect(renderResult.getByText(mockProduct.material)).toBeDefined();
  });
  it('должен отображать бейдж корзины', () => {
    expect(renderResult.getByText('Cart Badge Mock')).toBeDefined();
  });
  it('должен отображать кнопку добавить в корзину', () => {
    expect(renderResult.getByRole('button')).toBeDefined();
    expect(renderResult.getByRole('button').textContent).toBe('Add to Cart');
  });
  it('должен добавлять в корзину при нажатии Add to Cart', () => {
    fireEvent.click(renderResult.getByRole('button'));
    expect(mockCart.setState).toHaveBeenCalledWith({
      [mockProduct.id]: { name: mockProduct.name, price: mockProduct.price, count: 1 }
    });
  });
});