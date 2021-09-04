import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

import './header.scss'

const Header = (props) => {
    const [searchKey, setSearchKey] = useState('')

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        if (!props?.match?.params?.keyword) return
        setSearchKey(props.match.params.keyword)
        // eslint-disable-next-line
    }, [props?.match?.params?.keyword])

    // 替换空格
    const replaceSpace = (str) => {
        return str.replace(/\s+/g, '+')
    }

    // 按回车搜索
    const onPressSearch = (e) => {
        if (e.key === 'Enter') {
            console.log('回车搜索')
            if (searchKey === '' || searchKey.trim().length === 0) {
                alert('请输入搜索关键词')
                return
            }
            history.push({ pathname: '/search/' + replaceSpace(searchKey) })
        }
    }

    // 点击搜索图标
    const onPressSearchIcon = (e) => {
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
        <div className="header_component">
            <div className="logo" onClick={() => history.push({ pathname: '/' })}>
                <b>Best</b>Search
            </div>

            {location.pathname !== '/' && (
                <div className="search_box">
                    <TextField
                        fullWidth
                        id="filled-basic"
                        label="Search for new products in 961K stores"
                        variant="outlined"
                        style={{ marginRight: 10 }}
                        onChange={handleTextFieldChange}
                        onKeyPress={onPressSearch}
                        value={searchKey}
                    />
                    <Button variant="outlined" aria-label="add an alarm" style={{ width: 80, height: '56px' }} onClick={() => onPressSearchIcon()}>
                        <SearchIcon />
                    </Button>
                </div>
            )}
        </div>
    )
}

// 往props上挂载store.state
const mapStateToProps = (state) => {
    return {
        store: state,
    }
}

export default connect(mapStateToProps)(Header)
