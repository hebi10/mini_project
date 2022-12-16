import styled from "styled-components";

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
  return (
    <>
      <H2>제작 중입니다. 기능이 작동을 안 할 수 있습니다.</H2>
      <Ol>
        <li>
          내가 쓴 글 : <strong>0</strong>
        </li>
        <li>
          추천 수 : <strong>0</strong>
        </li>
        <li>
          회원가입한 날짜 : <strong>2022.01.01</strong>
        </li>
      </Ol>
      <Ul>
        <li>내 글 일괄 삭제하기</li>
        <li>관리자에게 문의 남기기</li>
        <li>탈퇴하기</li>
      </Ul>
    </>
  );
}

export default Mypage;
