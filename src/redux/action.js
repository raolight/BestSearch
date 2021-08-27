// func返回一个对象,type为固定字符串字段,与store中reducer的type对应
export const isLoginAction = (isLogin) => {
    return {
        type: 'SET_LOGIN',
        isLogin,
    }
}

export const logoutAction = (params) => {
    return {
        type: 'LOG_OUT',
        params,
    }
}
