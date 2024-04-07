import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ReportIncident from "./pages/ReportIncident";
import NavigationBar from "./components/NavBar";
import { useAuth } from "./Auth/Authentication";
import Incidents from "./pages/Incidents";
import IncidentDetails from "./pages/IncidnetDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import GetIncidentsReportedByUser from "./pages/GeIncidentsReportedByUser";
import AuthCodeEntry from "./Auth/AuthCodeEntry";
import FA from "./pages/2FA";
import "./App.css";
import TokenValidation from "./Auth/TokenValidation";

const MemoizedNavigationBar = React.memo(NavigationBar);

function App() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {}, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <MemoizedNavigationBar />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/report"
            element={isLoggedIn ? <ReportIncident /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/incidents/:email"
            element={
              isLoggedIn ? (
                <GetIncidentsReportedByUser />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/update-profile"
            element={isLoggedIn ? <UpdateProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/2fa-activate"
            element={isLoggedIn ? <FA /> : <Navigate to="/login" />}
          />
          <Route
            path="/authenticate"
            element={isLoggedIn ? <AuthCodeEntry /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/incident-details/:id" element={<IncidentDetails />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/not-found" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
