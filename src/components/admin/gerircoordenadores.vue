<template>
	<div class="container-fluid">
		<h3 class="mt-3 mb-4">Gestão de Coordenadores</h3>
		<div
			v-if="adminLogged"
			class="card text-center">
			<div class="card-header">Coordenadores de Cada Curso na Aplicação</div>
			<div class="card-body">
				<div
					class="table-responsive"
					style="max-height: 350px">
					<table class="table table-hover text-start">
						<thead class="sticky-top table-info">
							<tr>
								<th scope="col">Curso</th>
								<th
									class="text-nowrap"
									scope="col">
									Nº de Coordenadores
								</th>
								<th scope="col">Login</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="course in coursesWithCoordinatores"
								:key="course"
								@click="selectedCourseFunc(course)"
								role="button">
								<td>{{ "[" + course.codigo + "] " + course.nome }}</td>
								<td>{{ course.coordenadores.length }}</td>
								<td scope="col">
									<p
										v-for="coordenador in course.coordenadores"
										:key="coordenador">
										{{ coordenador.utilizador.login }}
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div
			v-if="!adminLogged"
			class="card text-center">
			<div class="card-header">
				Coordenadores
				{{
					hasMoreThanOneCurso
						? "por curso na aplicação"
						: "de curso na aplicação"
				}}
			</div>
			<div class="card-body">
				<div
					class="table-responsive"
					style="max-height: 350px">
					<table class="table table-hover text-start">
						<thead class="sticky-top table-info">
							<tr>
								<th scope="col">Curso</th>
								<th
									class="text-nowrap"
									scope="col">
									Nº de Coordenadores
								</th>
								<th scope="col">Login</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="course in coursesWithCoordinatores"
								role="button"
								:key="course"
								@click="selectedCourseFunc(course)"
								class="hoverclick">
								<td>{{ "[" + course.codigo + "] " + course.nome }}</td>
								<td>{{ course.coordenadores.length }}</td>
								<td scope="col">
									<p
										v-for="coordenador in course.coordenadores"
										:key="coordenador">
										{{ coordenador.utilizador.login }}
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<br />
		<div class="row">
			<div class="col-12 col-lg-6">
				<div class="card mb-3">
					<div class="card-header">Adicionar Coordenador</div>
					<div class="card-body">
						<div class="mb-3">
							<label
								for="exampleFormControlInput1"
								class="form-label"
								>Curso:</label
							>
							<span v-if="this.counterStore.courses[0]">
								<label v-if="!hasMoreThanOneCurso"
									>&nbsp;&nbsp;{{ this.counterStore.courses[0].nome }}</label
								>
							</span>
							<v-select
								v-if="hasMoreThanOneCurso"
								code="code"
								:options="this.counterStore.coursesToVSelect"
								single-line
								v-model="selectedCourse"
								@keyup.enter="
									grantCoordinatorRole(selectedCourse, roleId, login)
								">
							</v-select>
							<div
								v-if="hasErrorCurso"
								class="errorMessages mt-1">
								<small class="badge text-bg-danger ms-1 fw-bold text-wrap">{{
									grantRoleError.idCurso
								}}</small>
							</div>
						</div>
						<div class="mb-3">
							<label
								for="exampleFormControlInput1"
								class="form-label"
								>Tipo de Coordenador:</label
							>
							<select
								@keyup.enter="
									grantCoordinatorRole(selectedCourse, roleId, login)
								"
								class="form-select form-select-sm"
								aria-label=".form-select-sm example"
								v-model="roleId"
								ref="focus"
								:disabled="!adminLogged">
								<option value="null">Selecione uma opção</option>
								<option value="0">Coordenador</option>
								<option value="1">Subcoordenador</option>
							</select>
							<div
								v-if="hasErrorTipo"
								class="errorMessages mt-1">
								<small class="badge text-bg-danger ms-1 fw-bold text-wrap">{{
									grantRoleError.tipo
								}}</small>
							</div>
						</div>
						<div class="mb-3">
							<label
								for="exampleFormControlInput1"
								class="form-label"
								>Login/Email:</label
							>
							<input
								@keyup.enter="
									grantCoordinatorRole(selectedCourse, roleId, login)
								"
								type="text"
								class="form-control"
								id="exampleFormControlInput1"
								placeholder="Login/Email"
								v-model="login" />
							<div
								v-if="hasErrorLogin"
								class="errorMessages mt-1">
								<small class="badge text-bg-danger ms-1 fw-bold text-wrap">{{
									grantRoleError.login
								}}</small>
							</div>
						</div>
						<button
							class="btn btn-primary"
							@click="grantCoordinatorRole(selectedCourse, roleId, login)">
							<i class="align-baseline bi bi-plus-circle"></i> Adicionar
						</button>
					</div>
				</div>
			</div>
			<div class="col-12 col-lg-6">
				<div class="card mb-3">
					<div class="card-header">Remover Coordenador</div>
					<div class="card-body">
						<div class="mb-3">
							<label
								for="exampleFormControlInput1"
								class="form-label"
								>Curso:</label
							>
							<label v-if="!hasMoreThanOneCurso && this.counterStore.courses[0]"
								>&nbsp;&nbsp;{{ this.counterStore.courses[0].nome }}</label
							>
							<v-select
								@keyup.enter="
									revokeCoordinatorRole(
										selectedCoordinator,
										selectedCourseRemove
									)
								"
								v-if="hasMoreThanOneCurso"
								aria-label=".form-select-sm example"
								code="code"
								:options="this.counterStore.coursesToVSelect"
								single-line
								v-model="selectedCourseRemove"
								@option:selected="
									getCoordinatorsByCourse(selectedCourseRemove.code)
								">
							</v-select>
							<div
								v-if="hasErrorCursoNullRemover"
								class="errorMessages mt-1">
								<small class="badge text-bg-danger ms-1 fw-bold text-wrap">{{
									nullCurso
								}}</small>
							</div>
							<div
								v-if="hasErrorCursoRemover"
								class="errorMessages mt-1">
								<small class="badge text-bg-danger ms-1 fw-bold text-wrap">{{
									grantRoleError.login
								}}</small>
							</div>
						</div>
						<div class="mb-3">
							<label
								for="exampleFormControlInput1"
								class="form-label"
								>Coordenador:</label
							>
							<select
								@keyup.enter="
									revokeCoordinatorRole(
										selectedCoordinator,
										selectedCourseRemove
									)
								"
								class="form-select form-select-sm"
								aria-label=".form-select-sm example"
								v-model="selectedCoordinator">
								<option value="null">Selecione um coordenador</option>
								<option
									v-for="coordenador in coordinatoresByCourse"
									:key="coordenador"
									v-bind:value="coordenador.id">
									{{ coordenador.utilizador.login }}
								</option>
							</select>
							<div
								v-if="hasErrorLoginNullRemover"
								class="errorMessages mt-1">
								<small class="badge text-bg-danger ms-1 fw-bold text-wrap">{{
									nullCoordenador
								}}</small>
							</div>
							<div
								v-if="hasErrorLoginRemover"
								class="errorMessages mt-1">
								<small class="badge text-bg-danger ms-1 fw-bold text-wrap">{{
									grantRoleError.login
								}}</small>
							</div>
						</div>
						<small></small>
						<button
							class="btn btn-danger"
							@click="
								revokeCoordinatorRole(selectedCoordinator, selectedCourseRemove)
							">
							<i class="align-baseline bi bi-dash-circle"></i> Remover
						</button>
					</div>
				</div>
			</div>
		</div>
		<br /><br /><br />
	</div>
