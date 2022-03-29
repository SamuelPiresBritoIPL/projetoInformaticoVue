<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-md-3" style="padding-left: 0px;">
            <nav>
                <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px; min-height: 100vh;">
                    <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none" style="margin-left:50px;">
                        <span class="fs-4" style="text-align:center;">Administrador</span>
                    </a>
                    <hr>
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'dashboard' }"
                            :to="{ name: 'dashboard' }">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Dashboard
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'gerircoordenadores' }"
                            :to="{ name: 'gerircoordenadores' }">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir Coordenadores
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'gerircursos' }"
                            :to="{ name: 'gerircursos' }">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir Cursos
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'geriralunos' }"
                            :to="{ name: 'geriralunos' }">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir alunos
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'gerirconfirmacoes' }"
                            :to="{ name: 'gerirconfirmacoes' }">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir Confirmações UC
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'gerirperiodos' }"
                            :to="{ name: 'gerirperiodos' }">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir Periodos
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'atualizardados' }"
                            :to="{ name: 'atualizardados' }">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Atualizar Base de Dados
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'logs' }"
                            :to="{ name: 'logs' }">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Logs
                            </router-link>
                        </li>
                    </ul>
                    <hr>
                    <div>
                        <a class="d-flex align-items-center link-dark text-decoration-none">
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
  name: "AdminRoot",
  component: {},
  methods: {
    
  },
  data() {
    return {
        
    };
  },
  mounted() {},
};
</script>

<style>
body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}

main {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}

.nav-link {
  border-radius: 0;
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.scrollarea {
  overflow-y: auto;
}

.fw-semibold { font-weight: 600; }
.lh-tight { line-height: 1.25; }

.sidebar-navigation:hover{
    background-color: aliceblue;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>