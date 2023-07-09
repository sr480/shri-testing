import { ApplicationState } from "./store";

const selectCart = (s: ApplicationState) => s.cart;
const selectCartItems = (s: ApplicationState) =>
  Object.values(selectCart(s));
export const selectIsProductInCart = (
  s: ApplicationState,
  id: number,
  variantId?: number
) => {
  if (variantId !== undefined) {
    return selectCartItems(s).some(
      (cartItem) => cartItem.id === id && cartItem.variant.id === variantId
    );
  }
  return selectCartItems(s).some((cartItem) => cartItem.id === id);
};
