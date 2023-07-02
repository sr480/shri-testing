import { render, waitFor, screen } from "@testing-library/react";
import { CartApi, ExampleApi } from "../api";
import { initStore } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import { Catalog } from "./Catalog";

jest.mock('../components/ProductItem', () => ({
  ProductItem: ({ product }: any) => <span>{product.id}</span>
}));

describe('Catalog', () => {
  let store: any;
  let mockApi: ExampleApi;
  let mockCart: CartApi;


  beforeEach(() => {
    mockCart = {
      getState: jest.fn(() => []),
      setState: jest.fn(),
    };
    mockApi = {
      getProducts: jest.fn(() => Promise.resolve({
        data: [
          { id: 'a' },
          { id: 'b' },
        ]
      })),
    } as any;
    store = initStore(mockApi, mockCart);
  });

  it('должен устанавливать title Catalog', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </BrowserRouter>
    );
    await waitFor(() => expect(global.window.document.title).toBe('Catalog'));
  });
  
  it('должен отображать сообщение о загрузке, а потом продукты', async () => {
    const { getAllByTestId, getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </BrowserRouter>
    );
    expect(mockApi.getProducts).toHaveBeenCalled();
    expect(getByText('LOADING')).toBeDefined();
    await waitFor(() => expect(getAllByTestId(/[ab]/i)).toBeDefined());
    expect(getAllByTestId(/[ab]/i).map(_=>_.textContent)).toEqual(['a', 'b']);
  });
});
