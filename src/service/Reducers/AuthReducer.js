const initialState = {
    authError:null
}


const AuthReducer = (state = initialState, action) => {
   switch (action.type) {
       case 'LOGING_ERROR':
           console.log("Loging error");
           return {
            ...state,
            authError:'Loging failed'
        }
        case 'LOGING_SUCCESS':
            console.log('loging Success');
            return{
                ...state,
                authError:null
            }
        case 'SIGN_OUT':
            console.log('signout');
            return state
       default:
           return state;
   }
}

export default AuthReducer;