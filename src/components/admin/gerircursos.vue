<template>
	<div class="container-fluid">
		<h3 class="mt-3 mb-4">
			{{ hasMoreThanOneCurso ? "Gestão de Cursos" : "Gestão de Curso" }}
		</h3>
		<div v-if="hasMoreThanOneCurso" class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Curso a gerir:</label>
			<v-select
				aria-label=".form-select-sm example"
				code="code"
				:options="this.counterStore.coursesToVSelect"
				single-line
				v-model="counterStore.selectedCourse"
				@option:selected="selectCurso()">
			</v-select>
		</div>
		<!--<button type="button" class="btn btn-outline-primary" style="margin-bottom: 5px; width: 100%" @click="gerirCursoNaAplicacao = !gerirCursoNaAplicacao">{{ gerirCursoNaAplicacao ? "Adicionar Unidades Currículares à Aplicação" : "Gerir Unidades Currículares da Aplicação"}}</button>-->
		<div v-if="gerirCursoNaAplicacao && hasValue">
			<div v-if="this.counterStore.courseWithUCs.nome" class="card text-center">
				<div class="card-header">
					Gestão do curso:
					{{ "[" + this.counterStore.courseWithUCs.codigo + "] " + this.counterStore.courseWithUCs.nome }}
				</div>
				<div class="card-body">
					<div class="alert alert-primary" role="alert">
						<p class="mb-0">
							Última atualização de horários a
							<u>{{ this.counterStore.courseWithUCs.ultimoupdateaula }}</u>
						</p>
					</div>
					<div class="accordion" id="accordionExample" v-if="this.counterStore.tipoTurnoCurso.length > 0">
						<div class="accordion-item mt-3 mb-4">
							<h2 class="accordion-header" id="headingTwo">
								<button
									class="accordion-button"
									:class="{ collapsed: this.collapsed[0] }"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#collapseTwo"
									:aria-expanded="this.collapsed[0]"
									aria-controls="collapseTwo"
									@click="changeCollapsed(0)">
									Definir vagas para todos os turnos
								</button>
							</h2>
							<div
								id="collapseTwo"
								class="accordion-collapse"
								:class="{ collapse: this.collapsed[0] }"
								aria-labelledby="headingTwo"
								data-bs-parent="#accordionExample">
								<div class="card-body">
									<div class="alert alert-info text-center mb-2" role="alert">
										<i class="align-baseline bi bi-info-square-fill"></i>
										É necessário pelo menos <b>um valor</b> acima de zero para atualizar dados
										<i class="align-baseline bi bi-info-square-fill"></i>
										<br />
										<small><b>Zero ou vazio</b> é assumido como <b>não</b> querer atualizar o campo.</small>
									</div>
									<label class="form-label">Definir vagas para todos os turnos de cada tipo em simultâneo</label>
									<div v-for="tipoTurno in this.counterStore.tipoTurnoCurso" :key="tipoTurno" class="input-group mb-3">
										<label class="col-sm-1 col-form-label">{{ tipoTurno.tipo }}</label>
										<input
											type="number"
											class="form-control"
											placeholder="0"
											min="0"
											max="9999"
											v-model="tipoTurno.vagas"
											@keyup.enter="saveTurnosVagas()" />
									</div>
									<button class="float-end btn btn-primary text-right" @click="saveTurnosVagas()">
										Definir vagas para todos os turnos
									</button>
									<br /><br />
								</div>
							</div>
						</div>
					</div>
					<!-- add a button to update table content -->
					<button class="btn btn-primary mb-3" @click="updateTableContent()">
						<i class="align-baseline bi bi-arrow-clockwise"></i>
						Atualizar dados da tabela
					</button>
					<p class="text-center fw-bold mb-2">Unidades Curriculares</p>
					<hr class="my-1" />
					<table class="table table-hover text-start">
						<thead>
							<tr>
								<th scope="col">Unidade Curricular</th>
								<th scope="col">Inscritos/Vagas</th>
								<th scope="col">Turnos</th>
							</tr>
						</thead>
						<tbody>
							<tr
								role="button"
								class="tableRow"
								v-for="cadeira in this.counterStore.courseWithUCs.cadeiras"
								:key="cadeira"
								@click="selectCadeiraToManage(cadeira)">
								<td>{{ "[" + cadeira.codigo + "] " + cadeira.nome }}</td>
								<!-- TODO: corrigir para do Inscritos/Vagas para mostrar o número total de vagas em vez de zero i guess??? -->
								<td>{{ cadeira.nrInscricoes }}/{{ cadeira.nrInscritos }}</td>
								<td>
									<p v-for="turno in cadeira.turnos" :key="turno">
										<span v-for="turnotipo in turno" :key="turnotipo">
											<a
												class="text-nowrap link-body-emphasis link-underline-opacity-0 link-underline-opacity-100-hover"
												@click.stop="selectTurnoToManage(cadeira, turnotipo)"
												>{{ turnotipo.numero != 0 ? turnotipo.tipo + turnotipo.numero : turnotipo.tipo
												}}<small class="link-body-emphasis">{{
													" (" +
													turnotipo.vagasocupadas +
													"/" +
													(turnotipo.vagastotal == null ? "-" : turnotipo.vagastotal) +
													")"
												}}</small></a
											>&nbsp;&nbsp;
										</span>
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div v-if="!gerirCursoNaAplicacao" class="card">
			<div class="card-body">
				<div class="text-center">
					<h5 class="card-title">
						{{ "[" + this.counterStore.courseWithUCs.codigo + "] " + this.counterStore.courseWithUCs.nome }}
					</h5>
				</div>
				<div>
					<div class="overflow-y-auto">
						<div class="my-2">
							<small
								>Seleciona as unidades curriculares que pretende adicionar à aplicação de gestão/inscrição nos
								turnos.</small
							>
						</div>
						<div v-for="cadeira in this.counterStore.courseWithUCs.cadeiras" :key="cadeira.id" class="ms-3">
							<p>
								<input class="form-check-input me-2" type="checkbox" :value="cadeira.id" v-model="cadeirasToGerir" />
								<label class="form-check-label">
									{{ cadeira.nome }}
								</label>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<br /><br /><br />
