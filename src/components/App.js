import { Outlet } from "react-router-dom";
import Navber from "./Navber";

function App() {
  return (
    <>
      <Navber />
      <Outlet />
    </>
  );
}

export default App;
