<template>
  <div style="text-align: center; margin-top: 35px;">
    <h1>404 Error</h1>
    <p>Localização não encontrada.</p>
    <button type="button" class="btn btn-link" @click="redirectToMain()">Voltar à aplicação!</button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data(){
    return {

    }
  },
  methods: {
    redirectToMain(){
      if (sessionStorage.getItem("tokenAdmin")) {
        this.$router.push({name: 'dashboard'})
      } 
      if (sessionStorage.getItem("tokenCoordenador")) {
        this.$router.push({name: 'dashboardC'})
      }
      if (sessionStorage.getItem("tokenProfessor")) {
        this.$router.push({name: 'vercadeiras'})
      }
      if (sessionStorage.getItem("tokenAluno")) {
        this.$router.push({name: 'paginainicial'})
      }
    },
  },
}
</script>

<style scoped>

</style>