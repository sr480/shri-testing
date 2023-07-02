import { render, screen, waitFor } from "@testing-library/react";
import { Home } from "./Home";
import React from "react";

describe('Home', () => {
  it('должен устанавливать title Welcome', async () => {
    render(<Home/>);
    await waitFor(() => expect(global.window.document.title).toBe('Welcome'));
  });
  it('должен что-то отображать', () => {
    const {getByText} = render(<Home/>);
    expect(getByText('Welcome to Example store!')).toBeDefined();
  });
});