import { createStore } from 'redux'
import { reducer } from './reducer'

const store = createStore(reducer) // 创建store

export default store
