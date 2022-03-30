<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-md-3" style="padding-left: 0px;">
            <nav>
                <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px; min-height: 100vh;">
                    <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none" style="margin-left:50px;">
                        <span class="fs-4" style="text-align:center;">Coordenador</span>
                    </a>
                    <hr>
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'dashboardC' }"
                            :to="{ name: 'dashboardC' }">
                                <BootstrapIcon style="margin-right: 15px"
                                icon="display"
                                size="1x" />
                                Dashboard
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'gerircoordenadoresC' }"
                            :to="{ name: 'gerircoordenadoresC' }">
                                <BootstrapIcon style="margin-right: 15px"
                                icon="person-lines-fill"
                                size="1x" />
                                Gerir Coordenadores
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'gerircursosC' }"
                            :to="{ name: 'gerircursosC' }">
                                <BootstrapIcon style="margin-right: 15px"
                                icon="mortarboard"
                                size="1x" />
                                Gerir Cursos
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'geriralunosC' }"
                            :to="{ name: 'geriralunosC' }">
                                <BootstrapIcon style="margin-right: 15px"
                                icon="people"
                                size="1x" />
                                Gerir alunos
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'gerirconfirmacoesC' }"
                            :to="{ name: 'gerirconfirmacoesC' }">
                                <BootstrapIcon style="margin-right: 15px"
                                icon="clipboard2-check"
                                size="1x" />
                                Gerir Confirmações UC
                            </router-link>
                        </li>
                        <li class="nav-item sidebar-navigation">
                            <router-link class="nav-link link-dark" 
                            :class="{ active: $route.name === 'gerirperiodosC' }"
                            :to="{ name: 'gerirperiodosC' }">
                                <BootstrapIcon style="margin-right: 15px"
                                icon="calendar-event"
                                size="1x" />
                                Gerir Periodos
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
  name: "CoordenadorRoot",
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

</style>