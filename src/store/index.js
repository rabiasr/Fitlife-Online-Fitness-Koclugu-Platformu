import { configureStore } from "@reduxjs/toolkit" 
import auth from "./auth"
import dbstore from "./db"

const store =configureStore({
    reducer:{
        auth,
        dbstore
    }
})

export default store