import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BuilderProvider } from "./BuilderContext.jsx";

import CPU from "./pages/cpu";
import Motherboard from "./pages/mobo";
import Ram from "./pages/ram";
import SSD from "./pages/ssd";
import GPU from "./pages/gpu";
import PSU from "./pages/psu";
import Case from "./pages/case";
import AskAI from "./menu/askai";
import Builder from "./menu/pcbuilder";
import SearchedProducts from "./SearchedProducts.jsx";
import GlobalSearch from "./menu/GlobalSearch.jsx"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/CPU",
    element: <CPU />,
  },
  {
    path: "/Motherboard",
    element: <Motherboard />,
  },
  {
    path: "/Ram",
    element: <Ram />,
  },
  {
    path: "/SSD",
    element: <SSD />,
  },
  {
    path: "/GPU",
    element: <GPU />,
  },
  {
    path: "/PSU",
    element: <PSU />,
  },
  {
    path: "/Case",
    element: <Case />,
  },
  {
    path: "/global_search",
    element: <GlobalSearch />
  },
  {
    path: "/askai",
    element: <AskAI />
  },
  {
    path: "/builder",
    element: <Builder />
  },
  {
    path: "/searched_products",
    element: <SearchedProducts />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BuilderProvider>
      <RouterProvider router={router} />
    </BuilderProvider>
  </StrictMode>
);