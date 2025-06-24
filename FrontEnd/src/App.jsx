import React from 'react'
import {Provider} from "react-redux"
import userStore from './Store/UserStore'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'

import Signup from './Pages/Signup'

function App() {
  return (
    <>
    <Provider store={userStore}>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/login" element={<Login/>}/>
 
    <Route path="Signup" element={<Signup/>}/>

    </Routes>
    </BrowserRouter>
      
    </Provider>
    </>
  )
}

export default App
