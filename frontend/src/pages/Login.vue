<template>
  <div class="container">
    <div class="video-container">
      <video
        autoplay
        muted
        loop
        style="width: 100%; height: auto; object-fit: cover; "
      >
        <source
          src="/videologin.mp4"
          type="video/mp4"
        />
      </video>
    </div>
    <div class="login-section fixed-layout">
      <q-layout class="vertical-center full-width">
        <q-page-container>
          <q-page class="flex justify-center items-center">
            <q-ajax-bar
              position="top"
              color="primary"
              size="5px"
            />
            <div class="login-content">
              <q-img
                src="/logo.png"
                spinner-color="white"
                class="logo-image q-mb-lg q-px-md"
                style="max-width: 120%"
              />
              <q-separator spaced />

              <div class="text-primary">
                <div class="text-h6">Bem vindo!</div>
                <div>
                  <q-input
                    :color="$q.dark.isActive ? 'white ' : 'black'"
                    class="q-mb-md"
                    clearable
                    v-model="form.email"
                    placeholder="meu@email.com"
                    @blur="$v.form.email.$touch"
                    :error="$v.form.email.$error"
                    error-message="Deve ser um e-mail válido."
                    outlined
                    dense
                    @keypress.enter="fazerLogin"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-email-outline"
                        class="cursor-pointer"
                        color='primary'
                      />
                    </template>
                  </q-input>

                  <q-input
                    :color="$q.dark.isActive ? 'white ' : 'black'"
                    outlined
                    dense
                    v-model="form.password"
                    :type="isPwd ? 'password' : 'text'"
                    @keypress.enter="fazerLogin"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-shield-key-outline"
                        class="cursor-pointer"
                        color='primary'
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <q-btn
                  class="q-mr-sm q-my-lg btn-azul"
                  color="primary"
                  text-color="white"
                  style="width: 260px"
                  :loading="loading"
                  @click="fazerLogin"
                  flat
                  inline
                >
                  Entrar no sistema
                  <span slot="loading">
                    <q-spinner-puff class="on-left" />Entrando...
                  </span>
                </q-btn>
                <q-btn
                   class="q-mr-sm q-my-lg btn-vermelho"
                   color="primary"
                   text-color="white"
                   style="width: 260px"
                   href="https://wa.me/5519971395449?text=Informa%C3%A7%C3%B5es+sobre+o+sistema"
                   flat
                   inline
                  >
                   Maiores informações
                </q-btn>
            </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      modalEsqueciSenha: false,
      emailRedefinicao: null,
      form: {
        email: null,
        password: null
      },
      contasCliente: {},
      isPwd: true,
      loading: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    },
    emailRedefinicao: { required, email }
  },
  methods: {
    fazerLogin () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Informe usuário e senha corretamente.')
        return
      }
      this.loading = true
      this.$store.dispatch('UserLogin', this.form)
        .then(data => {
          // if (Object.keys(this.contasCliente).length == 1) {
          //   // logar direto
          // }
          this.loading = false
          // .params = { modalEscolhaUnidadeNegocio: true }
        })
        .catch(err => {
          console.error('exStore', err)
          this.loading = false
        })
    },
    clear () {
      this.form.email = ''
      this.form.password = ''
      this.$v.form.$reset()
    }
  },
  mounted () {
  }
}
</script>
<style scoped>

.container {
  display: flex;
  height: 100vh;
}

.login-section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
}

.full-width {
  width: 100%;
}

.login-content {
  max-width: 350px;
  text-align: center;
}

.video-container {
  display: flex;
  justify-content: flex-start;
}

.logo-image {
  height: auto;
  max-width: 100%;
}

.fixed-layout {
  width: 45%;
}
.btn-azul {
  background-color: #6667ab; /* Define a cor de fundo como cinza */
  color: white; /* Define a cor do texto como branco */
}
.btn-vermelho {
  background-color: #f36e5f; /* Define a cor de fundo como cinza */
  color: white; /* Define a cor do texto como branco */
}
@media (max-width: 600px) {
  .video-container {
    display: none;
  }
  .login-section {
    width: 100%;
  }
}

</style>
