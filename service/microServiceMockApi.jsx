import http from './http'

/*
// NA COMUNICAÇÃO REAL SERÁ UTILIZADO O CÓDIGO ABAIXO USANDO AXIOS NO ARQUIVO HTTP
// A MOCK DO SERVIÇO É FEITA BASEADA NOS MÉTODOS HTTP ABAIXO
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
*/

//
// MOCK JSON PARA SIMULAÇÃO DE API
//
let data = [
  {
    "id": 1,
    "descricao": "Descrição API",
    "ativo": false,
    "valor": 250.52,
    "identidade": 52034,
    sub: [
      {
        "id": 1,
        "descricao": "Sub Descrição",
        "valor": 50.12,
      },
      {
        "id": 2,
        "descricao": "Segunda Sub Descrição",
        "valor": 100.44,
      }
    ]
  },
  {
    "id": 2,
    "descricao": "Sub Secundária",
    "ativo": true,
    "valor": 500.21,
    "identidade": 29384,
    sub: [
      {
        "id": 1,
        "descricao": "Sub Descrição da Descrição Secundária",
        "valor": 25.05,
      }
    ]
  }
]

let lista = [
  {
    "id": 52034,
    "nome": "Listagem Um - 52034",
  },
  {
    "id": 29384,
    "nome": "Listagem Dois - 29384",
  },
  {
    "id": 23821,
    "nome": "Listagem Três - 23821",
  },
  {
    "id": 9929,
    "nome": "Listagem Quatro - 9929",
  }
]

//
// SERVIÇO A SER PASSADO NO REACT
//
const service = {
  listar: async () => {
    return await Promise.resolve({ status: 200, data: { content: data, success: true, error_message: null } })
  },
  filtrar: async (objData) => {
    let filteredData = data.filter(filteredItem => {
      let validacaoDescricao = !objData.descricao || (objData.descricao && filteredItem.descricao.indexOf(objData.descricao) !== -1)
      let validacaoIdentidade = !objData.identidade || (objData.identidade > 0 && filteredItem.identidade === objData.identidade)
      return validacaoDescricao && validacaoIdentidade
    })
    return await Promise.resolve({ status: 200, data: { content: filteredData, success: true, error_message: null } })
  },
  buscar: async (id) => {
    return await Promise.resolve({ status: 200, data: { content: data.find(item => item.id === id), success: true, error_message: null }})
  },
  cadastrar: async (item) => {
    if (item.id) {
      data.map(novoItem => {
        if (novoItem.id === item.id) {
          novoItem.id = item.id
          novoItem.descricao = item.descricao
          novoItem.ativo = item.ativo
          novoItem.valor = item.valor
          novoItem.identidade = item.identidade
          novoItem.sub = item.sub
        }
      })
    } else {
      item.id = data.length+1
      data.push(item)
    }
    data.map(i => {
      i.sub.map(s => {
        s.id = s.id ? s.id : i.sub.length+1
      })
    })
    return await Promise.resolve({ status: 200, data: { content: data.find(i => i.id === item.id), success: true, error_message: null }})
  },
  deletar: async (id) => {
    data = data.filter(item => item.id !== id)
    return await Promise.resolve({ status: 200, data: { content: data, success: true, error_message: null } })
  },
  listarcombo: async () => {
    return await Promise.resolve({ status: 200, data: { content: lista, success: true, error_message: null } })
  }
}
// FIM DO SERVIÇO
//

export default service;