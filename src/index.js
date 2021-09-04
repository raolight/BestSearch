import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from '@/redux/store.js'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import './index.scss'

import Loading from '@/components/loading'

// 懒加载
const Home = Loadable({
    loader: () => import('@/pages/home'),
    loading: Loading,
    delay: 500,
})
const SearchPage = Loadable({
    loader: () => import('@/pages/searchPage'),
    loading: Loading,
    delay: 500,
})
const ProductPage = Loadable({
    loader: () => import('@/pages/productPage'),
    loading: Loading,
    delay: 500,
})

// StrictMode-是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，-StrictMode-不会渲染任何可见的UI。它为其后代元素触发额外的检查和警告。
const App = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename="/">
                    <div className="content_body">
                        <Switch>
                            <Route exact path="/" render={() => <Home />} />
                            <Route exact path="/search/:keyword" render={(props) => <SearchPage {...props} />} />
                            <Route exact path="/product/:productId" render={(props) => <ProductPage {...props} />} />
                            <Route exact path="/*" render={() => '没这个页面'} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
