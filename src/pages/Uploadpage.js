import { useState } from "react";
import { db } from "../data/userData";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useLoginInfo from "../customHook/useLoginInfo";

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
    background: url(${url.img01}) no-repeat center / contain;
  }
  & label:nth-of-type(2) {
    background: url(${url.img02}) no-repeat center / contain;
  }
  & label:nth-of-type(3) {
    background: url(${url.img03}) no-repeat center / contain;
  }
  & label:nth-of-type(4) {
    background: url(${url.img04}) no-repeat center / contain;
  }
  & label:nth-of-type(5) {
    background: url(${url.img05}) no-repeat center / contain;
  }
`;

let today = new Date();

function Upload() {
  const [userUid, userName] = useLoginInfo();
  let navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    text: "",
    imgURL:
      "https://firebasestorage.googleapis.com/v0/b/with-react-a047a.appspot.com/o/image%2Fbg01.jpg?alt=media&token=403e8795-88de-4929-9c40-ef111bd5e19c",
    date: `
      ${today.getFullYear()}
      .${today.getMonth() + 1}
      .${today.getDate()}
      .${today.toLocaleTimeString("ko-kr")}
      `,
  });

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

  const upload = async () => {
    await db
      .collection("memo")
      .doc(JSON.parse(localStorage.getItem(userName)).uid)
      .collection("memoText")
      .doc(data.title)
      .set(data)
      .then(() => {
        alert("????????? ?????? ???????????????.");
        navigate(`/detail/${userUid}`);
      })
      .catch((err) => {
        alert("????????? ??? ?????? ???????????????.");
        navigate(`/login`);
        console.log(err);
      });

    await window.location.reload(true);
  };

  return (
    <div className="container mt-3">
      <H2>????????? ???????????????!</H2>
      <input
        type="text"
        className="form-control mt-2"
        placeholder="??????"
        id="title"
        onChange={handleChange}
        value={data.title}
      />
      <input
        type="text"
        className="form-control mt-2"
        placeholder="??????"
        id="text"
        onChange={handleChange}
        value={data.text}
      />
      <H3>???????????? ?????????????????? :&#41;</H3>
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
        ?????????
      </button>
    </div>
  );
}

export default Upload;
