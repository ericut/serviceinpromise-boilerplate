import http from './http'

// NA COMUNICAÇÃO REAL SERÁ UTILIZADO O CÓDIGO ABAIXO USANDO AXIOS NO ARQUIVO HTTP
// APÓS COMUNICAÇÃO, O MOCK PODERÁ SER APAGADO
//
// ADICIONAR O ENDPOINT NO BASEURL

const baseUrl = '/api/gateway/'

const service = {
  listar: async () => {
    return await http.get(baseUrl + '/listar')
  },
  filtrar: async (data) => {
    return await http.get(baseUrl + '/listar', data)
  },
  buscar: async (id) => {
    return await http.get(baseUrl + '/' + id)
  },
  cadastrar: async (data, headers) => {
    return await http.post(baseUrl + '/salvar', data, headers)
  },
  deletar: async (id) => {
    return await http.delete(baseUrl + '/deletar/' + id)
  }
}

export default service;