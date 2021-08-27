import * as request from '@/utils/request'

export const searchGoods = (params) => request.post('http://3.141.23.218:5000/interview/keyword_search', params) // mocky数据