</template>

<script>
import { useCounterStore } from "../../stores/counter";
export default {
	name: "GerirCoordenadores",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			coursesWithCoordinatores: [],
			coordinatoresByCourse: [],
			selectedCourseRemove: null,
			selectedCourse: null,
			roleId: null,
			login: null,
			selectedCoordinator: null,
			adminLogged: false,
			coordenadorLogged: false,
			grantRoleError: null,
			revokeRoleError: null,
			nullCoordenador: null,
			nullCurso: null,
		};
	},
	computed: {
		hasMoreThanOneCurso() {
			if (this.counterStore.courses.length > 1) {
				return true;
			}
			if (this.counterStore.courses[0]) {
				this.getCoordinatorsByCourse(this.counterStore.courses[0].id);
			}
			return false;
		},
		hasErrorCurso() {
			if (this.grantRoleError != null) {
				if (this.grantRoleError.idCurso) {
					return true;
				}
			}
			return false;
		},
		hasErrorTipo() {
			if (this.grantRoleError != null) {
				if (this.grantRoleError.tipo) {
					return true;
				}
			}
			return false;
		},
		hasErrorLogin() {
			if (this.grantRoleError != null) {
				if (this.grantRoleError.login) {
					return true;
				}
			}
			return false;
		},
		hasErrorCursoRemover() {
			if (this.revokeRoleError != null) {
				if (this.revokeRoleError.idCurso) {
					return true;
				}
			}
			return false;
		},
		hasErrorCursoNullRemover() {
			if (this.nullCurso != null) {
				return true;
			}
			return false;
		},
		hasErrorLoginNullRemover() {
			if (this.nullCoordenador != null) {
				return true;
			}
			return false;
		},
		hasErrorLoginRemover() {
			if (this.revokeRoleError != null) {
				if (this.revokeRoleError.login) {
					return true;
				}
			}
			return false;
		},
	},
	methods: {
		getCoursesCoordinators() {
			this.$axios
				.get("cursoauth/coordenadores")
				.then((response) => {
					this.coursesWithCoordinatores = response.data;
					this.counterStore.coursesToVSelect = [];
					this.coursesWithCoordinatores.forEach((curso) => {
						this.counterStore.coursesToVSelect.push({
							label: "[" + curso.codigo + "] " + curso.nome,
							code: curso.id,
						});
					});
				})
				.catch((error) => {
					//console.log(error.response);
				});
		},
		grantCoordinatorRole(course, type, login) {
			if (course == null && this.adminLogged) {
				this.grantRoleError = [];
				this.grantRoleError["idCurso"] = "Deve selecionar um curso.";
				return;
				// throw "O curso não foi selecionado";
			}

			if (course == null && this.hasMoreThanOneCurso) {
				this.grantRoleError = [];
				this.grantRoleError["idCurso"] = "Deve selecionar um curso.";
				return;
				// throw "O curso não foi selecionado";
			}
			if (type == null || type == "null") {
				this.grantRoleError = [];
				this.grantRoleError["tipo"] = "Deve selecionar o tipo de coordenador.";
				return;
			}
			if (login == null || login.length < 1) {
				this.grantRoleError = [];
				this.grantRoleError["login"] = "Deve definir o Login/Email.";
				return;
			}
			if (course == null) {
				course = [];
				course["code"] = this.counterStore.courses[0].id;
			}

			this.$axios
				.post("coordenador", {
					login: login,
					idCurso: course.code,
					tipo: parseInt(type),
				})
				.then((response) => {
					this.$toast.success("Role concedido a " + login + "!");
					if (this.adminLogged) {
						this.getCoursesCoordinators();
					}
					if (!this.adminLogged) {
						this.getCoordinatorsByCourse(course.code);
						this.getCoursesCoordinators();
					}

					if (this.selectedCourseRemove && this.selectedCourseRemove.code > 0) {
						let tempCourse = this.selectedCourseRemove;
						this.selectedCourseRemove = null;
						this.getCoordinatorsByCourse(tempCourse.code);
						this.selectedCourseRemove = tempCourse;
					}

					this.login = null;
					this.grantRoleError = null;
					this.revokeRoleError = null;
					this.nullCoordenador = null;
					this.nullCurso = null;
				})
				.catch((error) => {
					this.grantRoleError = error.response.data;
					if (this.grantRoleError.idCurso) {
						this.grantRoleError.idCurso = "Deve selecionar um curso.";
					}
					if (this.grantRoleError.tipo) {
						this.grantRoleError.tipo = "Deve selecionar o tipo de coordenador.";
					}
					if (this.grantRoleError.login) {
						this.grantRoleError.login = "Login/Email não encontrado.";
					}
					if (this.grantRoleError.login2) {
						this.grantRoleError.login = this.grantRoleError.login2;
					}
					//console.log(error.response)
					this.$toast.error(
						"Não foi possível conceder o role a este utilizador!"
					);
				});
		},
		getCoordinatorsByCourse(courseId) {
			this.$axios
				.get("curso/coordenadores/" + courseId)
				.then((response) => {
					//console.log(response.data);
					this.coordinatoresByCourse = response.data.coordenadores;
				})
				.catch((error) => {
					//console.log(error.response);
				});
		},
		revokeCoordinatorRole(coordinatorId, course) {
			if (course == null && coordinatorId == null && this.adminLogged) {
				this.nullCurso = "Deve selecionar um curso";
				this.nullCoordenador = "Deve selecionar um coordenador";
				// this.$toast.error("Não foi possível retirar o role a este utilizador!");
				return;
			}

			if (course == null && this.hasMoreThanOneCurso && coordinatorId == null) {
				this.nullCurso = "Deve selecionar um curso";
				this.nullCoordenador = "Deve selecionar um coordenador";
				// this.$toast.error("Não foi possível retirar o role a este utilizador!");
				return;
			}

			if (course == null && this.hasMoreThanOneCurso) {
				this.nullCurso = "Deve selecionar um curso";
				// this.$toast.error("Não foi possível retirar o role a este utilizador!");
				return;
			}

			if (coordinatorId == null || coordinatorId == "null") {
				this.nullCoordenador = "Deve selecionar um coordenador";
				// this.$toast.error("Não foi possível retirar o role a este utilizador!");
				return;
			}
			if (course == null) {
				course = [];
				course["code"] = this.counterStore.courses[0].id;
			}
			this.$axios
				.delete("coordenador/" + coordinatorId)
				.then((response) => {
					this.$toast.success("Role retirado com sucesso!");
					this.selectedCoordinator = null;
					// if (this.adminLogged) {
					// 	this.getCoursesCoordinators();
					// }
					this.getCoursesCoordinators();
					this.getCoordinatorsByCourse(course.code);
					this.grantRoleError = null;
					this.revokeRoleError = null;
					this.nullCoordenador = null;
					this.nullCurso = null;
				})
				.catch((error) => {
					this.$toast.error(
						"Não foi possível retirar o role a este utilizador!"
					);
				});
		},
		selectedCourseFunc(course) {
			let curso = {
				label: "[" + course.codigo + "] " + course.nome,
				code: course.id,
			};
			this.selectedCourse = curso;
			this.selectedCourseRemove = curso;
			this.getCoordinatorsByCourse(this.selectedCourseRemove.code);
			this.$refs.focus.focus();
		},
	},
	mounted() {
		if (
			localStorage.getItem("adminState") &&
			sessionStorage.getItem("tokenAdmin")
		) {
			this.adminLogged = true;
		} else {
			this.roleId = 1;
		}
		this.counterStore.getCourses();
		this.getCoursesCoordinators();
		/*  if (!this.hasMoreThanOneCurso && this.counterStore.courses[0]) {
       
       console.log(this.coordinatoresByCourse)
     } */
	},
};
</script>

<style scoped>
/* .errorMessages{
  background-color: #f2dede; 
  border-radius: 3px;
  text-align: center
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.hoverclick:hover{
  cursor: pointer;
} */
</style>
