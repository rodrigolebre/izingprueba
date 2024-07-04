<template>
  <div>
    <q-list class="text-weight-medium">
      <q-item-label
        header
        class="text-bold text-h6 q-mb-lg"
      >Termos de Uso</q-item-label>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>1. Uso da Plataforma</q-item-label>
          <q-item-label caption>Não usar para enviar para contatos desconhecidos para evitar problemas com whatsapp, somente enviar para contatos que já tenha enviado mensagens para empresa anteriormente</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>2. Responsabilidades do Usuário</q-item-label>
          <q-item-label caption>A Empresa não se responsabiliza por qualquer mal uso da Plataforma por parte dos usuários.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>3. Uso Cuidadoso da Opção Campanha</q-item-label>
          <q-item-label caption>A opção Campanha deve ser usada com cuidado evitando enviar mensagens em excesso. O limite máximo é de 300 mensagens diárias para evitar qualquer banimento pela plataforma do WhatsApp.</q-item-label>
        </q-item-section>
      </q-item>
	  
      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>4. Mensagem diferentes</q-item-label>
          <q-item-label caption>Ao gerar uma campanha ela da opção de ser 3 mensagem diferentes, realmente faça 3 mensagens diferentes para diminuir a chance de bloqueio da conta.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>5. Responsabilidade sobre Bloqueios de Contas</q-item-label>
          <q-item-label caption>Não garantimos que a utilização desta ferramenta não irá gerar bloqueio nas contas utilizadas. Use com responsabilidade!</q-item-label>
        </q-item-section>
      </q-item>


    </q-list>
	<center><a href="/#/campanhas">EU LI TERMOS E ACEITO</a></center>
  </div>
</template>

<script>
export default {
  name: 'TermosDeUso'
}
</script>

<style lang="scss" scoped>
</style>
