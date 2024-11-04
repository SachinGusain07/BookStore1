import  {configureStore } from '@reduxjs/toolkit'
import authReducer from './Authn'
import login_signupReducer from './Login_signup'

const store = configureStore({
    reducer:{
        auth: authReducer,
        login_signup: login_signupReducer
        
    },

})

export default store ;