import {
    _httpGet,
    _httpPost
} from '@/utils/api'

//新建报表的编辑
export const addGetData = params => _httpGet({
    url: '/addreport',
    params
})

export const chooseCompanyData = params => _httpGet({
    url: '/newreport'
})
export const chooseCurrentPage = params=>_httpGet({
    url: '/tableArray',
    params
})