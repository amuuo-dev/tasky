import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Task from "./pages/Task";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
                <Task />
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
