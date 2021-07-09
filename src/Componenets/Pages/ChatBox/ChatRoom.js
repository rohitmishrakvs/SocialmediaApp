import React, { useState, useEffect } from "react";
import {Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
} from "reactstrap";
import Moment from "moment";
import firebase from "../../../configs/fbconfig";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Style.css";
import RoomList from "./RoomList";

const ChatRoom = () => {
  const auth = useSelector((state) => state.firebase.auth);
  console.log(auth);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const nickname = auth.displayName;
  const [roomname, setRoomname] = useState("");
  const [newchat, setNewchat] = useState({
    roomname: "",
    nickname: "",
    message: "",
    date: "",
    type: "",
  });
  const room = document.location.pathname.split("/").pop();
  console.log(room);

  useEffect(() => {
    const fetchData = async () => {
      setRoomname(room);
      await firebase
        .database()
        .ref("chats/")
        .orderByChild("roomname")
        .equalTo(roomname)
        .on("value", (resp) => {
          setChats([]);
          setChats(snapshotToArray(resp));
        });
    };
    // console.log(users, "user", nickname, "setNickname");

    fetchData();
  }, [room, roomname]);

  useEffect(() => {
    const fetchData = async () => {
      if (room !== undefined || room !== null) {
        setRoomname(room);
        await firebase
          .database()
          .ref("roomusers/")
          .orderByChild("roomname")
          .equalTo(roomname)
          .on("value", (resp2) => {
            setUsers([]);
            const roomusers = snapshotToArray(resp2);
            setUsers(roomusers.filter((x) => x.status === "online"));
          });
      }
    };

    fetchData();
  }, [room, roomname]);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const chat = newchat;
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    chat.type = "message";
    const newMessage = firebase.database().ref("chats/").push();
    newMessage.set(chat);
    setNewchat({ roomname: "", nickname: "", message: "", date: "", type: "" });
  };

  const onChange = (e) => {
    e.persist();
    setNewchat({ ...newchat, [e.target.name]: e.target.value });
  };



  if(!auth.uid)return<Redirect to = '/signin'/>

  return (
    <div style={{ display: "flex",height: "671px" , position: "absolute" , top: 66}}>
      <div
        style={{
          width: "300px",
          border: "1px solid green",
          // position: "absolute",
          height: "100%",
        }}
      >
        <RoomList />
      </div>
      <div style={{ display:'flex' , justifyContent: 'center',alignItems: 'flex-end',width: "1200px" ,height: "auto" , border: "1px solid black"}}>
        <Container className="ContainerBox">
          <Row>
            <Col xs="8">
              <ScrollToBottom className="ChatContent">
                {chats &&
                  chats.map((item, idx) => (
                    <div key={idx} className="MessageBox">
                      {item.type === "join" || item.type === "exit" ? (
                        <div className="ChatStatus">
                          <span className="ChatDate">{item.date}</span>
                          <span className="ChatContentCenter">
                            {item.message}
                          </span>
                        </div>
                      ) : (
                        <div className="ChatMessage">
                          <div
                            className={`${
                              item.nickname === nickname
                                ? "RightBubble"
                                : "LeftBubble"
                            }`}
                          >
                            {item.nickname === nickname ? (
                              <span className="MsgName">Me</span>
                            ) : (
                              <span className="MsgName">{item.nickname}</span>
                            )}
                            <span className="MsgDate"> at {item.date}</span>
                            <p>{item.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </ScrollToBottom>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form className="MessageForm" onSubmit={submitMessage}>
                <InputGroup>
                  <Input
                    className="chat-Input"
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Enter message here"
                    value={newchat.message}
                    onChange={onChange}
                  />
                  <InputGroupAddon addonType="append">
                    <Button variant="primary" type="submit">
                      Send
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ChatRoom;
 