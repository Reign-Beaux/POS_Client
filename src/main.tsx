import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { ConfigStore } from "./redux";
import './style.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={ConfigStore}>
    <App />
  </Provider>
);
