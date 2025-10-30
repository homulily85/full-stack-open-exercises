import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blog.js'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload
    },

    create (state, action) {
      state.push(action.payload)
    },

    delete (state, action) {
      return state.filter(b => b.id !== action.payload.id)
    },

    like (state, action) {
      const blog = state.find(b => b.id === action.payload.id)
      if (blog) {
        blog.likes++
      }
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    dispatch(blogsSlice.actions.setBlogs(await blogsService.getAll()))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    dispatch(blogsSlice.actions.create(await blogsService.create(blog)))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.update({ ...blog, likes: blog.likes + 1 })
    dispatch(blogsSlice.actions.like(blog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.remove(blog.id)
      dispatch(blogsSlice.actions.delete(blog))
    } catch (e){
      throw e
    }
  }
}

export default blogsSlice.reducer