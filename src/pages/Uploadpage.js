import { useState, useEffect } from "react";
import { db, storage } from "../data/userData";
import firebase from "firebase/app";
import styled from "styled-components";
import images01 from "../images/bg01.jpg";
import images02 from "../images/bg02.jpg";
import images03 from "../images/bg03.jpg";
import images04 from "../images/bg04.jpg";
import images05 from "../images/bg05.jpg";

const IMG = {
  bg01: images01,
  bg02: images02,
  bg03: images03,
  bg04: images04,
  bg05: images05,
};

const H2 = styled.h2`
  margin: 24px 0 8px;
  fint-size: 14px;
  background-color: lightblue;
  padding: 2px 4px;
  display: inline-block;
  border-radius: 3px;
`;

const H3 = styled.h3`
  margin: 24px 0 8px;
  fint-size: 12px;
  background-color: lightcyan;
  padding: 2px 4px;
  display: inline-block;
  border-radius: 3px;
`;

const InputBox = styled.div`
  & input {
    display: none;
  }

  & label {
    width: 80px;
    height: 80px;
    margin: 10px;
    cursor: pointer;
  }

  & input:checked + label {
    border: 3px solid green;
    box-sizing: border-box;
  }

  & label:nth-of-type(1) {
    background: url(${IMG.bg01}) no-repeat center / contain;
  }
  & label:nth-of-type(2) {
    background: url(${IMG.bg02}) no-repeat center / contain;
  }
  & label:nth-of-type(3) {
    background: url(${IMG.bg03}) no-repeat center / contain;
  }
  & label:nth-of-type(4) {
    background: url(${IMG.bg04}) no-repeat center / contain;
  }
  & label:nth-of-type(5) {
    background: url(${IMG.bg05}) no-repeat center / contain;
  }
`;

function Upload() {
  const [userName, setUserName] = useState("게스트");
  const [data, setData] = useState({
    title: "",
    text: "",
    uid: firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.uid);
      }
    }),
    imgURL:
      "https://firebasestorage.googleapis.com/v0/b/with-react-a047a.appspot.com/o/image%2Falvan-nee-ZCHj_2lJP00-unsplash.jpg?alt=media&token=bc0fbf3c-3f06-43db-b10d-4792f06f5678",
  });

  const url = {
    img01:
      "https://firebasestorage.googleapis.com/v0/b/with-react-a047a.appspot.com/o/image%2Fbg01.jpg?alt=media&token=403e8795-88de-4929-9c40-ef111bd5e19c",
    img02:
      "https://firebasestorage.googleapis.com/v0/b/with-react-a047a.appspot.com/o/image%2Fbg02.jpg?alt=media&token=097eaf6c-acf2-4927-8ed5-e6e47db8228f",
    img03:
      "https://firebasestorage.googleapis.com/v0/b/with-react-a047a.appspot.com/o/image%2Fbg03.jpg?alt=media&token=4c31e2ff-00e5-4df3-b5fc-2181cb1eff08",
    img04:
      "https://firebasestorage.googleapis.com/v0/b/with-react-a047a.appspot.com/o/image%2Fbg04.jpg?alt=media&token=0dd70d57-36cb-42a5-abdf-259353a7a002",
    img05:
      "https://firebasestorage.googleapis.com/v0/b/with-react-a047a.appspot.com/o/image%2Fbg05.jpg?alt=media&token=59ac1369-bba6-4f25-9ac3-5c01a606deeb",
  };

  useEffect(
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      }
    }),
    []
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const imgChacked = (e) => {
    const chack = e.target.value;
    const imgChack = url[chack];

    setData((prevValues) => ({
      ...prevValues,
      imgURL: imgChack,
    }));
  };

  const upload = () => {
    db.collection("memo")
      .doc(JSON.parse(localStorage.getItem(userName)).uid)
      .collection("memoText")
      .doc(data.title)
      .set(data)
      .then(() => {
        alert("업로드 완료 되었습니다.");
        window.location.reload(true);
      });
  };

  return (
    <div className="container mt-3">
      <H2>기록을 남겨보세요!</H2>
      <input
        type="text"
        className="form-control mt-2"
        placeholder="제목"
        id="title"
        onChange={handleChange}
        value={data.title}
      />
      <input
        type="text"
        className="form-control mt-2"
        placeholder="내용"
        id="text"
        onChange={handleChange}
        value={data.text}
      />
      <H3>이미지를 선택해주세요 :&#41;</H3>
      <InputBox>
        <input
          name="imgBg"
          type="radio"
          value="img01"
          img="bg01"
          id="bg01"
          onChange={imgChacked}
        />
        <label htmlFor="bg01"></label>
        <input
          name="imgBg"
          type="radio"
          value="img02"
          img="bg02"
          id="bg02"
          onChange={imgChacked}
        />
        <label htmlFor="bg02"></label>
        <input
          name="imgBg"
          type="radio"
          value="img03"
          img="bg03"
          id="bg03"
          onChange={imgChacked}
        />
        <label htmlFor="bg03"></label>
        <input
          name="imgBg"
          type="radio"
          value="img04"
          img="bg04"
          id="bg04"
          onChange={imgChacked}
        />
        <label htmlFor="bg04"></label>
        <input
          name="imgBg"
          type="radio"
          value="img05"
          img="bg05"
          id="bg05"
          onChange={imgChacked}
        />
        <label htmlFor="bg05"></label>
      </InputBox>
      <button className="btn btn-danger mt-3" id="send" onClick={upload}>
        올리기
      </button>
    </div>
  );
}

export default Upload;