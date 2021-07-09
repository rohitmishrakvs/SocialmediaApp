import React from 'react'
import { connect } from 'react-redux'
import {signOut} from '../../service/action/authaction'



const SignedOutLinked = (props) => {
    return (
        // <NavLink to='/signin'>Log Out</NavLink>
        <a href='/' type='button' onClick={props.signOut}>Log out</a>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
      signOut:()=>dispatch(signOut())
    }
  }

export default connect(null,mapDispatchToProps)(SignedOutLinked);
       