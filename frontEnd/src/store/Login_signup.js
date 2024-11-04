import {createSlice} from "@reduxjs/toolkit"

const login_signupSlice = createSlice({ 
    name: "login_signup",
    initialState: { IsRotate: false },
    reducers: { 
        toggleRotate: (state) => {
            state.IsRotate = !state.IsRotate;
        },
        login: (state) => {
            state.IsRotate = true;
     
         },
         signup : (state) => {
             state.IsRotate = false;
         }

    },
});


export default login_signupSlice.reducer;
export const {toggleRotate , login , signup} = login_signupSlice.actions;
