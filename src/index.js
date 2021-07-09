import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider,useSelector } from 'react-redux';
import App from './App';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './service/Reducers/rootReducer';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import fbconfig from './configs/fbconfig'
import firebase from 'firebase/app'
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, fbconfig),
    // reactReduxFirebase(fbconfig)
  )
);

console.log({isLoaded},"store index");
const rrfProps = {
  firebase,
  config: fbconfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};
function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div className="container center">Loading Screen...</div>;
      return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider{...rrfProps}>
       <AuthIsLoaded><App /> </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';






// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

