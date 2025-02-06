import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.js";

// Pages & Components
import Home from "./pages/Home.js";
import Navbar from "./components/Navbar.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import NutrientIntake from "./pages/NutrientIntake.js"; // ✅ Fixed import name
import "./index.css";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Home - Redirect to login if not authenticated */}
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            
            {/* Login - Redirect to home if already authenticated */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            
            {/* Signup - Redirect to home if already authenticated */}
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            
            {/* Nutrient Intake - Redirect to login if not authenticated */}
            <Route path="/nutrient-intake" element={user ? <NutrientIntake /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
