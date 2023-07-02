import axios from "axios";
import { CartApi, ExampleApi, LOCAL_STORAGE_CART_KEY } from "./api";
jest.mock("axios");
describe("ExampleApi", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("getProducts должен отправлять get запросы", async () => {
    const subject = new ExampleApi("base");
    (axios.get as jest.Mock).mockResolvedValue("fake products");
    expect(await subject.getProducts()).toBe("fake products");
    expect(axios.get).toHaveBeenCalledWith("base/api/products");
  });
  it("getProductById должен отправлять get запросы", async () => {
    const subject = new ExampleApi("base");
    (axios.get as jest.Mock).mockResolvedValue("fake product");
    expect(await subject.getProductById(123)).toBe("fake product");
    expect(axios.get).toHaveBeenCalledWith("base/api/products/123");
  });
  it("checkout должен отправлять post запрос", async () => {
    const subject = new ExampleApi("base");
    (axios.post as jest.Mock).mockResolvedValue("fake product");
    const expected = { form: 123, cart: 345 };
    expect(
      await subject.checkout(expected.form as any, expected.cart as any)
    ).toBe("fake product");
    expect(axios.post).toHaveBeenCalledWith("base/api/checkout", expected);
  });
});

describe("CartApi", () => {
  beforeAll(() => {
    const mockStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
    } as any;
    Object.defineProperty(window, "localStorage", { value: mockStorage });
  });

  it("корзина сохраняется в localStorage", () => {
    const subject = new CartApi();
    const expected = { foo: 123, boo: 123 };
    subject.setState(expected as any);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_CART_KEY,
      JSON.stringify(expected)
    );
  });
  it("корзина читается в localStorage", () => {
    const subject = new CartApi();
    const expected = { foo: 123, boo: 123 };

    (localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(expected)
    );

    const result = subject.getState();
    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY);
    expect(result).toEqual(expected);
  });

  it("если LS пуст, то возвращает пустой объект", () => {
    const subject = new CartApi();
    
    (localStorage.getItem as jest.Mock).mockReturnValue(undefined);

    const result = subject.getState();
    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY);
    expect(result).toEqual({});
  });

  it("если LS невалиден, то возвращает пустой объект", () => {
    const subject = new CartApi();
    
    (localStorage.getItem as jest.Mock).mockReturnValue('невалидный Джэйсон Стэтхэм');

    const result = subject.getState();
    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY);
    expect(result).toEqual({});
  });
});
