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
								:class="{ active: $route.name === 'vercadeiras' }"
								:to="{ name: 'vercadeiras' }"
								><i class="align-baseline bi bi-mortarboard-fill"></i> Unidades
								Curriculares
							</router-link>
						</li>
						<!-- <li><hr class="dropdown-divider"></li> -->
						<!-- <li><a class="dropdown-item" href="#">Something else here</a></li> -->
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
	name: "ProfessorRoot",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			utilizadorLogado: [],
			anosLetivos: [],
		};
	},
	methods: {
		logout() {
			sessionStorage.removeItem("tokenProfessor");
			localStorage.removeItem("professorState");
			this.$router.push("/professorlogin");
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
	},
	mounted() {
		this.getAnosLetivos();
		this.getInfoUtilizadorLogado();
	},
};
</script>

<style></style>
