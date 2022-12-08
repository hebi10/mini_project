import { useState } from "react";
import { db, storage } from "../data/userData";
import firebase from "firebase/app";

function Upload() {
  const [userName, setUserName] = useState("게스트");
  const [data, setData] = useState({
    title: "",
    text: "",
    imgURL: "https://via.placeholder.com/300",
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUserName(user.displayName);
    }
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleImgChange = (e) => {
    let file = document.querySelector("#image").files[0];
    let storageRef = storage.ref();
    let path = storageRef.child("image/" + userName);
    let work = path.put(file);

    work.on(
      "state_changed",
      null,
      (error) => {
        console.error("실패사유는", error);
      },
      () => {
        work.snapshot.ref.getDownloadURL().then((url) => {
          // console.log("업로드된 경로는", url);
          setData((prevValues) => ({
            ...prevValues,
            imgURL: url,
          }));
        });
      }
    );
  };

  const upload = () => {
    db.collection("memo")
      .doc(JSON.parse(localStorage.getItem(userName)).uid)
      .collection("memoText")
      .doc(data.title)
      .set(data);
  };

  return (
    <div className="container mt-3">
      <input
        className="form-control mt-2"
        type="file"
        id="image"
        onChange={handleImgChange}
      />
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
      <button className="btn btn-danger mt-3" id="send" onClick={upload}>
        올리기
      </button>
    </div>
  );
}

export default Upload;
