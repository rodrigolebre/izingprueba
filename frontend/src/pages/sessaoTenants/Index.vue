<template>
  <div>
    <div class="row col full-width q-pa-lg">
      <q-card
        flat
        bordered
        class="full-width"
      >
        <q-card-section class="text-h6 text-bold">
          Canais de Comunicação
        </q-card-section>
      </q-card>
    </div>
    <div class="row full-width q-py-lg q-px-md ">
      <template v-for="item in canais">
        <q-card
          flat
          bordered
          class="col-xs-12 col-sm-5 col-md-4 col-lg-3 q-ma-md"
          :key="item.id"
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon
                  size="40px"
                  :name="`img:${item.type}-logo.png`"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6 text-bold">Empresa: {{ item.tenantId }}</q-item-label>
              <q-item-label class="text-h6 text-bold">Nome: {{ item.name }}</q-item-label>
              <q-item-label class="text-h6 text-caption">
                {{ item.type }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-section>
            <ItemStatusChannel :item="item" />
            <template v-if="item.type === 'messenger'">
              <div class="text-body2 text-bold q-mt-sm">
                <span> Página: </span>
                {{ item.fbObject && item.fbObject.name || 'Nenhuma página configurada.' }}
              </div>
            </template>
          </q-card-section>
          <!-- <q-card-section>
            <q-select
              outlined
              dense
              label="ChatBot"
              v-model="item.chatFlowId"
              :options="listaChatFlow"
              map-options
              emit-value
              option-value="id"
              option-label="name"
              clearable
              @input="handleSaveWhatsApp(item)"
            /> -->
            <!-- @input="atualizarConfiguracao('botTicketActive')" -->
          <!-- </q-card-section> -->
          <!-- <q-separator /> -->
          <q-card-actions
            class="q-gutter-md q-pa-md q-pt-none"
            align="center"
          >
            <template v-if="item.type !== 'messenger'">
              <!-- <q-btn
                v-if="item.type == 'whatsapp' && item.status == 'qrcode'"
                color="blue-5"
                label="QR Code"
                @click="handleOpenQrModal(item, 'btn-qrCode')"
                icon-right="watch_later"
                :disable="!isAdmin"
              /> -->

              <div
                v-if="item.status == 'DISCONNECTED'"
                class="q-gutter-sm"
              >
                <!-- <q-btn
                  color="positive"
                  label="Conectar"
                  @click="handleStartWhatsAppSession(item.id)"
                />
                <q-btn
                  v-if="item.status == 'DISCONNECTED' && item.type == 'whatsapp'"
                  color="blue-5"
                  label="Novo QR Code"
                  @click="handleRequestNewQrCode(item, 'btn-qrCode')"
                  icon-right="watch_later"
                  :disable="!isAdmin"
                /> -->
              </div>

              <div
                v-if="item.status == 'OPENING'"
                class="row items-center q-gutter-sm flex flex-inline"
              >
                <div class="text-bold">
                  Conectando
                </div>
                <q-spinner-radio
                  color="positive"
                  size="2em"
                />
                <q-separator
                  vertical
                  spaced=""
                />
              </div>

              <!-- <q-btn
                v-if="['OPENING', 'CONNECTED', 'PAIRING', 'TIMEOUT'].includes(item.status)"
                color="negative"
                label="Desconectar"
                @click="handleDisconectWhatsSession(item.id)"
                :disable="!isAdmin"
                class="q-mx-sm"
              /> -->
            </template>

            <template v-if="item.type === 'messenger'">
              <VFacebookLogin
                :app-id="cFbAppId"
                @sdk-init="handleSdkInit"
                @login="login => fbLogin(login, item)"
                @logout="logout => fbLogout(item)"
                :login-options="FBLoginOptions"
                version="v12.0"
              >
                <template slot="login">
                  {{ item.status === 'CONNECTED' ? 'Editar' : 'Conectar' }}
                </template>
                <template slot="logout">
                  {{ item.status === 'DISCONNECTED' ? 'Conectar' : 'Editar' }}
                </template>
              </VFacebookLogin>
            </template>
            <!-- <q-btn
              color="red"
              icon="mdi-delete"
              @click="deleteWhatsapp(item)"
              :disable="!isAdmin"
              dense
              round
              flat
              class="absolute-bottom-right"
            >
              <q-tooltip>
                Deletar conexáo
              </q-tooltip>
            </q-btn> -->
            <!-- <template v-if="item.type === 'whatsapp'">
              <q-btn
                color="red"
                icon="mdi-sync"
                @click="syncOldMessagesWhatsapp(item)"
                :disable="!isAdmin"
                dense
                round
                flat
                class="absolute-bottom-left"
              >
                <q-tooltip>
                  Sincronizar mensagens
                </q-tooltip>
              </q-btn>
          </template> -->
          </q-card-actions>
        </q-card>
      </template>
    </div>
    <ModalQrCode
      :abrirModalQR.sync="abrirModalQR"
      :channel="cDadosWhatsappSelecionado"
      @gerar-novo-qrcode="v => handleRequestNewQrCode(v, 'btn-qrCode')"
    />
    <ModalWhatsapp
      :modalWhatsapp.sync="modalWhatsapp"
      :whatsAppEdit.sync="whatsappSelecionado"
      @recarregar-lista="listarWhatsapps"
    />
    <q-inner-loading :showing="loading">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </div>
</template>

<script>

import { DeletarWhatsappTenant, DeleteWhatsappSession, StartWhatsappSession, ListarWhatsappsTenant, RequestNewQrCode, UpdateWhatsapp } from 'src/service/sessoesWhatsapp'
import { SyncOldMessagesWbot } from 'src/service/tickets'
import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt-BR/index'
import ModalQrCode from './ModalQrCode'
import { mapGetters } from 'vuex'
import ModalWhatsapp from './ModalWhatsapp'
import ItemStatusChannel from './ItemStatusChannel'
import VFacebookLogin from 'vue-facebook-login-component'
import { FetchFacebookPages, LogoutFacebookPages } from 'src/service/facebook'
import { ListarChatFlow } from 'src/service/chatFlow'

const userLogado = JSON.parse(localStorage.getItem('usuario'))

export default {
  name: 'IndexSessoesWhatsapp',
  components: {
    ModalQrCode,
    ModalWhatsapp,
    ItemStatusChannel,
    VFacebookLogin
  },
  data () {
    return {
      loading: false,
      userLogado,
      isAdmin: false,
      abrirModalQR: false,
      modalWhatsapp: false,
      whatsappSelecionado: {},
      listaChatFlow: [],
      whatsAppId: null,
      canais: [],
      objStatus: {
        qrcode: ''
      },
      columns: [
        { name: 'tenantId', label: 'Tenant', field: 'tenantId', align: 'left' },
        {
          name: 'name',
          label: 'Nome',
          field: 'name',
          align: 'left'
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'center'
        },
        {
          name: 'session',
          label: 'Sessão',
          field: 'status',
          align: 'center'
        },
        {
          name: 'number',
          label: 'Número',
          field: 'number',
          align: 'center'
        },
        {
          name: 'updatedAt',
          label: 'Última Atualização',
          field: 'updatedAt',
          align: 'center',
          format: d => this.formatarData(d, 'dd/MM/yyyy HH:mm')
        },
        {
          name: 'isDefault',
          label: 'Padrão',
          field: 'isDefault',
          align: 'center'
        },
        {
          name: 'acoes',
          label: 'Ações',
          field: 'acoes',
          align: 'center'
        }
      ],
      FB: {},
      FBscope: {},
      FBLoginOptions: {
        scope:
          'pages_manage_metadata,pages_messaging,instagram_basic,pages_show_list,pages_read_engagement,instagram_manage_messages'
      },
      FBPageList: [],
      fbSelectedPage: { name: null, id: null },
      fbPageName: '',
      fbUserToken: ''
    }
  },
  watch: {
    whatsapps: {
      handler () {
        this.canais = JSON.parse(JSON.stringify(this.whatsapps))
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cFbAppId () {
      return process.env.FACEBOOK_APP_ID
    },
    cDadosWhatsappSelecionado () {
      const { id } = this.whatsappSelecionado
      return this.whatsapps.find(w => w.id === id)
    }
  },
  methods: {
    formatarData (data, formato) {
      return format(parseISO(data), formato, { locale: pt })
    },
    handleSdkInit ({ FB }) {
      this.FB = FB
      // try login

      // this.FBscope = scope
    },
    async fbLogout (whatsapp) {
      console.info('fbLogout')
      await LogoutFacebookPages(whatsapp)
    },
    fbLogin (login, channel) {
      if (login?.status === 'connected') {
        this.fbFetchPages(
          login.authResponse.accessToken,
          login.authResponse.userID,
          channel
        )
        console.info('fbLogin in connected')
      } else if (login?.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.info('fbLogin in not_authorized')
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.info('fbLogin in not logged')
      }
    },
    async fbFetchPages (_token, _accountId, channel) {
      try {
        const response = await FetchFacebookPages({
          whatsapp: channel,
          userToken: _token,
          accountId: _accountId
        })
        const {
          data: { data }
        } = response
        this.FBPageList = data.page_details
        this.fbUserToken = data.user_access_token
      } catch (error) {
        // Ignore error
      }
    },
    handleOpenQrModal (channel) {
      this.whatsappSelecionado = channel
      this.abrirModalQR = true
    },
    handleOpenModalWhatsapp (whatsapp) {
      this.whatsappSelecionado = whatsapp
      this.modalWhatsapp = true
    },
    async handleDisconectWhatsSession (whatsAppId) {
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente desconectar? ',
        // message: 'Mensagens antigas não serão apagadas no whatsapp.',
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
        DeleteWhatsappSession(whatsAppId).then(() => {
          const whatsapp = this.whatsapps.find(w => w.id === whatsAppId)
          this.$store.commit('UPDATE_WHATSAPPS', {
            ...whatsapp,
            status: 'DISCONNECTED'
          })
        }).finally(f => {
          this.loading = false
        })
      })
    },
    async handleStartWhatsAppSession (whatsAppId) {
      try {
        await StartWhatsappSession(whatsAppId)
      } catch (error) {
        console.error(error)
      }
    },

    async handleRequestNewQrCode (channel, origem) {
      if (channel.type === 'telegram' && !channel.tokenTelegram) {
        this.$notificarErro('Necessário informar o token para Telegram')
      }
      this.loading = true
      try {
        await RequestNewQrCode({ id: channel.id, isQrcode: true })
        setTimeout(() => {
          this.handleOpenQrModal(channel)
        }, 2000)
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    },
    async listarWhatsapps () {
      const { data } = await ListarWhatsappsTenant()
      this.$store.commit('LOAD_WHATSAPPS', data)
    },
    async deleteWhatsapp (whatsapp) {
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente deletar? ',
        message: 'Não é uma boa ideia apagar se já tiver gerado atendimentos para esse whatsapp.',
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
        DeletarWhatsappTenant(whatsapp.id).then(r => {
          this.$store.commit('DELETE_WHATSAPPS', whatsapp.id)
        }).finally(f => {
          this.loading = false
        })
      })
    },
    async syncOldMessagesWhatsapp (whatsappId) {
      let value = 1;
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente sincronizar? ',
        message: 'O processo pode levar alguns minutos dependendo do tamanho do seu chatlist',
        prompt: {
          model: value,
          type: 'number',
          label: 'Limite de mensagens a serem importadas',
          hint: 'Apenas números positivos são permitidos',
          attributes: {
            min: 0,
            step: 1,
          },
        },
        ok: {
          label: 'Sim',
          color: 'primary',
          push: true
        },
        cancel: {
          label: 'Não',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk((value) => {
        const data = {
          whatsappId: whatsappId.id,
          limit: value,
          tenantId: whatsappId.tenantId
        };
        if (value !== null && value > 0) {
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Aguarde alguns instantes, o sistema irá importar ' + value + ' mensagens por usuário.',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.loading = true
          SyncOldMessagesWbot(data).then(r => {
            // this.$store.commit('SYNC_WHATSAPP', whatsappId)
          }).finally(f => {
            this.loading = false
          })
        } else {
          this.$q.notify({
            type: 'error',
            progress: true,
            position: 'top',
            message: 'Valor inserido pelo usuário é inválido ou não foi fornecido.',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
      })
    },
    async listarChatFlow () {
      const { data } = await ListarChatFlow()
      this.listaChatFlow = data.chatFlow
    },
    async handleSaveWhatsApp (whatsapp) {
      try {
        await UpdateWhatsapp(whatsapp.id, whatsapp)
        this.$q.notify({
          type: 'positive',
          progress: true,
          position: 'top',
          message: `Whatsapp ${whatsapp.id ? 'editado' : 'criado'} com sucesso!`,
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      } catch (error) {
        console.error(error)
        return this.$q.notify({
          type: 'error',
          progress: true,
          position: 'top',
          message: 'Ops! Verifique os erros... O nome da conexão não pode existir na plataforma, é um identificador único.',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      }
    }
  },
  mounted () {
    this.isAdmin = localStorage.getItem('profile')
    this.listarWhatsapps()
    this.listarChatFlow()
  }
}
</script>

<style lang="scss" scoped>
</style>
