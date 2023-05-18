import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components";
import { Home, Inventory, Layout, Login, Purchases, Sales, System } from "./pages";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute element={<Layout />} path="/" />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/inventory",
        element: <ProtectedRoute element={<Inventory />} path="/inventory" />,
      },
      {
        path: "/purchases",
        element: <ProtectedRoute element={<Purchases />} path="/purchases" />,
      },
      {
        path: "/sales",
        element: <ProtectedRoute element={<Sales />} path="/sales" />,
      },
      {
        path: "/system",
        element: <ProtectedRoute element={<System />} path="/system" />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];

const router = createBrowserRouter(routes);

export { router };

