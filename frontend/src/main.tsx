import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "./app";
import { Icon } from "./components/common/icon";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      test
      <Icon name={"sun-cloud"} />
      <App />
    </Provider>
  </StrictMode>,
);
