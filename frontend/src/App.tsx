import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Header from "./components/Header";
const App = () => {
  return (
    <>
      <Header />
      <div>
        <Home />
      </div>
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
    </>
  );
};

export default App;
