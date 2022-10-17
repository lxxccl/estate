//统一管理项目前部的接口
import requests from './requests'

//查询通用接口
export const reqSelect = (year, city) => requests({ url: `/ProvincegdpController/queryYear?year=${year}&city=${city}`, method: 'get' })

//修改接口
export const reqUpdate = data => requests({ url: '/ProvincegdpController/update', method: 'post', data })

//通过id删除数据接口
export const reqDel = skuid => requests({ url: `/ProvincegdpController/deleteById?id=${skuid}`, method: 'get' })

//新增一条房地产数据
export const reqIns = data => requests({ url: '/ProvincegdpController/insert', method: 'post', data })
