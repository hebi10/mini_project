import { useState } from "react";
import firebase from "firebase/app";
import { db } from "../data/userData";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Btn01 = styled.button`
  width: 49%;
  margin-right: 2%;
`;

const Btn02 = styled.button`
  width: 49%;
`;

function Signuppage() {
  const [newUser, setNewuser] = useState({
    nameNew: "",
    emailNew: "",
    pwNew: "",
    description: "",
    uid: "",
  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewuser((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
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
            imgURL:
              "https://firebasestorage.googleapis.com/v0/b/with-react-a047a.appspot.com/o/image%2Fbg01.jpg?alt=media&token=403e8795-88de-4929-9c40-ef111bd5e19c",
            title: "가입을 환영합니다.",
            text: "기능들을 시험해 보세요!",
            date: `
            ${today.getFullYear()}
            .${today.getMonth() + 1}
            .${today.getDate()}
            .${today.toLocaleTimeString("ko-kr")}
            `,
          });

        db.collection("memo").doc(result.user.uid).set({
          userName: newUser.nameNew,
        });

        alert("가입이 완료 되었습니다! 로그인 후 이용해주세요 :)");

        navigate("/login");
      })
      .catch(() => {
        alert("이메일 형식에 맞는지\n비밀번호가 6자리 넘는지 확인해주세요.");
      });
  };

  return (
    <Fieldset className="container mt-3">
      <legend>회원가입</legend>
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
      <Btn01
        onClick={newLoginClick}
        type="submit"
        className="btn btn-primary"
        id="register"
      >
        가입하기
      </Btn01>
      <Btn02
        onClick={() => {
          navigate("/login");
        }}
        type="submit"
        className="btn bg-info text-white"
        id="logout"
      >
        로그인 바로가기
      </Btn02>
    </Fieldset>
  );
}

export default Signuppage;
