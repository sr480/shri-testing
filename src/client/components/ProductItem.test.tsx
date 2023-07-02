import { RenderResult, render, within } from "@testing-library/react";
import { ProductItem } from "./ProductItem";
import React from "react";
import { ProductShortInfo } from "../../common/types";
import { BrowserRouter } from "react-router-dom";

jest.mock('./CartBadge', () => ({
  CartBadge: () => <span>Cart Badge Mock</span>
}));

describe('ProductItem', () => {
  const mockProduct: ProductShortInfo = {
    id: 123,
    name: 'Лыжная маска',
    price: 321,
  }
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<BrowserRouter>
      <ProductItem product={mockProduct} />
    </BrowserRouter>);
  })

  it('должен отображать карточку товара', () => {
    const cardContainer = renderResult.getByTestId(mockProduct.id);
    expect(cardContainer).toBeDefined();
    expect(cardContainer.classList).toContain('card');
  });
  it('должен отображать картинку товара', () => {
    expect(renderResult.getByRole('img')).toBeDefined();
  });
  it('должен отображать имя товара', () => {
    expect(renderResult.getByRole('heading').textContent).toBe(mockProduct.name);
  });
  it('должен отображать цену товара', () => {
    expect(renderResult.getByText(`$${mockProduct.price}`)).toBeDefined();
  });
  it('должен отображать ссылку на детали товара', () => {
    expect(renderResult.getByRole('link')).toBeDefined();
    expect(renderResult.getByRole('link').getAttribute('href')).toBe(`/catalog/${mockProduct.id}`);
  });
  it('должен отображать бейджик корзины', () => {
    expect(renderResult.getByText('Cart Badge Mock')).toBeDefined();
  });
});