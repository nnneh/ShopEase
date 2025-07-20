import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  token: '',
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logoutUser: state => {
        return initialState
    },

    addLoginDetails: (state, action) => {
      return {
        ...state,
        email: action.payload.user?.email,
        token: action.payload?.token,
        isLoggedIn: action.payload.isLoggedIn,
        _id: action.payload?.user._id,
      }
    },
  }
})
export const { logoutUser, addLoginDetails} = userSlice.actions

    // addUserDetail: (state, action) => {
    // //   state.userDetail = action.payload
    // },
    // userToken: (state, action) => {
    //   state.userToken = action.payload
    // },
    // logout: (state) => {
    //   state.userDetail = {}
    //   state.userToken = ''
    // },
//   },
// })

// Action creators are generated for each case reducer function
// export const { addUserDetail,userToken,logout } = userSlice.actions

export default userSlice.reducer