import {createSlice} from "@reduxjs/toolkit";

const initialLoginState = localStorage.getItem("isLoggedIn") === "true";
const authSlice = createSlice({ 
    name: "auth",
    initialState: {
        isLoggedIn: initialLoginState , role: "user"
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", "true");
        
        },
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.setItem("isLoggedIn", "false");
           
        },

        changeRole :(state , action) =>{
            const role = action.payload;
            state.role = role ;
        },

    },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;
        
    