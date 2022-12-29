import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../data/userData";
import { useParams } from "react-router-dom";

const H2 = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

const Ol = styled.ol`
  margin: 50px auto 20px;
  padding: 0;
  width: 90%;
  max-width: 700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  & li {
    padding: 10px 10px;
    text-align: center;
  }

  & li:hover {
  }
`;

const Ul = styled.ul`
  margin: 30px auto 0;
  padding: 10px 15px;
  width: 90%;
  max-width: 700px;
  border: 1px solid black;

  & li {
    padding: 30px 0;
    text-align: center;
    transition-duration: 0.2s;
    cursor: pointer;
  }

  & li:hover {
    background-color: lightgoldenrodyellow;
  }
`;

function Mypage() {
  const [userName, setUserName] = useState();
  const [myMemo, setMyMemo] = useState();
  const [recommend, setRecommend] = useState();
  const [date, setDate] = useState();
  let { uid } = useParams();

  useEffect(() => {
    db.collection("memo")
      .doc(uid)
      .get()
      .then((result) => {
        setUserName(result.data().userName);
        setRecommend(result.data().recommend);
        setDate(result.data().date);
      });

    db.collection("memo")
      .doc(uid)
      .collection("memoText")
      .get()
      .then((result) => {
        let data = [];
        result.forEach((doc, index) => {
          // console.log(doc.data());
          data.push(doc.data());
        });
        setMyMemo(data.length);
      });
  }, []);

  return (
    <>
      <H2>제작 중입니다. 기능이 작동을 안 할 수 있습니다.</H2>
      <H2>{userName}님의 페이지</H2>
      <Ol>
        <li>
          나의 메모 : <strong>{myMemo}</strong>
        </li>
        <li>
          추천 수 : <strong>{recommend}</strong>
        </li>
        <li>
          회원가입한 날짜 : <strong>{date}</strong>
        </li>
      </Ol>
      <Ul>
        <li>내 글 일괄 삭제하기 &#40;개발중&#41;</li>
        <li>관리자에게 문의 남기기 &#40;개발중&#41;</li>
        <li>탈퇴하기 &#40;개발중&#41;</li>
      </Ul>
    </>
  );
}

export default Mypage;
