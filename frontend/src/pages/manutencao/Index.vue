<template>
  <div v-if="userProfile === 'superadmin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple>


      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Reiniciar API Não Oficial</q-item-label>
          <q-item-label caption> Esse comando reinicia a api. </q-item-label>
        </q-item-section>
        <q-btn  @click="restart"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            Resetar
          </q-tooltip>
        </q-btn>
      </q-item>
	  
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Resetar Api Não Oficial</q-item-label>
          <q-item-label caption> Derruba todos whatsapp conectados, vai ter ler QRCODE novamente. </q-item-label>
          <q-item-label caption> Deve ser usada para tentar resolver problemas de conexão. </q-item-label>
        </q-item-section>
        <q-btn  @click="clean"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            Resetar
          </q-tooltip>
        </q-btn>
      </q-item>

    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { Restart, LimparConexao } from 'src/service/pm2'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      usuario,
      userProfile: 'user'
    }
  },
  methods: {
    async clean(){
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente parar a plataforma?',
        message: `Esse processo irá parar todos os serviços, e só deve ser executado caso você tenha acesso ao Servidor, pois será necessário realizar o reboot manual.`,
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
        await LimparConexao() 
      })
    },
    async restart(){
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente reiniciar a api?',
        message: `Esse processo irá reiniciar todos os serviços, e só deve ser executado caso você tenha acesso ao Servidor, para corrigir possíveis incosistênicas.`,
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
        await Restart() 
      })
    },
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
  },
})
</script>
