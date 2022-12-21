import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const Btn01 = styled.button`
  width: 49%;
  margin-right: 2%;
`;

const Btn02 = styled.button`
  width: 49%;
`;

const Fieldset = styled.fieldset`
  border: 1px solid black;
  padding: 20px 40px;
  box-sizing: border-box;
  border-radius: 8px;

  & legend {
    margin-bottom: 15px;
  }

  & button {
    margin-bottom: 10px;
  }
`;

const Footer = styled.footer`
  & a {
    color: black;
  }
`;

function Loginpage() {
  const [user, setUser] = useState({
    email: "",
    pw: "",
  });
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
      }
    });
  }, []);

  const loginClick = async () => {
    // console.log(user);
    let email = user.email;
    let password = user.pw;

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // console.log(result.user);
        alert("로그인이 완료되었습니다.\n사용 후 로그아웃 부탁드립니다 :)");
        navigate(`/`);
      })
      .catch(() => {
        alert("아이디 비밀번호가 맞는지, 로그아웃이 되었는지 확인해주세요.");
      });

    await window.location.reload(true);
  };

  const logOut = async () => {
    if (login) {
      await firebase.auth().signOut();
      await alert("로그아웃이 완료되었습니다.");
      await window.location.reload(true);
    } else {
      alert("로그인 후 이용 바랍니다.");
      await window.location.reload(true);
    }
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setUser((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <>
      <Card>
        <Card.Header>테스트용계정 아이디입니다.</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              아이디: test@naver.com
              <br />
              비밀번호: 123456
            </p>
            <Footer className="blockquote-footer">
              <a
                href="https://github.com/hebi10/mini_project"
                target="_blank"
                rel="noopener noreferrer"
              >
                github 바로가기 &#40;코드 보기&#41;
              </a>
            </Footer>
          </blockquote>
        </Card.Body>
      </Card>
      <Fieldset className="container mt-3">
        <legend>로그인</legend>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="email"
            id="email"
            onChange={handleLoginChange}
            value={user.email}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="pw"
            id="pw"
            onChange={handleLoginChange}
            value={user.pw}
          />
        </div>
        <Btn01
          onClick={loginClick}
          type="submit"
          className="btn btn-primary"
          id="login"
        >
          로그인 하기
        </Btn01>
        <Btn02
          onClick={logOut}
          type="submit"
          className="btn bg-info text-white"
          id="logout"
        >
          로그아웃 하기
        </Btn02>
        <div className="d-grid gap-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              navigate("/sign");
            }}
          >
            회원가입
          </Button>
        </div>
      </Fieldset>
    </>
  );
}

export default Loginpage;
