import {createSlice} from "@reduxjs/toolkit"

const initialState= {
    dbstore: []

}
const dbstore =createSlice({
    name: "dbstore",
    initialState,
    reducers: {
        setDbstore:(state,action)=>{
            state.dbstore=action.payload

        },
        ekleDbstore : (state,action) => {
            state.dbstore= [...state.dbstore,action.payload]
        }
        
    }

})
export const {setDbstore,ekleDbstore}=dbstore.actions
export default  dbstore.reducer