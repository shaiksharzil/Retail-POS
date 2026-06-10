import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PosLayout from "./pages/PosLayout";
import ProductsPage from "./pages/ProductsPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import BillingPage from "./pages/BillingPage";
import SalesPage from "./pages/SalesPage";
import ReportsPage from "./pages/ReportsPage";
import AccountPage from "./pages/AccountPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/pos"
          element={<PosLayout />}
        >
          <Route
            path="dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="products"
            element={<ProductsPage />}
          />

          <Route
            path="inventory"
            element={<InventoryPage />}
          />

          <Route
            path="billing"
            element={<BillingPage />}
          />

          <Route
            path="sales"
            element={<SalesPage />}
          />

          <Route
            path="reports"
            element={<ReportsPage />}
          />
          <Route
                      path="account"
                      element={<AccountPage />}
                    />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;