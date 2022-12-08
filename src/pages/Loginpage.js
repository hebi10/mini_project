import firebase from "firebase/app";
import "firebase/firestore";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styled from "styled-components";
import { db } from "../data/userData";

const Btn = styled.button`
  margin-right: 20px;
`;

function Loginpage() {
  const [newUser, setNewuser] = useState({
    nameNew: "",
    emailNew: "",
    pwNew: "",
    description: "",
    uid: "",
  });

  const [user, setUser] = useState({
    email: "",
    pw: "",
  });

  const newLoginClick = () => {
    // console.log(newUser);
    let email = newUser.emailNew;
    let password = newUser.pwNew;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        let today = new Date();
        console.log(result);
        result.user.updateProfile({ displayName: newUser.nameNew });
        db.collection("user")
          .doc(newUser.nameNew)
          .set({
            description: newUser.description,
            userName: newUser.nameNew,
            uid: result.user.uid,
            date: `${today.getFullYear()}.${
              today.getMonth() + 1
            }.${today.getDate()}`,
          });

        db.collection("memo")
          .doc(result.user.uid)
          .collection("memoText")
          .doc("가입을 환영합니다.")
          .set({
            imgURL: "https://via.placeholder.com/300",
            title: "가입을 환영합니다.",
            text: "기능들을 시험해 보세요!",
          });

        db.collection("memo").doc(result.user.uid).set({
          userName: newUser.nameNew,
        });
      });
  };

  const loginClick = () => {
    // console.log(user);
    let email = user.email;
    let password = user.pw;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // console.log(result.user);
        // window.location.reload();
      });
  };

  const logOut = () => {
    firebase.auth().signOut();
    window.location.reload(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewuser((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
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
      <div className="container mt-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="닉네임"
            id="nameNew"
            onChange={handleChange}
            value={newUser.nameNew}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="나를 설명해줄 한줄 적어주세요 :)"
            id="description"
            onChange={handleChange}
            value={newUser.description}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="email"
            id="emailNew"
            onChange={handleChange}
            value={newUser.emailNew}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="pw"
            id="pwNew"
            onChange={handleChange}
            value={newUser.pwNew}
          />
        </div>
        <button
          onClick={newLoginClick}
          type="submit"
          className="btn btn-primary"
          id="register"
        >
          가입하기
        </button>
      </div>
      <div className="container mt-3">
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
        <Btn
          onClick={loginClick}
          type="submit"
          className="btn btn-primary"
          id="login"
        >
          로그인 하기
        </Btn>
        <button
          onClick={logOut}
          type="submit"
          className="btn btn-primary"
          id="logout"
        >
          로그아웃 하기
        </button>
      </div>
    </>
  );
}

export default Loginpage;
