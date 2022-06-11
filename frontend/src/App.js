import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Pages from "./Pages/index";
import Components from "./Components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      {isAuthenticated && <Components.Navbar />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Pages.Home /> : <Pages.LoginRegister />}
        />
        <Route
          path="/profile/:id"
          element={isAuthenticated ? <Pages.Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <Pages.Settings /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Pages.NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
