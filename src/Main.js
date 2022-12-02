import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import Detailpage from "./pages/Detailpage";
import Homepage from "./pages/Homepage";
import Uploadpage from "./pages/Uploadpage";
import Loginpage from "./pages/Loginpage";
import { userData } from "./data/userData";
import mock from "./data/mock.json";

// console.log(userData);

function Main() {
  const [userText] = useState(userData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage userText={userText} />} />
          <Route path="/detail/:id" element={<Detailpage userText={mock} />} />
          <Route path="/upload" element={<Uploadpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route
            path="*"
            element={<div>요청하신 페이지를 찾을 수 없습니다.</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
