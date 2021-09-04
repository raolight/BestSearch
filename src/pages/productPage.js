import React, { useState, useEffect } from 'react'
import * as api from '@/utils/api'
import moment from 'moment'
import { searchDataAction } from '@/redux/action'
import { connect } from 'react-redux'

import Header from '@/components/header'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'

import './productPage.scss'

const ProductPage = (props) => {
    const [loading, setLoading] = useState(false)
    const [detailData, seDetailData] = useState(null)

    const {
        store: { searchData },
    } = props

    useEffect(() => {
        getProductDetail(props?.match?.params?.productId)
        // eslint-disable-next-line
    }, [props?.match?.params?.productId])

    // 获取产品详情
    const getProductDetail = (productId) => {
        setLoading(true)
        api.getProductDetail({
            login_token: 'INTERVIEW_SIMPLY2021',
            id: Number(productId),
        })
            .then((res) => {
                console.log('搜索产品详情', res)
                if (res?.status === 'OK') {
                    seDetailData(res.data)

                    // 本地不存在搜索数据时
                    if (!searchData) {
                        getSearchData(res.data.title)
                    }
                }

                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }

    // 筛选当前id的产品详情
    // const findProductDetail = (productId) => {
    //     if (props?.searchData) {
    //         const productList = props.searchData?.products ?? []
    //         const findItem = productList.filter((item) => item.id == productId)
    //         console.log('findItem', findItem)
    //     }
    // }

    // 根据title获取搜索结果
    const getSearchData = (searchKey) => {
        setLoading(true)
        api.searchGoods({
            login_token: 'INTERVIEW_SIMPLY2021',
            search_phrase: searchKey,
        })
            .then((res) => {
                console.log('搜索数据', res)
                if (res?.status === 'OK') {
                    props.sendSearchData(res.data) // 存储到store中
                }
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }

    return (
        <div className="product_page">
            <Header {...props} />

            {/* 骨架 */}
            {loading ? (
                <div className="product_content">
                    <div className="goods_title">Product Detail</div>
                    <Grid container spacing={3}>
                        <Grid item>
                            <Skeleton variant="rect" width={200} height={200} />
                        </Grid>
                    </Grid>

                    <div className="goods_title">Related new products published in the last 7 days</div>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid item key={item}>
                                <Skeleton variant="rect" width={210} height={118} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : (
                <div className="product_content">
                    <div className="goods_title">Product Detail</div>
                    {detailData && (
                        <div className="detail_info">
                            <div className="detail_info_img">
                                <img src={detailData?.image} alt="" />
                            </div>
                            <div className="detail_info_intro">
                                <p>{detailData.title}</p>
                                <p>{detailData.price}</p>
                                <p>{moment(detailData.published_at).format('YYYY-MM-DD')}</p>
                                <p>{detailData.store_domain}</p>
                            </div>
                        </div>
                    )}

                    <div className="goods_title">Related new products published in the last 7 days</div>
                    {searchData && (
                        <Grid container spacing={3} id="productList">
                            {searchData.products.length > 0 ? (
                                <>
                                    {searchData.products.map((item, index) => (
                                        <Grid item key={index}>
                                            <Card style={{ width: 200, height: 300 }}>
                                                <CardActionArea>
                                                    <CardMedia image={item.image} title={item.title} style={{ height: 140 }} />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                                                            {moment(item.published_at).format('YYYY-MM-DD')}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {item.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p" className="price">
                                                            ${item.price}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {item.store_domain}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    ))}
                                </>
                            ) : (
                                '暂无数据'
                            )}
                        </Grid>
                    )}
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

// 往props上挂在dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        sendSearchData: (searchData) => {
            dispatch(searchDataAction(searchData))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
