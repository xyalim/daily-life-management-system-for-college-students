import request from '@/utils/request'

class SchMajor {
  info(query) {
    return request({
      url: 'sch/major/info',
      method: 'get',
      params: query
    })
  }
}

export default SchMajor
