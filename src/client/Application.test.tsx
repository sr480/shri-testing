import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Application } from './Application';
import { CartApi } from './api';
import { initStore } from './store';

describe('Application', () => {
  let store: any;
  let mockCart: CartApi;

  beforeEach(() => {
    mockCart = {
      getState: jest.fn(() => ({})),
      setState: jest.fn(),
    };
    store = initStore({} as any, mockCart);
  });

  it('выводится меню', () => {
    const { getByText, getByTestId, getByLabelText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    expect(getByText('Example store')).toBeDefined();
    expect(getByText('Catalog')).toBeDefined();
    expect(getByText('Delivery')).toBeDefined();
    expect(getByText('Contacts')).toBeDefined();
    expect(getByText('Cart')).toBeDefined();
    expect(getByTestId('menu')).toBeDefined();
    expect(getByLabelText('Toggle navigation')).toBeDefined();
  });

  it('меню разворачивается и сворачивается', () => {
    const { getByLabelText, getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    expect(getByTestId('menu').classList).toContain('collapse');
    const toggler = getByLabelText('Toggle navigation');
    fireEvent.click(toggler);

    expect(getByTestId('menu').classList).not.toContain('collapse');
  });

  it('меню сворачивается по нажатию на ссылку', () => {
    const { getByLabelText, getByTestId, getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    const toggler = getByLabelText('Toggle navigation');
    fireEvent.click(toggler);
    fireEvent.click(getByText('Catalog'));
    expect(getByTestId('menu').classList).toContain('collapse');
    expect(window.location.pathname).toBe('/catalog');
  });

  it('отображается количество товаров в корзине', () => {
    (mockCart.getState as jest.Mock).mockReturnValue({
      1: { name: 'Шашлык', price: '500', count: 20 }
    });
    store = initStore({} as any, mockCart);

    const { getByTestId } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );
    expect(mockCart.getState).toHaveBeenCalled();
    expect(getByTestId('cart-link').textContent).toBe('Cart (1)'); 
  });
});
