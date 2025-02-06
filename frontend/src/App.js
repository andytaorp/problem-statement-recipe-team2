import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.js";

// Pages & Components
import Home from "./pages/Home.js";
import Navbar from "./components/Navbar.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import NutritionIntake from "./pages/NutritionIntake.js"; // Import Nutrition Intake page
import "./index.css";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/nutrition-intake"
              element={user ? <NutritionIntake /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

