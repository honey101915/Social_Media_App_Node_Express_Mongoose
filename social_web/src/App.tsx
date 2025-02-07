import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./route/AppRouter";
import { useEffect } from "react";
import { getUserData } from "./utils/LocalStorage";
import { saveUserDataToRedux } from "./redux/reduxActions/authActions";


const App = () => {

  useEffect(() => {
    _getUserData()
  }, [])

  const _getUserData = async () => {
    try {
      const _userdata = await getUserData()
      console.log(_userdata, "_userdata_userdata");

      saveUserDataToRedux(_userdata || null)
    } catch (error) {

      console.error('Caught error:', error);
    }
  }

  return (
    <div className="App" >
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;