 import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  Jumbotron,
  Spinner,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import Moment from "moment";
import firebase from "../../../configs/fbconfig";

const RoomList = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const [room, setRoom] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [nickname, setNickname] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem("nickname"));
      firebase
        .database()
        .ref("rooms/")
        .on("value", (resp) => {
          setRoom([]);
          setRoom(snapshotToArray(resp));
          setShowLoading(false);
        });
    };

    fetchData();
  }, []);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const enterChatRoom = (roomname) => {
    const chat = {
      roomname: "",
      nickname: "",
      message: "",
      date: "",
      type: "",
    };
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    chat.message = `${nickname} enter the room`;
    chat.type = "join";
    const newMessage = firebase.database().ref("chats/").push();
    newMessage.set(chat);

    firebase
      .database()
      .ref("roomusers/")
      .orderByChild("roomname")
      .equalTo(roomname)
      .on("value", (resp) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find((x) => x.nickname === nickname);
        if (user !== undefined) {
          const userRef = firebase.database().ref("roomusers/" + user.key);
          userRef.update({ status: "online" });
        } else {
          const newroomuser = { roomname: "", nickname: "", status: "" };
          newroomuser.roomname = roomname;
          newroomuser.nickname = nickname;
          newroomuser.status = "online";
          const newRoomUser = firebase.database().ref("roomusers/").push();
          newRoomUser.set(newroomuser);
        }
      });

    history.push("/chatroom/" + roomname);
  };

  if (!auth.uid) return <Redirect to="/signin" />;

  return (
    <div>
      {showLoading && <Spinner color="primary" />}
      <Jumbotron>
        <h2>Freind's</h2>
        <div
          style={{
            borderRadius: 10,
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            height: 50,
            color: "green",
          }}
        >
          <Link to="/addroom">Add Friend</Link>
        </div>
        <ListGroup>
          {room.map((item, idx) => (
            <ListGroupItem
              key={idx}
              action
              onClick={() => {
                enterChatRoom(item.roomname);
              }}
            >
              <Button
                style={{
                  width: "100%",
                  color: "black",
                  fontWeight: 700,
                  backgroundColor: "hsl(226, 34%, 55%)",
                }}
              >
                {item.roomname}
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Jumbotron>
    </div>
  );
};

export default RoomList;
