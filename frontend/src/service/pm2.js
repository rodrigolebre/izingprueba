import request from 'src/service/request'

export function Restart () {
  return request({
    url: `/restart-pm2`,
    method: 'get'
  })
}

export function LimparConexao () {
  return request({
    url: `/clean-connection`,
    method: 'get'
  })
}