import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import LoginPage from "./pages/LoginPage";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Post from "./components/posts/Post";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
              
              <Route path="/Posts" element={<Post/>}/>
          </Route>
          <Route path="/signup" element={<SigninPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
