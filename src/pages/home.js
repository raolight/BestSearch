import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

import Header from '@/components/header'
import './home.scss'

const Home = () => {
    const history = useHistory()
    const [searchKey, setSearchKey] = useState('')

    // 替换空格
    const replaceSpace = (str) => {
        return str.replace(/\s+/g, '+')
    }

    // 按回车搜索
    const onPressSearch = (e) => {
        if (e.key === 'Enter') {
            if (searchKey === '' || searchKey.trim().length === 0) {
                alert('请输入搜索关键词')
                return
            }
            history.push({ pathname: '/search/' + replaceSpace(searchKey) })
        }
    }

    // 点击搜索图标
    const onPressSearchIcon = () => {
        console.log('searchKey', searchKey)
        if (searchKey === '' || searchKey.trim().length === 0) {
            alert('请输入搜索关键词')
            return
        }
        history.push({ pathname: '/search/' + replaceSpace(searchKey) })
    }

    const handleTextFieldChange = (e) => {
        setSearchKey(e.target.value)
    }

    return (
        <div className="home_page">
            <Header />

            <div className="home_content">
                <div className="home_title">Search Trends</div>
                <div className="search_box">
                    <TextField id="filled-basic" fullWidth label="Search for new products in 961K stores" variant="outlined" onChange={handleTextFieldChange} onKeyPress={onPressSearch} />
                    <Button variant="outlined" aria-label="add an alarm" style={{ width: 80, height: '56px', marginLeft: 16 }} onClick={() => onPressSearchIcon()}>
                        <SearchIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home
