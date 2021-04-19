// 文章请求模块
/**
 * 文章接口模块
 */
import request from '@/utils/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