</template>

<script>
import { useCounterStore } from "../../stores/counter";
export default {
	name: "GerirCursos",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			selectedCourse: null,
			gerirCursoNaAplicacao: true,
			cadeirasToGerir: [],
			collapsed: [true],
		};
	},
	computed: {
		hasValue() {
			if (this.counterStore.selectedAnoletivo != null && this.counterStore.semestre != null) {
				this.counterStore.getCourses(1);
				return true;
			}
			return false;
		},
		hasMoreThanOneCurso() {
			if (this.counterStore.courses.length > 1) {
				return true;
			}
			return false;
		},
	},
	methods: {
		selectCadeiraToManage(cadeira) {
			this.counterStore.turnoToManage = null;
			if (sessionStorage.tokenCoordenador && localStorage.coordenadorState) {
				this.$router.push("/coordenador/gerircadeira/" + cadeira.id);
			}
			if (sessionStorage.tokenAdmin && localStorage.adminState) {
				this.$router.push("/admin/gerircadeira/" + cadeira.id);
			}
		},
		selectTurnoToManage(cadeira, turno) {
			this.counterStore.turnoToManage = turno.id;
			if (sessionStorage.tokenCoordenador && localStorage.coordenadorState) {
				this.$router.push("/coordenador/gerircadeira/" + cadeira.id);
			}
			if (sessionStorage.tokenAdmin && localStorage.adminState) {
				this.$router.push("/admin/gerircadeira/" + cadeira.id);
			}
		},
		selectCurso() {
			if (this.counterStore.selectedAnoletivo != null && this.counterStore.semestre != null) {
				this.counterStore.getCourseWithUCs(this.counterStore.selectedCourse.code);

				//console.log(this.counterStore.selectedCourse);

				return;
			}
			this.$toast.error("Ano letivo e semestre não selecionados");
		},
		changeCollapsed(number) {
			this.collapsed[number] = this.collapsed[number] == true ? false : true;
		},
		saveTurnosVagas() {
			//console.log(this.counterStore.tipoTurnoCurso);
			var dataToSend = [];
			var dataToSend2 = [];

			if (!this.counterStore.selectedCourse || !this.counterStore.selectedCourse.code) {
				this.counterStore.selectedCourse = this.counterStore.courses[0];
				this.counterStore.selectedCourse.code = this.counterStore.courses[0].id;
			}

			this.counterStore.tipoTurnoCurso.forEach((value, index) => {
				if (value.vagas != null && value.vagas > 0) {
					dataToSend.push(value.tipo);
					dataToSend2.push(value.vagas);
				}
			});

			if (dataToSend.length < 1) {
				this.$toast.warning(
					"Não tem valores válidos para atualizar vagas, pelo menos um dos campos têm de estar acima de zero."
				);
				return;
			}

			this.$axios
				.put(
					"curso/turnosvagas/" +
						this.counterStore.selectedCourse.code +
						"/" +
						this.counterStore.selectedAnoletivo +
						"/" +
						this.counterStore.semestre,
					{
						tipoturno: dataToSend,
						vagas: dataToSend2,
					}
				)
				.then((response) => {
					this.$toast.success(response.data);
					this.selectCurso();
				})
				.catch((error) => {
					this.$toast.error("Não foi possível atualizar as vagas.");
				});
		},
		updateTableContent() {
			if (!this.counterStore.selectedCourse || !this.counterStore.selectedCourse.code) {
				this.counterStore.selectedCourse = this.counterStore.courses[0];
				this.counterStore.selectedCourse.code = this.counterStore.courses[0].id;
			}

			this.counterStore.getCourseWithUCs(this.counterStore.selectedCourse.code);

			this.$toast.success("Tabela atualizada com sucesso.");
		},
	},
	mounted() {
		if (this.counterStore.courses.length == 0) {
			this.counterStore.getCourses(1);
		}
		//console.log(this.counterStore.courseWithUCs.cadeiras);
	},
};
</script>

<style scoped>
/* .tableRow:hover{
  background-color: aliceblue;
} */

/* .alert-primary {
    color: #084298;
    background-color: #eef3fb !important;
    border-color: #eef3fb !important;
} */

/* .hoverturno:hover{
  cursor: pointer;
  font-weight: 500;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
