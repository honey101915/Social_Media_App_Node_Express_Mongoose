import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppRouter from "./route/AppRouter";

function App() {

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;