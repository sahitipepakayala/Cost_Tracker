import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../Store/UserSlice'


const userStore=configureStore({
    reducer:{
        user:userReducer


    }
})

export default userStore;