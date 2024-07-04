import request from 'src/service/request'

export function MostrarHorariosAtendiemento () {
  return request({
    url: '/tenants/business-hours/',
    method: 'get'
  })
}

export function AtualizarHorariosAtendiemento (data) {
  return request({
    url: '/tenants/business-hours/',
    method: 'put',
    data
  })
}

export function AtualizarMensagemHorariosAtendiemento (data) {
  return request({
    url: '/tenants/message-business-hours/',
    method: 'put',
    data
  })
}

export function MostrarAvaliacao () {
  return request({
    url: '/tenants/rating/',
    method: 'get'
  })
}

export function AtualizarAvaliacao (data) {
  return request({
    url: '/tenants/rating/',
    method: 'put',
    data
  })
}
