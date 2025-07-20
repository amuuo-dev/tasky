import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Incomplete from "./pages/Incomplete";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Completed from "./pages/Completed";
import CreateTask from "./pages/CreateTask";

const App = () => {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoutes>
                <Incomplete />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/completed"
            element={
              <ProtectedRoutes>
                <Completed />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoutes>
                <CreateTask />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
