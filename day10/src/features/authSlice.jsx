import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access_token: null,
}

export const AuthSlice = createSlice({
  name: 'auth_token',
  initialState,
  reducers: {

    setUserAuth:(state,action)=>{
        state.access_token=action.payload.access_token
    },
    unsetUserAuth:(state,action)=>{
        state.access_token=action.payload.access_token
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserAuth,unsetUserAuth } = AuthSlice.actions

export default AuthSlice.reducer