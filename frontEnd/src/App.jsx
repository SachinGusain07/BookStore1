import React from 'react'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import AllBook from './pages/AllBook.jsx'
import {BrowserRouter as Router , Routes  , Route} from "react-router-dom"
import Profile from './pages/Profile.Jsx'
import Cart from './pages/Cart.jsx'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails.jsx'
import LoginSignUp from './pages/LogInSignUp.jsx'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/Authn.js'
import { useEffect } from 'react'


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if(
    localStorage.getItem("Book_user._id") && 
    localStorage.getItem("Book_user.username") &&
    localStorage.getItem("Book_user.role")
  ) {
    dispatch(authActions.changeRole(localStorage.getItem("Book_user.role")));
  }
})
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster  
      position="bottom-center"
      reverseOrder={false}/>
      
        <Navbar />

        <main className="flex-grow">
          <Routes >
             <Route exact path="/" element ={<Home/>}></Route>
             <Route exact path="/all-books" element ={<AllBook/>}></Route>
             <Route exact path="/login" element ={<LoginSignUp/>}></Route>
             <Route exact path="/SignUp" element ={<LoginSignUp/>}></Route>

             <Route exact path="/Cart" element ={<Cart/>}></Route>
             <Route exact path="/Profile" element ={<Profile/>}></Route>
             <Route path="view-book-details/:id" element ={<ViewBookDetails/>}/>


          </Routes>
          </main>
        <Footer />
    </div>
  )
}

export default App
