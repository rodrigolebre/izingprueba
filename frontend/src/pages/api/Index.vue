<template>
  <div v-if="userProfile === 'admin'">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">
          Configurações API
          <q-btn class="float-right"
            rounded
            color="primary"
            label="Adicionar"
            style="margin: 2px;"
            @click="apiEdicao = {}; modalApi = !modalApi;" />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="scroll"
        style="height: calc(100vh - 200px)">
        <q-item v-for="api in apis"
          :key="api.token"
          class="q-my-md shadow-2">

          <q-item-section top>
            <q-item-label class="text-bold text-h6 q-my-sm">
              Nome: {{ api.name }}
              <div class="text-grey-8 q-gutter-xs float-right">
                <q-btn class="gt-xs"
                  rounded
                  size="12px"
                  flat
                  dense
                  round
                  icon="mdi-content-copy"
                  @click="copy(api.token)">
                  <q-tooltip>
                    Copiar token
                  </q-tooltip>
                </q-btn>
                <q-btn class="gt-xs"
                  rounded
                  size="12px"
                  flat
                  dense
                  round
                  icon="edit"
                  @click="editarAPI(api)">
                  <q-tooltip>
                    Editar Configuraçao
                  </q-tooltip>
                </q-btn>
                <q-btn class="gt-xs"
                  rounded
                  size="12px"
                  flat
                  dense
                  round
                  icon="mdi-autorenew"
                  @click="gerarNovoToken(api)">
                  <q-tooltip>
                    Gerar novo Token
                  </q-tooltip>
                </q-btn>

                <q-btn class="gt-xs"
                  rounded
                  size="12px"
                  flat
                  dense
                  round
                  icon="delete"
                  @click="deletarApi(api)">
                  <q-tooltip>
                    Deletar Configuração
                  </q-tooltip>
                </q-btn>
              </div>
            </q-item-label>
            <q-item-label lines="4"
              style="word-break: break-all;">
              <p class="text-weight-medium text-nowrap q-pr-md blur-effect">
                <span class="text-bold">Url:
                </span>
                {{ montarUrlIntegração(api.id) }}
              </p>
            </q-item-label>
            <q-item-label style="word-break: break-all;">
              <p class="text-weight-medium text-nowrap q-pr-md blur-effect">
                <span class="text-bold">Token:
                </span>
                {{ api.token }}
              </p>
            </q-item-label>
            <q-item-label style="word-break: break-all;">
              <p class="text-weight-medium text-nowrap q-pr-md">
                <span class="text-bold">Token Autenticação:
                </span>
                {{ api.authToken }}
              </p>
            </q-item-label>
            <q-item-label lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Mostrar todas informações do ticket:</span> <span> {{ montarUrlIntegraçãoshowallticket(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "number": "5511999999999" } </span>
            </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Mostrar ticket chatbot:</span> <span> {{ montarUrlIntegraçãoshowticketchatbot(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "number": "5511999999999" } </span>
            </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Mostrar ticket:</span> <span> {{ montarUrlIntegraçãoshowticket(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "number": "5511999999999" } </span>
            </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Alterar fila:</span> <span> {{ montarUrlIntegraçãoupdatequeue(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "ticketId": 97, "queueId": 1 } </span>
            </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Setar etiqueta:</span> <span> {{ montarUrlIntegraçãoupdatetag(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "ticketId": 97, "tag": 1 } </span>
            </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Enviar mensagem texto:</span> <span> {{ montarUrlIntegração(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> {  "body": "A mensagem", "number": "5511999999999", "externalKey": "ID_WEBHOOK" } </span>
            </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Enviar audio:</span> <span> {{ montarUrlIntegraçãovoice(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "audio": "https://seusite.com.br/audio.ogg", "number": "5511999999999", "externalKey": "ID_WEBHOOK" } </span>
            </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Enviar LINK arquivo:</span> <span> {{ montarUrlIntegraçãourl(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "mediaUrl": "https://seusite.com.br/logo.png", "body": "mensagem", "number": "5511999999999", "externalKey": "ID_WEBHOOK" } </span>
            </p>
            </q-item-label>
            <q-item-label style="word-break: break-all;">
          <q-btn class="float-right"
            rounded
            color="primary"
            label="POSTMAN"
            style="margin: 2px;"
            @click="download" />
              <p class="text-weight-medium text-nowrap q-pr-md">
                <span class="text-bold">Baixe o arquivo do postman  que possue outras opções verifique uso no site
                </span>
                <a href="https://www.postman.com/" target="_blank">https://www.postman.com/</a>
              </p>
            </q-item-label>
            <q-item-label
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
            >
            </q-item-label>
          </q-item-section>
        </q-item>
          </q-item-section>
        </q-item>

      </q-card-section>
    </q-card>

    <ModalApi :modalApi.sync="modalApi"
      :apiEdicao.sync="apiEdicao"
      @modal-api:criada="apiCriada"
      @modal-api:editada="apiEditada" />

  </div>
</template>

<script>
import { ListarAPIs, ApagarAPI, NovoTokenAPI } from 'src/service/api'
import { copyToClipboard } from 'quasar'
import ModalApi from './ModalApi'
export default {
  name: 'APIs',
  components: {
    ModalApi
  },
  data () {
    return {
      userProfile: 'user',
      apiEdicao: {},
      modalApi: false,
      apis: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'name', label: 'Nome', field: 'name', align: 'left' },
        { name: 'token', label: 'Token', classes: 'ellipsis', style: 'max-width: 400px', field: 'token', align: 'left' },
        { name: 'isActive', label: 'Ativo', field: 'isActive', align: 'center' },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ]
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return `${process.env.URL_API}/v2/api/external`
    }
  },
  methods: {
    download() {
      const link = document.createElement('a');
      link.href = 'postman.json';
      link.download = 'postman.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    montarUrlIntegração (id) {
      return `${this.cBaseUrlIntegração}/${id}`
    },
    montarUrlIntegraçãoshowallticket (id) {
      return `${this.cBaseUrlIntegração}/${id}/showallticket`
    },
    montarUrlIntegraçãoshowticketchatbot (id) {
      return `${this.cBaseUrlIntegração}/${id}/showticketchatbot`
    },
    montarUrlIntegraçãoshowticket (id) {
      return `${this.cBaseUrlIntegração}/${id}/showticket`
    },
    montarUrlIntegraçãoupdatequeue (id) {
      return `${this.cBaseUrlIntegração}/${id}/updatequeue`
    },
    montarUrlIntegraçãoupdatetag (id) {
      return `${this.cBaseUrlIntegração}/${id}/updatetag`
    },
    montarUrlIntegraçãovoice (id) {
      return `${this.cBaseUrlIntegração}/${id}/voice`
    },
    montarUrlIntegraçãourl (id) {
      return `${this.cBaseUrlIntegração}/${id}/url`
    },
    copy (text) {
      copyToClipboard(text)
        .then(this.$notificarSucesso('Token copiado!'))
        .catch()
    },
    async listarAPIs () {
      const { data } = await ListarAPIs()
      this.apis = data.apis
    },
    apiCriada (api) {
      const newApis = [...this.apis]
      newApis.push(api)
      this.apis = [...newApis]
    },
    apiEditada (api) {
      const newApis = [...this.apis]
      const idx = newApis.findIndex(f => f.id === api.id)
      if (idx > -1) {
        newApis[idx] = api
      }
      this.apis = [...newApis]
    },
    editarAPI (api) {
      this.apiEdicao = { ...api }
      this.modalApi = true
    },
    gerarNovoToken (api) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente gerar novo token para "${api.name}"?
        Lembre que as integrações que utilizam atual irão parar de funcionar
        até que atualize o token onde for necessário.`,
        cancel: {
          label: 'Não',
          color: 'primary',
          push: true
        },
        ok: {
          label: 'Sim',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        try {
          const { data } = await NovoTokenAPI(api)
          this.apiEditada(data)
          this.$notificarSucesso('Token atualizado!')
        } catch (error) {
          this.$notificarErro(
            'Não foi possível atualizar o token',
            error
          )
        }
      })
    },
    deletarApi (api) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar "${api.name}"?`,
        cancel: {
          label: 'Não',
          color: 'primary',
          push: true
        },
        ok: {
          label: 'Sim',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(() => {
        this.loading = true
        ApagarAPI(api)
          .then(res => {
            let newApis = [...this.apis]
            newApis = newApis.filter(a => a.id !== api.id)
            this.apis = [...newApis]
            this.$notificarSucesso(`${api.name} deletada!`)
          })
          .catch(error => this.$notificarErro(`Não foi possível deletar ${api.name}`, error))
        this.loading = false
      })
    }

  },
  mounted () {
    this.listarAPIs()
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>

<style lang="scss" scoped>
  .item-label {
    border-bottom: 1px solid #ccc; // Cor da borda
    padding-bottom: 10px; // Espaçamento abaixo do conteúdo
    margin-bottom: 10px; // Espaçamento abaixo da borda

    &:last-child {
      border-bottom: none; // Remove a borda do último item
    }
  }
  .blur-effect {
    filter: blur(0px)   
  }
</style>