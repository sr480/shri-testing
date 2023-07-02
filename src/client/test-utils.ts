import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { initStore } from "./store";

// export const renderWithMockStore = (
//   component: React.ReactElement,
//   initialState = {},
//   options = {}
// ) => {
//   const store = initStore();

//   const Wrapper = ({ children }: { children: ReactNode }) => (
//     <Provider store={store}>{children}</Provider>
//   );

//   return render(component, { wrapper: Wrapper, ...options });
// };
