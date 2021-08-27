import React, { useState, useEffect } from 'react'
import * as api from '@/utils/api'
import moment from 'moment'
import { Column, Area } from '@ant-design/charts'

import Header from '@/components/header'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'

import './searchPage.scss'

const SearchPage = (props) => {
    const [loading, setLoading] = useState(false)
    const [searchData, setSearchData] = useState(null)

    const [columnChartConfig, setColumnChartConfig] = useState({
        data: [
            {
                type: '家具家电',
                sales: 38,
            },
            {
                type: '粮油副食',
                sales: 52,
            },
            {
                type: '生鲜水果',
                sales: 61,
            },
            {
                type: '美容洗护',
                sales: 145,
            },
            {
                type: '母婴用品',
                sales: 48,
            },
            {
                type: '进口食品',
                sales: 38,
            },
            {
                type: '食品饮料',
                sales: 38,
            },
            {
                type: '家庭清洁',
                sales: 38,
            },
        ],
        xField: 'type',
        yField: 'sales',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        yAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: { alias: '类别' },
            sales: { alias: '销售额' },
        },
    })

    const [areaChartConfig, setAreaChartConfig] = useState({
        data: [
            {
                Date: '2010-01',
                scales: 1998,
            },
            {
                Date: '2010-02',
                scales: 1850,
            },
            {
                Date: '2010-03',
                scales: 1720,
            },
            {
                Date: '2010-04',
                scales: 1818,
            },
            {
                Date: '2010-05',
                scales: 1920,
            },
            {
                Date: '2010-06',
                scales: 1802,
            },
        ],
        xField: 'Date',
        yField: 'scales',
        annotations: [
            {
                type: 'text',
                position: ['min', 'median'],
                content: '中位数',
                offsetY: -4,
                style: { textBaseline: 'bottom' },
            },
            {
                type: 'line',
                start: ['min', 'median'],
                end: ['max', 'median'],
                style: {
                    stroke: 'red',
                    lineDash: [2, 2],
                },
            },
        ],
    })

    useEffect(() => {
        getSearchData(props?.match?.params?.keyword)
        // eslint-disable-next-line
    }, [props?.match?.params?.keyword])

    const getSearchData = (searchKey) => {
        setLoading(true)
        api.searchGoods({
            login_token: 'INTERVIEW_SIMPLY2021',
            search_phrase: searchKey,
        })
            .then((res) => {
                console.log('搜索数据', res)
                if (res?.status === 'OK') {
                    setSearchData(res.data)
                }
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }

    return (
        <div className="search_page">
            <Header {...props} />

            {/* 骨架 */}
            {loading ? (
                <div className="search_content">
                    <div className="goods_title">Recent product launches</div>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid item key={item}>
                                <Skeleton width={210} height={15} style={{ marginBottom: 5 }} />
                                <Skeleton variant="rect" width={210} height={118} />
                            </Grid>
                        ))}
                    </Grid>
                    <div className="goods_title">Related product trends</div>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid item key={item}>
                                <Skeleton width={210} height={15} style={{ marginBottom: 5 }} />
                                <Skeleton variant="rect" width={210} height={118} />
                            </Grid>
                        ))}
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
                <div className="search_content">
                    <div className="goods_title">Recent product launches</div>
                    {searchData && (
                        <Grid container spacing={3}>
                            {searchData.product_launch_data.length > 0 ? (
                                <Grid item>
                                    <Card style={{ width: 400 }}>
                                        <CardActionArea>
                                            <Column {...columnChartConfig} style={{ height: 200 }} />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ) : (
                                '暂无数据'
                            )}
                        </Grid>
                    )}

                    <div className="goods_title">Related product trends</div>
                    {searchData && (
                        <Grid container spacing={3}>
                            {searchData.product_trends.length > 0 ? (
                                <>
                                    {searchData.product_trends.map((item, index) => (
                                        <Grid item key={index}>
                                            <Card style={{ width: 200 }}>
                                                <Area {...areaChartConfig} style={{ height: 200 }} />
                                            </Card>
                                        </Grid>
                                    ))}
                                </>
                            ) : (
                                '暂无数据'
                            )}
                        </Grid>
                    )}

                    <div className="goods_title">Related new products published in the last 7 days</div>
                    {searchData && (
                        <Grid container spacing={3}>
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
                                                        <Typography variant="body2" color="textSecondary" component="p">
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

export default SearchPage
