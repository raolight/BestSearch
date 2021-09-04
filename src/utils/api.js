import * as request from '@/utils/request'

export const searchGoods = (params) => request.post('http://3.141.23.218:5000/interview/keyword_search', params) // mocky数据
export const getProductDetail = (params) => request.post('http://3.141.23.218:5000/interview/get_product_by_id', params) // mocky数据

