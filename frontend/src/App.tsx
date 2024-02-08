import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import { AppRoutes } from "./routes";
import store from "./store";

import "./styles/vars.css";
import "./styles/reset.css";
import "./styles/App.css";

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="403817981104-c7p383karn9jot2cl64rtupme8mdt2de.apps.googleusercontent.com">
        <Router>
          <AppRoutes />
        </Router>
        <ToastContainer position="bottom-center" />
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
