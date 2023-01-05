import { useEffect, useState } from "react";
import firebase from "firebase/app";

function useLoginInfo() {
  const [userUid, setUserUid] = useState(null);
  const [userName, setUserName] = useState("게스트");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        setUserName(user.displayName);
        setLogin(true);
      }
    });
  }, []);

  return [userUid, userName, login];
}

export default useLoginInfo;
