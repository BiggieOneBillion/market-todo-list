import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "../layout/root";
import { Dashboard, Welcome } from "../pages";
import ProtectedRoute from "../layout/ProtectedRoute";
import Marketlist from "../components/dashboard/marketlist/marketlist";
import UserMarketList from "../components/dashboard/usermarketlist/user-market-list";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Welcome />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Marketlist />} />
        <Route path="all/list" element={<UserMarketList />}/>
      </Route>
    </Route>
  )
);

export default router;
