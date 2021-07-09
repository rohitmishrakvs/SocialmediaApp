import firebase from "../../configs/fbconfig";

export const signIn = (provider) =>  (dispatch) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      dispatch({ type: "LOGING_SUCCESS",res });
    })
    .catch((error) => {
      dispatch({ type: "LOGING_ERROR", error });
    });
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGN_OUT" });
      });
  };
};
