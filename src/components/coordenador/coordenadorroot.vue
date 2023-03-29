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
								:class="{ active: $route.name === 'dashboardC' }"
								:to="{ name: 'dashboardC' }"
								><i class="align-baseline bi bi-display"></i>
								Dashboard</router-link
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
										:to="{ name: 'gerircoordenadoresC' }"
										:class="{ active: $route.name === 'gerircoordenadoresC' }"
										class="dropdown-item"
										><i class="align-baseline bi bi-person-fill-gear"></i>
										Coordenadores</router-link
									>
								</li>
								<li>
									<router-link
										:to="{ name: 'gerircursosC' }"
										:class="{
											active:
												$route.name === 'gerircursosC' ||
												$route.name === 'gerircadeiraC',
										}"
										class="dropdown-item"
										><i class="align-baseline bi bi-mortarboard-fill"></i>
										Cursos</router-link
									>
								</li>
								<li>
									<router-link
										:to="{ name: 'gerirperiodosC' }"
										:class="{ active: $route.name === 'gerirperiodosC' }"
										class="dropdown-item"
										><i class="align-baseline bi bi-calendar-week-fill"></i>
										Períodos</router-link
									>
								</li>
								<li>
									<router-link
										:to="{ name: 'gerirconfirmacoesC' }"
										:class="{ active: $route.name === 'gerirconfirmacoesC' }"
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
								:to="{ name: 'geriralunosC' }"
								:class="{ active: $route.name === 'geriralunosC' }"
								class="nav-link"
								><i class="align-baseline bi bi-people-fill"></i>
								Estudantes</router-link
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
	name: "CoordenadorRoot",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			utilizadorLogado: [],
			coordenadorPrincipal: true,
			anosLetivos: [],
		};
	},
	methods: {
		logout() {
			sessionStorage.removeItem("tokenCoordenador");
			localStorage.removeItem("coordenadorState");
			localStorage.removeItem("isCoordenadorPrincial");
			this.$router.push("/coordenadorlogin");
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
			this.counterStore.courses = [];
		},
	},
	mounted() {
		if (
			sessionStorage.getItem("tokenCoordenador") &&
			sessionStorage.getItem("isCoordenadorPrincial") == 0
		) {
			this.coordenadorPrincipal = false;
		}
		this.getAnosLetivos();
		this.getInfoUtilizadorLogado();
	},
};
</script>

<style></style>
