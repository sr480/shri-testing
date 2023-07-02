import { RenderResult, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { Form } from "./Form";
import React from "react";
describe('Form', () => {
  let renderResult: RenderResult;
  let submitCallback: jest.Mock;
  beforeEach(() => {
    submitCallback = jest.fn();
    renderResult = render(<Form onSubmit={submitCallback} />);
  });
  it('должна выводиться пустая форма', () => {
    const nameInput = renderResult.getByTestId('f-name') as HTMLInputElement;
    expect(nameInput).toBeDefined();
    expect(nameInput.value).toEqual('');

    const phoneInput = renderResult.getByTestId('f-phone') as HTMLInputElement;
    expect(phoneInput).toBeDefined();
    expect(phoneInput.value).toEqual('');

    const addressInput = renderResult.getByTestId('f-address') as HTMLTextAreaElement;
    expect(addressInput).toBeDefined();
    expect(addressInput.value).toEqual('');

    expect(renderResult.getByRole('button').textContent).toBe('Checkout');
  });

  it('имя не должно быть пустым', async () => {
    const nameInput = renderResult.getByTestId('f-name') as HTMLInputElement;
    const submit = renderResult.getByRole('button');
    await userEvent.type(nameInput, '    ');
    await userEvent.click(submit);
    expect(nameInput.classList).toContain('is-invalid');
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.click(submit);
    expect(nameInput.classList).not.toContain('is-invalid');
  });

  it('телефон не должен быть пустым и соотевтствует маске', async () => {
    const phoneInput = renderResult.getByTestId('f-phone') as HTMLInputElement;
    const submit = renderResult.getByRole('button');
    await userEvent.type(phoneInput, '    ');
    await userEvent.click(submit);
    expect(phoneInput.classList).toContain('is-invalid');

    await userEvent.type(phoneInput, '(123)-345-678-1234');
    await userEvent.click(submit);
    expect(phoneInput.classList).not.toContain('is-invalid');

    await userEvent.type(phoneInput, '123-345-678-1234');
    await userEvent.click(submit);
    expect(phoneInput.classList).not.toContain('is-invalid');

    await userEvent.type(phoneInput, '123 345 678 1234');
    await userEvent.click(submit);
    expect(phoneInput.classList).not.toContain('is-invalid');

    await userEvent.type(phoneInput, '(123) 345 678 1234');
    await userEvent.click(submit);
    expect(phoneInput.classList).not.toContain('is-invalid');

    await userEvent.type(phoneInput, '(123)345-678-1234');
    await userEvent.click(submit);
    expect(phoneInput.classList).not.toContain('is-invalid');
  });

  it('адрес не должен быть пустым', async () => {
    const addressInput = renderResult.getByTestId('f-address') as HTMLInputElement;
    const submit = renderResult.getByRole('button');
    await userEvent.type(addressInput, '    ');
    await userEvent.click(submit);
    expect(addressInput.classList).toContain('is-invalid');
    await userEvent.type(addressInput, 'NY, Foo street');
    await userEvent.click(submit);
    expect(addressInput.classList).not.toContain('is-invalid');
  });

  it('невалидная форма не должна отправляться', async () => {
    const submit = renderResult.getByRole('button');
    await userEvent.click(submit);
    expect(submitCallback).not.toHaveBeenCalled();
    expect(submit.getAttribute('disabled')).toBeDefined();
  });

  it('валидная форма вызывает колбэк и тримирует все поля', async () => {
    const nameInput = renderResult.getByTestId('f-name') as HTMLInputElement;
    const phoneInput = renderResult.getByTestId('f-phone') as HTMLInputElement;
    const addressInput = renderResult.getByTestId('f-address') as HTMLTextAreaElement;
    const submit = renderResult.getByRole('button');

    const expected = {
      name: 'John Doe',
      phone: '123 345 678 1234',
      address: 'N'
    }

    await userEvent.type(nameInput, expected.name);
    await userEvent.type(phoneInput, expected.phone);
    await userEvent.type(addressInput, expected.address);

    await userEvent.click(submit);
    expect(submitCallback).toHaveBeenCalledWith(expected);
    expect(submit.getAttribute('disabled')).toBeDefined();
  });
});