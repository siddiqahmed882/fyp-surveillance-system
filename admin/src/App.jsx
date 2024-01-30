import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Reviews from "./scenes/reviews";
import SingleCustomer from "./scenes/singleCustomer";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import LiveRides from "./scenes/liveRides";
import PendingRides from "./scenes/pendingRides";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import Breakdown from "./scenes/breakdown";
import SharedRides from "./scenes/sharedRides";
import RapidRides from "./scenes/rapidRides";
import SingleRide from "./scenes/singleRide";
import Discount from "./scenes/discount";
import Login from "./scenes/login";
import TopUp from "./scenes/topUp";
import SingleTopUp from "./scenes/singleTopUp";
import Report from "./scenes/reports";
import SingleReport from "./scenes/singleReport";
import CustomerCare from "./scenes/customerCare";
import { setAuthToken } from "./state/index";
import UserRooms from "./scenes/userRooms";
import AccessLinks from "./scenes/accessLinks";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/">
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route
                    path="/customers"
                    element={
                      <Customers userType={"Customers"} role={"customers"} />
                    }
                  />
                  <Route
                    path="/user-rooms"
                    element={
                      <UserRooms
                        userType={"Users Rooms"}
                        role={"Users Rooms"}
                      />
                    }
                  />
                  <Route
                    path="/access-links"
                    element={
                      <AccessLinks
                        userType={"Access Links"}
                        role={"Access Links"}
                      />
                    }
                  />
                  <Route
                    path="/single-customer/:id"
                    element={<SingleCustomer />}
                  />
                  <Route path="/shared-rides" element={<SharedRides />} />
                  <Route path="/rapid-rides" element={<RapidRides />} />
                  <Route path="/single-ride/:id" element={<SingleRide />} />
                  <Route path="/live-rides" element={<LiveRides />} />
                  <Route
                    path="/pending-rides"
                    element={<PendingRides rideType={"Shared"} />}
                  />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/daily" element={<Daily />} />
                  <Route path="/monthly" element={<Monthly />} />
                  <Route path="/breakdown" element={<Breakdown />} />
                  <Route path="/discount" element={<Discount />} />
                  <Route path="/customer-care" element={<CustomerCare />} />
                  <Route path="/top-up" element={<TopUp />} />
                  <Route path="/single-top-up/:id" element={<SingleTopUp />} />
                  <Route path="/reports" element={<Report />} />
                  <Route path="/single-report/:id" element={<SingleReport />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

function GuestRoute() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.global.authToken);
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const tokenFromLocalStorage = localStorage.getItem("token");
  if (tokenFromLocalStorage) {
    dispatch(setAuthToken(tokenFromLocalStorage));

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

function ProtectedRoute() {
  const dispatch = useDispatch();
  let token = useSelector((state) => state.global.authToken);
  if (!token) {
    token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    dispatch(setAuthToken(token));
  }

  return <Outlet />;
}

export default App;
