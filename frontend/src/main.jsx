import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext/index.jsx";
import { PostsProvider } from "./contexts/postContext/PostContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsProvider>
        <RouterProvider router={router} />
      </PostsProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
