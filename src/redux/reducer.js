// @desc 纯函数，接收两个参数
// @paream state
// @paream action

// 全局初始状态
const initialState = {
    isLogin: false,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return {
                ...state,
                isLogin: action.isLogin,
            }
        case 'LOG_OUT':
            return {
                ...initialState,
            }
        default:
            return state
    }
}
