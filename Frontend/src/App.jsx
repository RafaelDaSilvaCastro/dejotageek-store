import "./index.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-4/5 mx-auto">
      <Outlet />
    </div>
  );
}

export default App;
