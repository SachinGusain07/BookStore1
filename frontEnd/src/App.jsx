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


const App = () => {
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
