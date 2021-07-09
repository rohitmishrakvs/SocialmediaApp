import AuthReducer from "./AuthReducer";
// import ChatReducer from "./ChatReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
const rootReducer = combineReducers({
    auth: AuthReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer;