import { render, waitFor } from "@testing-library/react";
import { Contacts } from "./Contacts";
import React from "react";
describe('Contacts', () => {
  it('должен устанавливать title Contacts', async () => {
    render(<Contacts />);
    await waitFor(() => expect(global.window.document.title).toBe('Contacts'));
  });
  it('должна визуализоваться контактная информация', () => {
    const renderResult = render(<Contacts />);
    expect(renderResult.getByRole('heading').textContent).toBe('Contacts');
  })
});