import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components";

import { Home, ProductsDetails } from "./pages";

import { ROUTES } from "./constants";

const { HOME, DETAILS } = ROUTES;

function App() {
  return (
    <>
      <Routes>
        <Route path={HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={DETAILS} element={<ProductsDetails />} />
        </Route>
        <Route path="*" element={<Navigate to={HOME} />} />
      </Routes>
    </>
  );
}

export default App;
