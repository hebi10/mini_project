import firebase from "firebase/app";
import "firebase/firestore";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Loginpage() {
  const [newUser, setNewuser] = useState({
    nameNew: "",
    emailNew: "",
    pwNew: "",
  });

  const [user, setUser] = useState({
    emailNew: "",
    pwNew: "",
  });

  const newLoginClick = () => {
    console.log(newUser);
    let email = newUser.emailNew;
    let password = newUser.pwNew;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        result.user.updateProfile({ displayName: newUser.nameNew });
      });

    console.log("회원가입!");
  };

  const loginClick = () => {
    console.log(user);
    let email = user.emailNew;
    let password = user.pwNew;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
      });
    console.log("로그인!");
  };

  const loginOut = () => {
    firebase.auth().signOut();
    console.log("로그아웃!");
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
            placeholder="name"
            id="nameNew"
            onChange={handleChange}
            value={newUser.nameNew}
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
        <button
          onClick={loginClick}
          type="submit"
          className="btn btn-primary"
          id="login"
        >
          로그인 하기
        </button>
        <button
          onClick={loginOut}
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
