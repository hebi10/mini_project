import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { db } from "../data/userData";
import styled from "styled-components";

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

const Btn = styled(Button)`
  margin-right: 10px;
`;

const CardStyle = styled(Card)`
  position: relative;

  & .posiDiv {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
  }

  & .posiDiv img {
    width: 20%;
  }
`;

const CardDate = styled(Card)`
  opacity: 0.5;
  font-size: 8px;
  border: 0;
  margin: 10px 0;
`;

function CardList({ list, user, uid, navigate }) {
  const [change, setChange] = useState(false);
  const [changeText, setChangeText] = useState({
    title: list.title,
    text: list.text,
    imgURL: list.imgURL,
  });

  const handleDelete = () => {
    try {
      if (user.uid == uid) {
        db.collection("memo")
          .doc(user.uid)
          .collection("memoText")
          .doc(list.title)
          .delete()
          .then(() => {
            alert("삭제하였습니다.");
            window.location.reload(true);
          });
      } else {
        alert("게시글은 작성자와 관리자만 삭제 가능합니다.");
      }
    } catch (err) {
      alert("게시글은 작성자와 관리자만 삭제 가능합니다.");
      // console.error(err);
    }
  };

  const changeStart = () => {
    // onChange(item.id, changeText);

    try {
      if (user.uid == uid) {
        setChange(change ? false : true);
      } else {
        alert("게시글은 작성자와 관리자만 수정 가능합니다.");
      }
    } catch (err) {
      alert("게시글은 작성자와 관리자만 수정 가능합니다.");
      // console.error(err);
    }
  };

  const handleChange = async () => {
    await db
      .collection("memo")
      .doc(uid)
      .collection("memoText")
      .doc(list.title)
      .update(changeText);
    alert("수정이 완료되었습니다!");
    // setChange(false);
    await window.location.reload(true);
  };

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setChangeText((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleCencel = () => {
    setChange(false);
    setChangeText({
      title: list.title,
      text: list.text,
      imgURL: list.imgURL,
    });
  };

  const imgClick = (e) => {
    let { name } = e.target;

    setChangeText({
      ...changeText,
      imgURL: url[name],
    });
  };

  return (
    <>
      {change || (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={`${list.imgURL}`} />
          <Card.Body>
            <Card.Title>{list.title}</Card.Title>
            <Card.Text>{list.text}</Card.Text>
            <CardDate className="date">{list.date}</CardDate>
            <Btn variant="primary" onClick={changeStart}>
              수정
            </Btn>
            <Button variant="primary" onClick={handleDelete}>
              삭제
            </Button>
          </Card.Body>
        </Card>
      )}
      {change && (
        <CardStyle style={{ width: "18rem" }}>
          <Card.Img variant="top" src={`${changeText.imgURL}`} />
          <div className="posiDiv">
            <img
              src={url.img01}
              alt="고양이01"
              name="img01"
              onClick={imgClick}
            />
            <img
              src={url.img02}
              alt="고양이02"
              name="img02"
              onClick={imgClick}
            />
            <img
              src={url.img03}
              alt="고양이03"
              name="img03"
              onClick={imgClick}
            />
            <img
              src={url.img04}
              alt="고양이04"
              name="img04"
              onClick={imgClick}
            />
            <img
              src={url.img05}
              alt="고양이05"
              name="img05"
              onClick={imgClick}
            />
          </div>
          <Card.Body>
            <Card.Title>{list.title}</Card.Title>
            <Card.Text>
              <input
                value={changeText.text}
                onChange={handleOnChange}
                id="text"
              />
            </Card.Text>
            <Btn variant="primary" onClick={handleChange}>
              확인
            </Btn>
            <Button variant="primary" onClick={handleCencel}>
              취소
            </Button>
          </Card.Body>
        </CardStyle>
      )}
    </>
  );
}

export default CardList;
