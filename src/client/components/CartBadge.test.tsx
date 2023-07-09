import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../api";
import { initStore } from "../store";
import { CartBadge } from "./CartBadge";

describe('CartBadge', () => {
  let mockApi: ExampleApi;
  let mockCart: CartApi;
  let store: any;
  beforeEach(() => {
    mockCart = {
      getState: jest.fn(() => ({
        1: { id: 1, name: 'foo', price: 100, count: 2, variant: { id: 1, displayText: 'Handmade' } },
      })),
      setState: jest.fn(),
    };
    mockApi = {} as any;
    store = initStore(mockApi, mockCart);
  });

  it('товар есть в корзине - бейдж отображается', () => {
    const renderResult = render(
      <Provider store={store}>
        <CartBadge id={1} />
      </Provider>
    );
    expect(renderResult.getByText('Item in cart')).toBeDefined();
  });
  it('товара нет в корзине - бейдж не отображается', () => {
    const renderResult = render(
      <Provider store={store}>
        <CartBadge id={2} />
      </Provider>
    );
    expect(renderResult.queryByText('Item in cart')).toBeFalsy();
  });
});
