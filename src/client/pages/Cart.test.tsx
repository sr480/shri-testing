import { RenderResult, fireEvent, render, waitFor, within } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CartApi, ExampleApi } from "../api";
import { initStore } from "../store";
import { Cart } from "./Cart";

jest.mock('../components/Form', () => ({
  Form: ({ onSubmit }: any) => <button onClick={() => onSubmit({ fakeFormData: 'take my money' })}>Mock checkout form</button>
}));

describe('Cart', () => {
  let mockApi: ExampleApi;
  let mockCart: CartApi;
  let renderResult: RenderResult;

  describe('корзина пуста', () => {
    beforeEach(() => {
      mockCart = {
        getState: jest.fn(() => ({} as any)),
        setState: jest.fn(),
      };
      mockApi = {} as any;
      const store = initStore(mockApi, mockCart);
      renderResult = render(
        <BrowserRouter>
          <Provider store={store}>
            <Cart />
          </Provider>
        </BrowserRouter>
      );
    });

    it('должен устанавливать title Shopping cart', async () => {
      await waitFor(() => expect(global.window.document.title).toBe('Shopping cart'));
    });

    it('отображается Cart is empty', async () => {
      expect(renderResult.getByText(/Cart is empty.*/i)).toBeTruthy();
    });

    it('отображается ссылка на каталог', async () => {
      expect(renderResult.getByRole("link")).toBeTruthy();
      expect(renderResult.getByRole("link").getAttribute('href')).toBe('/catalog');
    });
    it('не отображается очистка корзины', () => {
      const clearButton = renderResult.queryByText('Clear shopping cart');
      expect(clearButton).toBeFalsy();
    })
    it('не отображается форма заказа', () => {
      const checkoutForm = renderResult.queryByText('Mock checkout form');
      expect(checkoutForm).toBeFalsy();
    })
  });

  describe('в корзине есть товары', () => {

    beforeEach(() => {
      mockCart = {
        getState: jest.fn(() => ({
          1: { id: 1, name: 'foo', price: 100, count: 2, variant: { id: 0, displayText: 'Handmade' } },
          2: { id: 2, name: 'boo', price: 50, count: 3, variant: { id: 1, displayText: 'Fabric' } },
        })),
        setState: jest.fn(),
      };
      mockApi = {
        checkout: jest.fn()
      } as any;
      const store = initStore(mockApi, mockCart);
      renderResult = render(
        <BrowserRouter>
          <Provider store={store}>
            <Cart />
          </Provider>
        </BrowserRouter>
      );
    });
    it('должны выводиться товары', () => {
      const cartItems = renderResult.getAllByTestId(/[12]/);
      expect(within(cartItems[0]).getByText('foo')).toBeTruthy();
      expect(within(cartItems[0]).getByText('$100')).toBeTruthy();
      expect(within(cartItems[0]).getByText('2')).toBeTruthy();
      expect(within(cartItems[0]).getByText('$200')).toBeTruthy();

      expect(within(cartItems[1]).getByText('boo')).toBeTruthy();
      expect(within(cartItems[1]).getByText('$50')).toBeTruthy();
      expect(within(cartItems[1]).getByText('3')).toBeTruthy();
      expect(within(cartItems[1]).getByText('$150')).toBeTruthy();
    });
    it('должна выводиться сумма', () => {
      expect(renderResult.getByText('$350')).toBeTruthy();
    });
    it('должна выводиться кнопка очистить корзину', () => {
      const clearButton = renderResult.getByText('Clear shopping cart');
      expect(clearButton).toBeTruthy();
      fireEvent.click(clearButton);
      expect(renderResult.queryAllByTestId(/[12]/)).toEqual([]);
    });
    it('должна выводиться форма заказа', () => {
      const checkoutForm = renderResult.getByText('Mock checkout form');
      expect(checkoutForm).toBeTruthy();
    });
    it('форма заказа - должна отправлять checkout запрос', async () => {
      const checkoutForm = renderResult.getByText('Mock checkout form');
      (mockApi.checkout as jest.Mock).mockResolvedValue({ data: { id: 123 } });
      fireEvent.click(checkoutForm);
      expect(mockApi.checkout).toHaveBeenCalledWith({ fakeFormData: 'take my money' }, expect.any(Object));
      await waitFor(() => expect(renderResult.getByText('Well done!')).toBeTruthy());
      expect(renderResult.getByText('123')).toBeTruthy();
      const alert = renderResult.getByText('Well done!').parentElement;
      expect(alert.classList).toContain('alert-success');
    });
    it('после отправки заказа должна очищаться корзина', async () => {
      (mockApi.checkout as jest.Mock).mockResolvedValue({ data: { id: 123 } });
      fireEvent.click(renderResult.getByText('Mock checkout form'));
      await waitFor(() => expect(renderResult.getByText('Well done!')).toBeTruthy());
      expect(mockCart.setState).toHaveBeenCalled();
    });
  })
});
