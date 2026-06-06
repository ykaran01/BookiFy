import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from './Redux/Store'
import { Provider } from 'react-redux'
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { BrowserRouter } from 'react-router-dom'

import "./index.css"
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
ReactDOM.createRoot(document.getElementById("root")).render(

  <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{ baseTheme: dark }}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>,
    </BrowserRouter>
  </ClerkProvider>

);

