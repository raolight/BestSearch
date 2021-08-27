const Loading = (props) => {
    if (props.isLoading) {
        if (props.timedOut) {
            return <div>页面加载超时，请稍后再试！</div>
        } else if (props.pastDelay) {
            return '加载中'
        } else {
            return null
        }
    } else if (props.error) {
        return <div>页面加载失败，请稍后再试：{props.error}</div>
    } else {
        return null
    }
}

export default Loading
