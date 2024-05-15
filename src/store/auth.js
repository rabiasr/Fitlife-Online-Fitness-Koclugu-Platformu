import {createSlice} from "@reduxjs/toolkit"

const initialState= {
    user: false

}
const auth =createSlice({
    name: "auth",
    initialState,
    reducers: {
        giris:(state,action)=>{
            state.user=action.payload

        },

        cikis:state=>{
            state.user=false
        }

    }

})
export const {giris,cikis}=auth.actions
export default  auth.reducer