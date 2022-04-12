<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mx-auto justify-content-center">
          <li class="nav-item">
            <router-link class="nav-link" 
            :class="{ active: $route.name === 'paginainicial' }"
            :to="{ name: 'paginainicial' }">
                Página Inicial
            </router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link" 
            :class="{ active: $route.name === 'confirmacaoucs' }"
            :to="{ name: 'confirmacaoucs' }">
                Confirmação de UCs
            </router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link" 
            :class="{ active: $route.name === 'inscricaoturnos' }"
            :to="{ name: 'inscricaoturnos' }">
                Inscrição nos Turnos
            </router-link> 
          </li>
        </ul>
        <ul class="navbar-nav" style="text-align: left;">
            <li class="nav-item">
                <a class="nav-link" href="#">Logout</a>
            </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
export default {
  name: "AlunoRoot",
  component: {},
  data() {
    return {
        
    };
  },
  methods: {
    
  },
  mounted() {}
}
</script>

<style scoped>

</style>