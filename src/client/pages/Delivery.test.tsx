import { render, waitFor } from "@testing-library/react";
import React from "react";
import { Delivery } from "./Delivery";
describe('Delivery', () => {
  it('должен устанавливать title Delivery', async () => {
    render(<Delivery />);
    await waitFor(() => expect(global.window.document.title).toBe('Delivery'));
  });
  it('должна визуализоваться информация о доставке', () => {
    const renderResult = render(<Delivery />);
    expect(renderResult.getByRole('heading').textContent).toBe('Delivery');
  })
});