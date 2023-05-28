import { configureStore } from "@reduxjs/toolkit"
import { adminReducer } from "./reducers/adminReducer"
import { courseReducer } from "./reducers/courseReducer"
import { profileReducer, subscriptionReducer, userReducer } from "./reducers/userReducer"


const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    admin: adminReducer,
    subscription: subscriptionReducer,
  }
})

export const server = "http://localhost:4000/api/v1"

export default store