import { useCallback, useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import { db } from "../data/userData";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useLoginInfo from "../customHook/useLoginInfo";

const Room = styled.div`
  padding: 0;
  display: flex;
  justify-content: center;

  ul {
    margin-right: 30px;
  }

  ul li {
    border: 1px solid black;
    padding: 5px 8px;
    cursor: pointer;
  }

  div {
    border: 1px solid black;
    position: relative;
    max-width: 300px;
    width: 100%;
  }

  ol {
    padding: 0 0 70px;
    box-sizing: border-box;
    margin: 0;
    height: 50vh;
    overflow-y: scroll;
  }

  ol li strong {
    background-color: antiquewhite;
    display: inline-block;
    padding: 5px 8px;
    font-size: 1rem;
  }

  .myChat {
    text-align: right;
  }

  form {
    position: absolute;
    top: 100%;
    width: 100%;
  }

  form input {
    width: 80%;
    box-sizing: border-box;
    padding: 0 10px;
    margin: 0;
  }

  form button {
    width: 20%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

const H2 = styled.h2`
  text-align: center;
  padding: 50px 0 30px;
`;

const Text = styled.p`
  text-align: center;
`;

function Chatroom({ myUid }) {
  const [userUid, userName] = useLoginInfo();
  const [target, setTarget] = useState("");
  const [chat, setChat] = useState("");
  const [chatList, setChatList] = useState([]);
  const [userList, setUserList] = useState([]);
  const listRef = useRef();
  const { uid } = useParams();
  const [params, setParams] = useState(uid);
  const chatBoxRef = useRef();

  useEffect(() => {
    listUpdate();
    userRoomName();
    chatListUpdate();
    chatScroll();
    chatStart();
  }, [params, userUid]);

  useEffect(() => {
    chatScroll();
  }, [userList]);

  const chatScroll = () => {
    let clientHeight = chatBoxRef.current.clientHeight;
    let scrollHeight = chatBoxRef.current.scrollHeight;
    let eh = chatBoxRef.current.clientHeight + chatBoxRef.current.scrollTop;

    if (clientHeight <= eh) {
      chatBoxRef.current.scrollTop = scrollHeight;
    }
  };

  const chatListUpdate = useCallback(async () => {
    await db
      .collection("chatroom")
      .doc(params)
      .collection("messages")
      .orderBy("date")
      .onSnapshot((result) => {
        let list = [];

        result.forEach((a) => {
          list.push({
            data: a.data(),
            myChat() {
              chatList.some((list) => {
                return a.data().uid === userUid;
              });
            },
          });
        });
        setChatList(list);
      });

    await chatScroll();
  }, []);

  const userRoomName = () => {
    db.collection("memo")
      .doc(params)
      .get()
      .then((user) => {
        setTarget(user.data().userName);
      });
  };

  const listUpdate = async () => {
    await db
      .collection("chatroom")
      .where("who", "array-contains", userUid)
      .get()
      .then((result) => {
        let listArr = [];

        result.forEach((a) => {
          let list = {
            userName: a.data().user,
            userUid: a.data().userUid,
          };
          listArr.push(list);
        });

        setUserList(listArr);
      });

    await chatStart();
  };

  const send = (e) => {
    e.stopPropagation();
    e.preventDefault();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let data = {
          content: chat,
          date: new Date(),
          uid: userUid,
          name: userName,
        };

        db.collection("chatroom").doc(params).collection("messages").add(data);

        setChat("");
        chatScroll();
      } else {
        alert("????????? ??? ?????? ???????????????.");
      }
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setChat(value);
  };

  const handleList = (useruid) => {
    userRoomName();
    setParams(useruid);
    chatStart();
  };

  const chatStart = () => {
    db.collection("chatroom")
      .doc(params)
      .collection("messages")
      .orderBy("date")
      .onSnapshot((result) => {
        let list = [];

        result.forEach((a) => {
          list.push({ data: a.data(), myChat: a.data().uid === userUid });
        });
        setChatList(list);
      });
  };

  return (
    <>
      <H2>{target}?????? ???????????????</H2>
      <Text>
        ?????? ?????? ??????????????????.
        <br /> ???????????? ?????? ???????????? ????????? ?????????.
      </Text>
      <Room>
        <ul ref={listRef} className="listName">
          {userList.map((list, i) => {
            return (
              <li
                key={i}
                onClick={(e) => {
                  handleList(list.userUid);
                }}
              >
                {list.userName}
              </li>
            );
          })}
        </ul>
        <div>
          <ol ref={chatBoxRef}>
            {chatList.map((list, i) => {
              return (
                <li key={i} className={list.myChat ? "myChat" : "yourChat"}>
                  <strong>{list.data.content}</strong>
                  <p>{list.data.name}</p>
                </li>
              );
            })}
          </ol>
          <form>
            <input
              type="text"
              placeholder="?????? ??????"
              onChange={handleChange}
              value={chat}
            />
            <button onClick={send}>?????????</button>
          </form>
        </div>
      </Room>
    </>
  );
}

export default Chatroom;
