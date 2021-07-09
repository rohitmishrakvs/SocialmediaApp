import React, { useState } from 'react';
import { Container } from 'reactstrap';
import {useSelector} from 'react-redux'
import {
    useHistory,
    Redirect
} from "react-router-dom";
import {
    Alert,
    Jumbotron,
    Spinner,
    Form,
    Button,
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';
import firebase from '../../../configs/fbconfig';

const AddRoom=()=> {
    const auth = useSelector((state) => state.firebase.auth);
    const history = useHistory();
    const [room, setRoom] = useState({ roomname: '' });
    const [showLoading, setShowLoading] = useState(false);
    const ref = firebase.database().ref('rooms/');

    const save = (e) => {
        e.preventDefault();
        setShowLoading(true);
        ref.orderByChild('roomname').equalTo(room.roomname).once('value', snapshot => {
            if (snapshot.exists()) {
                return (
                    <div>
                        <Alert color="primary">
                            Freiend Already Exists
                        </Alert>
                    </div>
                );
            } else {
                const newRoom = firebase.database().ref('rooms/').push();
                // console.log(newRoom, "rrrrrr");
                newRoom.set(room);
                history.push(`/chatroom/${room}`);
                setShowLoading(false);
            }
        });
    };

    const onChange = (e) => {
        e.persist();
        setRoom({...room, [e.target.name]: e.target.value});
    }

    if(!auth.uid)return<Redirect to = '/signin'/>
    return (
        <Container>
        <div>
            {showLoading &&
                <Spinner color="primary" />
            }
            <Jumbotron>
                <h2>Freind Name</h2>
                <Form onSubmit={save}>
                    <FormGroup>
                        <Label>Frien name</Label>
                        <Input type="text" name="roomname" id="roomname" placeholder="Enter friend name" value={room.roomname} onChange={onChange} />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </Jumbotron>
        </div>
        </Container>
    );
}

export default AddRoom;


 