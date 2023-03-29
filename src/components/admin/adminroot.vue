<template>
	<div class="container-fluid">
		<nav class="navbar navbar-expand-xl">
			<div class="container-fluid">
				<a class="navbar-brand">Administração</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div
					class="collapse navbar-collapse"
					id="navbarScroll">
					<ul
						class="navbar-nav nav-underline me-auto my-2 my-lg-0 navbar-nav-scroll"
						style="--bs-scroll-height: 150px">
						<li class="nav-item">
							<router-link
								class="nav-link"
								:class="{ active: $route.name === 'dashboard' }"
								:to="{ name: 'dashboard' }"
								><i class="align-baseline bi bi-display"></i>
								Dashboard</router-link
							>
						</li>
						<li class="nav-item">
							<router-link
								class="nav-link"
								:class="{ active: $route.name === 'atualizardados' }"
								:to="{ name: 'atualizardados' }"
								><i class="align-baseline bi bi-database-fill-gear"></i>
								Atualizar Base de Dados</router-link
							>
						</li>
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								<i class="align-baseline bi bi-diagram-3-fill"></i> Gestão
							</a>
							<ul class="dropdown-menu">
								<li>
									<router-link
										:to="{ name: 'gerircoordenadores' }"
										:class="{ active: $route.name === 'gerircoordenadores' }"
										class="dropdown-item"
										><i class="align-baseline bi bi-person-fill-gear"></i>
										Coordenadores</router-link
									>
								</li>
								<li>
									<router-link
										:to="{ name: 'gerircursos' }"
										:class="{
											active:
												$route.name === 'gerircursos' ||
												$route.name === 'gerircadeira',
										}"
										class="dropdown-item"
										><i class="align-baseline bi bi-mortarboard-fill"></i>
										Cursos</router-link
									>
								</li>
								<li>
									<router-link
										:to="{ name: 'gerirperiodos' }"
										:class="{ active: $route.name === 'gerirperiodos' }"
										class="dropdown-item"
										><i class="align-baseline bi bi-calendar-week-fill"></i>
										Períodos</router-link
									>
								</li>
								<li>
									<router-link
										:to="{ name: 'gerirconfirmacoes' }"
										:class="{ active: $route.name === 'gerirconfirmacoes' }"
										class="dropdown-item"
										><i class="align-baseline bi bi-ui-checks"></i> Pedidos
										UC's</router-link
									>
								</li>
								<!-- <li><hr class="dropdown-divider"></li> -->
								<!-- <li><a class="dropdown-item" href="#">Something else here</a></li> -->
							</ul>
						</li>
						<li class="nav-item">
							<router-link
								:to="{ name: 'geriralunos' }"
								:class="{ active: $route.name === 'geriralunos' }"
								class="nav-link"
								><i class="align-baseline bi bi-people-fill"></i>
								Estudantes</router-link
							>
						</li>

						<li class="nav-item">
							<router-link
								:to="{ name: 'logs' }"
								:class="{ active: $route.name === 'logs' }"
								class="nav-link"
								><i class="align-baseline bi bi-body-text"></i>
								Logs</router-link
							>
						</li>
						<li class="nav-item">
							<router-link
								:to="{ name: 'gerirutilizador' }"
								:class="{ active: $route.name === 'gerirutilizador' }"
								class="nav-link"
								><i class="align-baseline bi bi-person-square"></i>
								Perfil</router-link
							>
						</li>
					</ul>
					<div class="d-flex justify form">
						<select
							class="form-select mx-1"
							aria-label=".form-select"
							v-model="this.counterStore.selectedAnoletivo"
							v-on:change="onChangeAnoSemestre">
							<option>Selecione um Ano Letivo</option>
							<option
								v-for="anoletivo in anosLetivos"
								:key="anoletivo"
								v-bind:value="anoletivo.id">
								{{ anoletivo.anoletivo }}
							</option>
						</select>
						<select
							class="form-select mx-1"
							aria-label=".form-select"
							v-model="this.counterStore.semestre"
							v-on:change="onChangeAnoSemestre">
							<option>Selecione um Semestre</option>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
						<button
							class="mx-1 btn btn-outline-secondary"
							type="button"
							@click="logout()">
							Logout
						</button>
					</div>
				</div>
			</div>
		</nav>
		<div class="row">
			<div class="col-lg-2"></div>

			<div class="col-12 col-lg-8">
				<main>
					<router-view></router-view>
				</main>
			</div>
			<div class="col-lg-2"></div>
		</div>
	</div>
</template>

<script>
import { useCounterStore } from "../../stores/counter";
export default {
	name: "AdminRoot",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			anosLetivos: [],
			utilizadorLogado: [],
		};
	},
	methods: {
		logout() {
			sessionStorage.removeItem("tokenAdmin");
			localStorage.removeItem("adminState");
			this.$router.push("/adminlogin");
		},
		getAnosLetivos() {
			this.$axios
				.get("anoletivo")
				.then((response) => {
					this.anosLetivos = response.data;
					this.anosLetivos.forEach((anoLetivo) => {
						if (anoLetivo.ativo == 1) {
							this.counterStore.selectedAnoletivo = anoLetivo.id;
							if (anoLetivo.semestreativo != null) {
								this.counterStore.semestre = anoLetivo.semestreativo;
							}
						}
					});
				})
				.catch((error) => {
					console.log(error.response);
				});
		},
		getInfoUtilizadorLogado() {
			this.$axios
				.get("utilizadorlogado")
				.then((response) => {
					this.utilizadorLogado = response.data.data;
				})
				.catch((error) => {
					console.log(error.response);
				});
		},
		onChangeAnoSemestre() {
			if (this.counterStore.selectedCourse != null) {
				this.counterStore.getCourseWithUCs(
					this.counterStore.selectedCourse.code
				);
			}
			this.counterStore.aberturasByCourse = [];
			this.counterStore.pedidosByCourse = [];
		},
	},
	mounted() {
		this.getAnosLetivos();
		this.getInfoUtilizadorLogado();
	},
};
</script>

<style>
/* .sidebar-container {
  position: fixed;
  text-align: left;
  width: 220px;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
} */

/* .nav, .nav-link {
    --bs-nav-link-color : #000;
} */

/* .nav-link {
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
.lh-tight { line-height: 1.25; } */

/* .nav-link.active{
    background-color: aqua !important;
} */

/* .sidebar-navigation:hover{ 
    background-color: aliceblue;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
