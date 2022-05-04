<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-md-3" style="padding-left: 0px;">
            <nav>
                <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px; min-height: 100vh;">
                    <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none" style="margin-left:50px;">
                        <span class="fs-4" style="text-align:center;">Professor</span>
                    </a>
                    <span style="text-align:center;">{{ utilizadorLogado.login }}</span>
                    <span style="text-align:center;">{{ utilizadorLogado.nome ? utilizadorLogado.nome.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2") : " " }}</span>
                    <hr>
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'dashboardprofessor' }"
                            :to="{ name: 'dashboardprofessor' }">
                                <BootstrapIcon style="margin-right: 15px"
                                icon="display"
                                size="1x" />
                                Dashboard
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'vercadeiras' }"
                            :to="{ name: 'vercadeiras' }">
                                <BootstrapIcon style="margin-right: 15px"
                                icon="mortarboard"
                                size="1x" />
                                Unidades Curriculares
                            </router-link>
                        </li>
                    </ul>
                    <hr>
                    <div>
                        <a type="button" class="d-flex align-items-center link-dark text-decoration-none" @click="logout()">
                            <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                            <strong>Logout</strong>
                        </a>
                    </div>
                </div>
            </nav>
        </div>  
        <div class="col-md-8">
            <main>
                <router-view></router-view>
            </main>
        </div>
    </div>
  </div>    
</template>

<script>
export default {
  name: "ProfessorRoot",
  component: {},
  data() {
    return {
        utilizadorLogado: []
    };
  },
  methods: {
    logout(){
      sessionStorage.removeItem("tokenProfessor");
      localStorage.removeItem("professorState");
      this.$router.push("/loginprofessor");
    },
    getInfoUtilizadorLogado(){
        this.$axios.get("utilizadorlogado")
        .then((response) => {
            this.utilizadorLogado = response.data.data
        })
        .catch((error) => {
            console.log(error.response);
        });
    }
  },
  mounted() {
      this.getInfoUtilizadorLogado()
  },
};
</script>

<style>

</style>