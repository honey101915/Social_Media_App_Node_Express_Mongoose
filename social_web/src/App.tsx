import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./route/AppRouter";


function App() {

  return (
    <div className="App" >
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;