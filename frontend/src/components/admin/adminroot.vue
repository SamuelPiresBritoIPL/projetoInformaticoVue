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
                        <li class="nav-item">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'adminroot' }"
                            :to="{ name: 'adminroot' }">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Dashboard
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link link-dark" to="adminroot">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir Coordenadores
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" to="adminroot">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir Cursos
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" to="adminroot">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir alunos
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" to="adminroot">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir Confirmações UC
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" to="adminroot">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Gerir Periodos
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" to="adminroot">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Atualizar Base de Dados
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" to="adminroot">
                                <BootstrapIcon
                                icon="app-indicator"
                                size="2x"
                                flip-v />
                                Logs
                            </router-link>
                        </li>
                    </ul>
                    <hr>
                    <div class="dropdown">
                        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                        <strong>Nome/Numero</strong>
                        </a>
                        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                            <li><a class="dropdown-item" href="#">Sign out</a></li>
                        </ul>
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
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>