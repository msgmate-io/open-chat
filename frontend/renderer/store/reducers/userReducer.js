import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export function userReducer(state = {}, action) {
    switch (action.type) {
      case 'initUser':
        return { ...state, ...action.payload }
      default:
        return state
    }
}