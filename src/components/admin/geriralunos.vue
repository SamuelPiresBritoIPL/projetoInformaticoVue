<template>
  <div class="container-fluid">
    <h2>Gerir Alunos</h2>
    <div class="card">
      <div class="card-header">
        Gerir Aluno
      </div>
      <div class="card-body">
        <h6 class="card-title">Insira o aluno que pretende gerir</h6>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Login / Email:</label>
          <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="Login / Email" v-model="login">
        </div>
        <button class="btn btn-primary" @click="getAlunoInfo()">Submeter</button>
        <hr>
        <h5 class="card-title">Aluno a ser gerido</h5>
        <!-- CARD TAB -->
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link" role="button" :class="{ active: navTabUCsInscritas == true }" @click="navTabUCsInscritas = true">UC's Inscritas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" role="button" :class="{ active: navTabUCsInscritas == false }" @click="navTabUCsInscritas = false">UC's Não aprovadas</a>
              </li>
            </ul>
          </div>
          <div v-if="navTabUCsInscritas == true" class="card-body">
            <h6 class="card-title" style="margin-bottom:25px;">Titulo da Tab1</h6>
            <div>
              <p style="margin-bottom:25px;">O periodo de confirmação de UCs não se encontra ativo neste momento</p>
            </div>
          </div>
          <div v-else class="card-body">
            <h6 class="card-title" style="margin-bottom:25px;">Titulo da Tab2</h6>
            <div>
              <p style="margin-bottom:25px;">O periodo de confirmação de UCs não se encontra ativo neste momento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>    
</template>

<script>
export default {
  name: "GerirAlunos",
  component: {},
  data() {
    return {
      login: null,
      navTabUCsInscritas: true
    };
  },
  methods: {
    getAlunoInfo(){
      this.$axios.get("cadeiras/")
        .then((response) => {
          
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },
  mounted() {},
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>