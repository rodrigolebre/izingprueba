<template>
  <div>
    <q-list class="text-weight-medium">
      <q-item-label
        header
        class="text-bold text-h6 q-mb-lg"
      >Termos de Uso</q-item-label>

      <q-item-label
        caption
        class="q-mt-lg q-pl-sm"
      >Plataforma: Atendimento via WhatsApp</q-item-label>
      <q-separator spaced />

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>1. Uso da Plataforma</q-item-label>
          <q-item-label caption>A Plataforma é disponibilizada pela Empresa para facilitar o atendimento multiatendimento via WhatsApp para os seus usuários.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>2. Armazenamento de Mensagens e Arquivos</q-item-label>
          <q-item-label caption>Mensagens e arquivos enviados através da Plataforma serão armazenados por no máximo 180 dias.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>3. Responsabilidades do Usuário</q-item-label>
          <q-item-label caption>A Empresa não se responsabiliza por qualquer mal uso da Plataforma por parte dos usuários.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>4. Conformidade com a LGPD</q-item-label>
          <q-item-label caption>A Plataforma segue as regras da Lei Geral de Proteção de Dados (LGPD). Ao utilizar a Plataforma, poderão ser solicitadas informações pessoais, cujo fornecimento e tratamento estão sujeitos à nossa Política de Privacidade, alinhada com a legislação de proteção de dados aplicável.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>5. Segurança da Conta</q-item-label>
          <q-item-label caption>É responsabilidade do usuário criar senhas de qualidade para evitar o hackeamento da Plataforma. Notificações sobre acessos não autorizados devem ser feitas imediatamente.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>6. Suspensão Temporária dos Serviços</q-item-label>
          <q-item-label caption>Os serviços oferecidos podem ser suspensos temporariamente por motivos como manutenção, atualizações ou falhas técnicas. A disponibilidade de certos serviços ou funcionalidades pode ser encerrada a qualquer momento.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>7. Planos de Uso e Rescisão</q-item-label>
          <q-item-label caption>Oferecemos diversos planos de uso, adaptáveis de acordo com as necessidades do usuário. A rescisão do contrato e o encerramento da conta podem ser realizados a qualquer momento, sem custos adicionais.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>8. Isenção de Garantias</q-item-label>
          <q-item-label caption>A Plataforma é fornecida "como está", sem garantias expressas ou implícitas. Não nos responsabilizamos por danos indiretos ou emergentes decorrentes do uso da Plataforma.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>9. Possíveis Falhas devido a Atualizações do WhatsApp</q-item-label>
          <q-item-label caption>A atualização do WhatsApp pela plataforma pode causar falhas no sistema, deixando-o indisponível por tempo indeterminado.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>10. Uso Cuidadoso da Opção Campanha</q-item-label>
          <q-item-label caption>A opção Campanha deve ser usada com cuidado, evitando enviar mensagens em excesso e para contatos desconhecidos. O limite máximo é de 200 mensagens diárias para evitar qualquer banimento pela plataforma do WhatsApp.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>11. Responsabilidade sobre Bloqueios de Contas</q-item-label>
          <q-item-label caption>Não garantimos que a utilização desta ferramenta não irá gerar bloqueio nas contas utilizadas. Use com responsabilidade!</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
      >
        <q-item-section>
          <q-item-label>12. Aviso de Não Afiliação</q-item-label>
          <q-item-label caption>Esta plataforma não é afiliada, associada, autorizada, endossada por, ou de qualquer forma oficialmente ligada à WhatsApp, ou a qualquer uma das suas filiais ou afiliadas. O website oficial da WhatsApp pode ser encontrado em <a href="https://whatsapp.com">https://whatsapp.com</a>. "WhatsApp", bem como nomes, marcas, emblemas e imagens relacionadas são marcas registradas dos seus respectivos proprietários.</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>

  </div>
</template>

<script>
export default {
  name: 'TermosDeUso'
}
</script>

<style lang="scss" scoped>
</style>
