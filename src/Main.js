import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { userDataLoad, dataLoad } from "./data/userData";
import firebase from "firebase/app";
import App from "./components/App";
import Detailpage from "./pages/Detailpage";
import Homepage from "./pages/Homepage";
import Uploadpage from "./pages/Uploadpage";
import Loginpage from "./pages/Loginpage";
import Mypage from "./pages/Mypage";
import Signuppage from "./pages/Signuppage";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Chatroom from "./pages/Chatroompage";
import useLoginInfo from "./customHook/useLoginInfo";

const GlobalStyle = createGlobalStyle`
  #root > .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .container a {
    color: white;
    text-decoration: none;
    padding: 0 10px;
  }

  .container > a {
    font-size: 21px;
    padding: 0;
    margin-right: 20px;
  }

  .cardList {
    flex-wrap: wrap;
    padding: 20px 0;
  }

  .cardList li {
    width: 90%;
    margin: 0 auto;
  }

  .list-group {
    width: 90%;
    padding: 20px 0;
    margin: 0 auto;
  }

  li {
    list-style: none;
  }

  .card-subtitle {
    float: right;
    font-size: 16px;
  }

  .cardFlex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px 0;
  }

  .card {
    max-width: 1000px;
    margin: 30px auto;
  }

  @media (min-width: 576px) {
    .container-sm,
    .cardList li {
      max-width: 800px;
    }
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0 0;
`;

function Main() {
  const [userUid] = useLoginInfo();
  const [userText, setUserText] = useState([]);

  useEffect(() => {
    (async function () {
      await userDataLoad();
      await setUserText(dataLoad());
    })();
  }, []);

  return (
    <HashRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage userText={userText} />} />
          <Route path={`/detail/:uid`} element={<Detailpage />} />
          <Route path="/upload" element={<Uploadpage />} />
          <Route path="/chatroom/:uid" element={<Chatroom myUid={userUid} />} />
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
