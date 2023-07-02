import { RenderResult, render } from "@testing-library/react";
import { CartApi, ExampleApi } from "../api";
import { initStore } from "../store";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Product as ProductComponent } from "./Product";
import { Product } from "../../common/types";
import { useParams } from 'react-router';
import { Provider } from "react-redux";

jest.mock('../components/ProductDetails', () => ({
  ProductDetails: ({ product }: any) => <span>{product.id}</span>
}));

jest.mock('react-router', () => ({
  useParams: jest.fn()
}));

describe('Product', () => {
  let store: any;
  let mockApi: ExampleApi;
  let mockCart: CartApi;
  const mockProduct: Product = {
    id: 123,
    name: 'Лыжи',
    description: 'Красивые лыжи',
    material: 'Углеволокно',
    color: 'Сиреневый',
    price: 100500
  }
  let renderResult: RenderResult;

  beforeEach(() => {
    mockCart = {
      getState: jest.fn(() => []),
      setState: jest.fn(),
    };
    mockApi = {
      getProductById: jest.fn(() => Promise.resolve({
        data: mockProduct
      })),
    } as any;
    store = initStore(mockApi, mockCart);
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    renderResult = render(
      <Provider store={store}>
        <ProductComponent />
      </Provider>
    );
  });

  it('должны отображаться детали продукта', () => {
    expect(mockApi.getProductById).toHaveBeenCalledWith(1);
  });
});