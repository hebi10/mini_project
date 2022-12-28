import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { dataLoad } from "./data/userData";
import App from "./components/App";
import Detailpage from "./pages/Detailpage";
import Homepage from "./pages/Homepage";
import Uploadpage from "./pages/Uploadpage";
import Loginpage from "./pages/Loginpage";
import Mypage from "./pages/Mypage";
import Signuppage from "./pages/Signuppage";
import styled from "styled-components";

// console.log(userData);
const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0 0;
`;

function Main() {
  const [userText, setUserText] = useState([]);

  useEffect(() => {
    const userData = dataLoad();
    setUserText(userData);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage userText={userText} />} />
          <Route path={`/detail/:uid`} element={<Detailpage />} />
          <Route path="/upload" element={<Uploadpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/sign" element={<Signuppage />} />
          <Route path={`/mypage/:uid`} element={<Mypage />} />
          <Route
            path="*"
            element={<Div>홈을 눌러 메인 페이지로 이동하세요.</Div>}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default Main;
