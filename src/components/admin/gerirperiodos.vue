<template>
	<div class="container-fluid">
		<h3 class="mt-3 mb-4">Gerir Períodos</h3>
		<div v-if="hasMoreThanOneCurso" class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">Curso a gerir períodos:</label>
			<v-select
				aria-label=".form-select-sm example"
				code="code"
				:options="this.counterStore.coursesToVSelect"
				single-line
				v-model="selectedCourse"
				@option:selected="selectCourse()">
			</v-select>
		</div>
		<div v-if="this.counterStore.aberturasByCourse.nome != null" class="card text-center">
			<div class="card-header">
				<ul class="nav nav-tabs card-header-tabs">
					<li class="nav-item">
						<a
							class="nav-link text-body-emphasis"
							role="button"
							:class="{ active: navTabConfirmacaoUCs == true }"
							@click="navTabConfirmacaoUCs = true"
							>Pedidos de UC's</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link text-body-emphasis"
							role="button"
							:class="{ active: navTabConfirmacaoUCs == false }"
							@click="navTabConfirmacaoUCs = false"
							>Inscrição nos Turnos</a
						>
					</li>
				</ul>
			</div>
			<div class="card-body">
				<!-- GESTÃO DE ABERTURAS - CONFIRMAÇÕES -->
				<div v-if="navTabConfirmacaoUCs == true">
					<h6 class="card-title mb-4">
						Período de Pedidos de UC's -
						{{ "[" + this.counterStore.aberturasByCourse.codigo + "] " + this.counterStore.aberturasByCourse.nome }}
					</h6>
					<div v-if="formConfirmacao == false">
						<div
							v-if="
								this.counterStore.aberturaConfirmacaoTodos.dataEncerar > new Date().getTime().toLocaleString() ||
								this.counterStore.aberturaConfirmacao1.dataEncerar > new Date().getTime().toLocaleString() ||
								this.counterStore.aberturaConfirmacao2.dataEncerar > new Date().getTime().toLocaleString() ||
								this.counterStore.aberturaConfirmacao3.dataEncerar > new Date().getTime().toLocaleString()
							"
							class="row text-start">
							<div v-if="this.counterStore.aberturaConfirmacaoTodos.length != 0" class="row">
								<label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
								<label class="col-sm-10 col-form-label">{{
									this.counterStore.aberturaConfirmacaoTodos.dataAbertura.replace(":00.000000Z", "").replace("T", " ")
								}}</label>
								<label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
								<label class="col-sm-10 col-form-label">{{
									this.counterStore.aberturaConfirmacaoTodos.dataEncerar.replace(":00.000000Z", "").replace("T", " ")
								}}</label>
								<div>
									<button
										type="button"
										class="btn btn-primary me-1"
										@click="openEditarConfirmacao(this.counterStore.aberturaConfirmacaoTodos)">
										<i class="align-baseline bi bi-pencil-square"></i> Editar
									</button>
									<button
										type="button"
										class="btn btn-danger"
										@click="deleteAbertura(this.counterStore.aberturaConfirmacaoTodos.id)">
										<i class="align-baseline bi bi-calendar2-check"></i>
										Encerrar
									</button>
								</div>
							</div>
							<div v-else>
								<div v-if="this.counterStore.aberturaConfirmacao123.length != 0">
									<div v-for="anoAbertura in this.counterStore.aberturaConfirmacao123" :key="anoAbertura" class="row">
										<label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
										<label class="col-sm-10 col-form-label">{{
											anoAbertura.dataAbertura.replace(":00.000000Z", "").replace("T", " ")
										}}</label>
										<label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
										<label class="col-sm-10 col-form-label">{{
											anoAbertura.dataEncerar.replace(":00.000000Z", "").replace("T", " ")
										}}</label>
										<div>
											<button type="button" class="btn btn-primary me-1" @click="openEditarConfirmacao(anoAbertura)">
												<i class="align-baseline bi bi-pencil-square"></i>
												Editar
											</button>
											<button type="button" class="btn btn-danger" @click="deleteAbertura(anoAbertura.id)">
												<i class="align-baseline bi bi-calendar2-check"></i>
												Encerrar
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							<p class="mb-4">O período de pedidos de UC's não se encontra ativo de momento</p>
						</div>
						<button
							v-if="
								this.counterStore.aberturaConfirmacaoTodos.length == 0 &&
								(this.counterStore.aberturaConfirmacao1.length == 0 ||
									this.counterStore.aberturaConfirmacao2.length == 0 ||
									this.counterStore.aberturaConfirmacao3.length == 0)
							"
							type="button"
							class="btn btn-primary"
							@click="
								formConfirmacao = true;
								iniciarConfirmacao = true;
							">
							Iniciar
						</button>
					</div>
					<!-- CRIAR/EDITAR ABERTURAS - CONFIRMAÇÃO -->
					<div v-if="formConfirmacao == true">
						<p v-if="editarConfirmacao == true">Edição de abertura</p>
						<p v-if="iniciarConfirmacao == true">Iniciação de abertura</p>
						<form>
							<div class="row mb-3">
								<label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura</label>
								<div class="col-sm-10">
									<input
										type="datetime-local"
										class="form-control"
										v-model="dataAbertura"
										aria-label="Data de abertura" />
									<div v-if="hasErrorDataAbertura" class="errorMessages mt-1">
										<small class="badge text-bg-danger ms-1 text-wrap">{{ errorIniciarPC.dataAbertura[0] }}</small>
									</div>
								</div>
							</div>
							<div class="row mb-3">
								<label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar</label>
								<div class="col-sm-10">
									<input
										type="datetime-local"
										class="form-control"
										v-model="dataEncerrar"
										aria-label="Data de encerrar" />
									<div v-if="hasErrorDataEncerrar" class="errorMessages mt-1">
										<small class="badge text-bg-danger ms-1 text-wrap">{{ errorIniciarPC.dataEncerar[0] }}</small>
									</div>
								</div>
							</div>
							<button
								v-if="editarConfirmacao == true"
								type="button"
								class="btn btn-primary me-1"
								@click="updateAbertura(0, dataAbertura, dataEncerrar)">
								<i class="align-baseline bi bi-check-lg"></i> Confirmar Edição
							</button>
							<button
								v-if="iniciarConfirmacao == true"
								type="button"
								class="btn btn-primary me-1"
								@click="createAbertura(this.counterStore.aberturasByCourse.id, 0, 0, dataAbertura, dataEncerrar)">
								<i class="align-baseline bi bi-check-lg"></i>
								Confirmar
							</button>
							<button type="button" class="btn btn-warning" @click="cancelarEdicaoIniciacao()">
								<i class="align-baseline bi bi-x-lg"></i> Cancelar
							</button>
						</form>
					</div>
				</div>
				<!-- GESTÃO DE ABERTURAS - INSCRIÇÕES -->
				<div v-else>
					<h6 class="card-title mb-4">
						Período de Inscrição nos Turnos -
						{{ "[" + this.counterStore.aberturasByCourse.codigo + "] " + this.counterStore.aberturasByCourse.nome }}
					</h6>
					<div v-if="formInscricao == false">
						<!--{{ this.counterStore.aberturaInscricaoTodos.dataEncerar > new Date().getTime().toLocaleString() }}-->
						<div
							class="alert alert-danger text-center"
							role="alert"
							v-if="compareDate(this.counterStore.aberturaInscricaoTodos.dataEncerar)">
							<i class="align-baseline bi bi-exclamation-octagon-fill"></i><br /><b>
								Este período de inscrições já acabou</b
							>, por favor encerre-o oficialmente para poder abrir outro ou altere a data de encerramento!
						</div>
						<!-- Estava dentro do div debaixo -->
						<!-- v-if="
                
				dataAtualMaior(
                  this.counterStore.aberturaInscricaoTodos.dataEncerar
                ) ||
                dataAtualMaior(
                  this.counterStore.aberturaInscricao1.dataEncerar
                ) ||
                dataAtualMaior(
                  this.counterStore.aberturaInscricao2.dataEncerar
                ) ||
                dataAtualMaior(this.counterStore.aberturaInscricao3.dataEncerar)
              " -->
						<div
							v-if="
								this.counterStore.aberturaInscricaoTodos.dataEncerar > new Date().getTime().toLocaleString() ||
								this.counterStore.aberturaInscricao1.dataEncerar > new Date().getTime().toLocaleString() ||
								this.counterStore.aberturaInscricao2.dataEncerar > new Date().getTime().toLocaleString() ||
								this.counterStore.aberturaInscricao3.dataEncerar > new Date().getTime().toLocaleString()
							"
							class="row text-start">
							<div v-if="this.counterStore.aberturaInscricaoTodos.length != 0" class="row">
								<label for="inputEmail3" class="col-sm-2 col-form-label">Ano do curso:</label>
								<label class="col-sm-10 col-form-label">Todos</label>
								<label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
								<label class="col-sm-10 col-form-label">{{
									this.counterStore.aberturaInscricaoTodos.dataAbertura.replace(":00.000000Z", "").replace("T", " ")
								}}</label>
								<label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
								<label class="col-sm-10 col-form-label">{{
									this.counterStore.aberturaInscricaoTodos.dataEncerar.replace(":00.000000Z", "").replace("T", " ")
								}}</label>
								<div>
									<button
										type="button"
										class="btn btn-primary me-1"
										@click="openEditarInscricao(this.counterStore.aberturaInscricaoTodos)">
										<i class="align-baseline bi bi-pencil-square"></i> Editar
									</button>
									<button
										type="button"
										class="btn btn-danger"
										@click="deleteAbertura(this.counterStore.aberturaInscricaoTodos.id)">
										<i class="align-baseline bi bi-calendar2-check"></i>
										Encerrar
									</button>
								</div>
							</div>
							<div v-else>
								<div v-if="this.counterStore.aberturaInscricao123.length != 0">
									<div v-for="anoAbertura in this.counterStore.aberturaInscricao123" :key="anoAbertura" class="row">
										<label for="inputEmail3" class="col-sm-2 col-form-label">Ano do curso:</label>
										<label class="col-sm-10 col-form-label">{{ anoAbertura.ano }}</label>
										<label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura:</label>
										<label class="col-sm-10 col-form-label">{{
											anoAbertura.dataAbertura.replace(":00.000000Z", "").replace("T", " ")
										}}</label>
										<label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar:</label>
										<label class="col-sm-10 col-form-label">{{
											anoAbertura.dataEncerar.replace(":00.000000Z", "").replace("T", " ")
										}}</label>
										<div>
											<button type="button" class="btn btn-primary me-1" @click="openEditarInscricao(anoAbertura)">
												<i class="align-baseline bi bi-pencil-square"></i>
												Editar
											</button>
											<button type="button" class="btn btn-danger" @click="deleteAbertura(anoAbertura.id)">
												<i class="align-baseline bi bi-calendar2-check"></i>
												Encerrar
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							<p class="mt-4 mb-4">O período de inscrição nos turnos não se encontra ativo de momento</p>
						</div>
						<button
							v-if="
								this.counterStore.aberturaInscricaoTodos.length == 0 &&
								(this.counterStore.aberturaInscricao1.length == 0 ||
									this.counterStore.aberturaInscricao2.length == 0 ||
									this.counterStore.aberturaInscricao3.length == 0)
							"
							type="button"
							class="btn btn-primary"
							@click="
								formInscricao = true;
								iniciarInscricao = true;
							">
							Iniciar
						</button>
					</div>
					<!-- CRIAR/EDITAR ABERTURA - INSCRIÇÕES -->
					<div v-if="formInscricao == true">
						<form>
							<div class="row mb-3">
								<label class="col-sm-2 col-form-label">Ano do curso</label>
								<div class="col-sm-10">
									<select
										v-if="this.counterStore.yearsCourse.length > 2"
										class="form-select form-select-sm"
										aria-label=".form-select-sm example"
										v-model="selectedYear">
										<option value="null">Selecione uma opção.</option>
										<option v-for="year in this.counterStore.yearsCourse" :key="year" v-bind:value="year">
											{{ year != 0 ? year : "Todos" }}
										</option>
									</select>
									<select
										v-else
										class="form-select form-select-sm"
										aria-label=".form-select-sm example"
										v-model="selectedYear">
										<option value="null">Selecione uma opção.</option>
										<option value="1">1</option>
									</select>
									<div v-if="hasErrorAno" class="errorMessages mt-1">
										<small class="badge text-bg-danger ms-1 text-wrap">{{ errorIniciarPC.ano[0] }}</small>
									</div>
								</div>
							</div>
							<div class="row mb-3">
								<label for="inputEmail3" class="col-sm-2 col-form-label">Data de abertura</label>
								<div class="col-sm-10">
									<input
										type="datetime-local"
										class="form-control"
										v-model="dataAbertura"
										aria-label="Data de abertura" />
									<div v-if="hasErrorDataAbertura" class="errorMessages mt-1">
										<small class="badge text-bg-danger ms-1 text-wrap">{{ errorIniciarPC.dataAbertura[0] }}</small>
									</div>
								</div>
							</div>
							<div class="row mb-3">
								<label for="inputPassword3" class="col-sm-2 col-form-label">Data de encerrar</label>
								<div class="col-sm-10">
									<input
										type="datetime-local"
										class="form-control"
										v-model="dataEncerrar"
										aria-label="Data de encerrar" />
									<div v-if="hasErrorDataEncerrar" class="errorMessages mt-1">
										<small class="badge text-bg-danger ms-1 text-wrap">{{ errorIniciarPC.dataEncerar[0] }}</small>
									</div>
								</div>
							</div>
							<button
								v-if="editarInscricao == true"
								type="button"
								class="btn btn-primary me-1"
								@click="updateAbertura(selectedYear, dataAbertura, dataEncerrar)">
								<i class="align-baseline bi bi-check-lg"></i> Confirmar Edição
							</button>
							<button
								v-if="iniciarInscricao == true"
								type="button"
								class="btn btn-primary me-1"
								@click="
									createAbertura(this.counterStore.aberturasByCourse.id, selectedYear, 1, dataAbertura, dataEncerrar)
								">
								<i class="align-baseline bi bi-check-lg"></i> Confirmar
							</button>
							<button type="button" class="btn btn-warning" @click="cancelarEdicaoIniciacao()">
								<i class="align-baseline bi bi-x-lg"></i> Cancelar
							</button>
							<br />
							<span v-if="this.msgErrorTurnos != null" class="badge text-bg-danger text-wrap">{{
								this.msgErrorTurnos
							}}</span>
						</form>
					</div>
					<!-- EDITAR ABERTURAS - INSCRIÇÕES -->
				</div>
			</div>
		</div>
		<br />
		<div
			class="accordion"
			id="accordionExample"
			v-if="this.counterStore.aberturasByCourse.nome != null && this.counterStore.aberturasByCourseDeleted.length > 0">
			<div class="accordion-item">
				<h2 class="accordion-header" id="headingTwo">
					<button
						class="accordion-button"
						:class="{ collapsed: this.collapsed }"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseTwo"
						:aria-expanded="this.collapsed"
						aria-controls="collapseTwo"
						@click="this.collapsed = !this.collapsed">
						Períodos fechados
					</button>
				</h2>
				<div
					id="collapseTwo"
					class="accordion-collapse"
					:class="{ collapse: this.collapsed }"
					aria-labelledby="headingTwo"
					data-bs-parent="#accordionExample">
					<div class="card-body">
						<table class="table text-start">
							<thead>
								<tr>
									<th scope="col">Ano</th>
									<th scope="col">Tipo</th>
									<th scope="col">Data abertura</th>
									<th scope="col">Data Encerar</th>
									<th scope="col">Apagada</th>
								</tr>
							</thead>
							<tbody>
								<tr class="tableRow" v-for="aber in this.counterStore.aberturasByCourseDeleted" :key="aber">
									<td>{{ aber.ano == 0 ? "Todos" : aber.ano + "º" }}</td>
									<td>
										{{ aber.tipoAbertura == 0 ? "Confirmação" : "Inscrição" }}
									</td>
									<td>
										{{ aber.dataAbertura.replace(":00.000000Z", "").replace("T", " ") }}
									</td>
									<td>
										{{ aber.dataEncerar.replace(":00.000000Z", "").replace("T", " ") }}
									</td>
									<td>
										{{ aber.deleted_at.replace(".000000Z", "").replace("T", " ") }}
									</td>
								</tr>
							</tbody>
						</table>
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
	name: "GerirPeriodos",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			selectedCourse: null,
			navTabConfirmacaoUCs: true,
			formConfirmacao: false,
			formInscricao: false,
			selectedYear: null,
			dataAbertura: null,
			dataEncerrar: null,
			iniciarInscricao: false,
			editarInscricao: false,
			iniciarConfirmacao: false,
			editarConfirmacao: false,
			aberturaToEdit: null,
			errorIniciarPC: null,
			msgErrorTurnos: null,
			collapsed: true,
		};
	},
	computed: {
		hasMoreThanOneCurso() {
			if (this.counterStore.courses.length > 1) {
				return true;
			}
			return false;
		},
		hasErrorDataAbertura() {
			if (this.errorIniciarPC != null) {
				if (this.errorIniciarPC.dataAbertura) {
					return true;
				}
			}
			return false;
		},
		hasErrorDataEncerrar() {
			if (this.errorIniciarPC != null) {
				if (this.errorIniciarPC.dataEncerar) {
					return true;
				}
			}
			return false;
		},
		hasErrorAno() {
			if (this.errorIniciarPC != null) {
				if (this.errorIniciarPC.ano) {
					return true;
				}
			}
			return false;
		},
	},
	methods: {
		selectCourse() {
			this.formConfirmacao = false;
			this.formInscricao = false;
			this.selectedYear = null;
			this.dataAbertura = null;
			this.dataEncerrar = null;
			this.aberturaToEdit = null;
			this.errorIniciarPC = null;
			if (this.counterStore.selectedAnoletivo == null || this.counterStore.semestre == null) {
				this.$toast.error("Ano letivo e semestre não selecionados");
				return;
			}
			this.counterStore.getAberturasByCourse(this.selectedCourse.code);

			if (this.counterStore.aberturaInscricaoTodos.length <= 0) {
				return;
			}
			console.log(new Date());
			console.log(this.counterStore.aberturaInscricaoTodos.dataEncerar);

			//convert the new Date() variable to this format "yyyy-mm-ddThh:mm:ss"
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, "0");
			var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
			var yyyy = today.getFullYear();
			var hh = String(today.getHours()).padStart(2, "0");
			var min = String(today.getMinutes()).padStart(2, "0");
			var ss = String(today.getSeconds()).padStart(2, "0");
			today = yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":" + ss;
			console.log(today);

			let dataEncerramento = this.counterStore.aberturaInscricaoTodos.dataEncerar.replace(".000000Z", "");

			if (dataEncerramento < today) {
				console.log("Before delete");
				setTimeout(() => {
					this.deleteAbertura(this.counterStore.aberturaInscricaoTodos.id);
					console.log("After delete");
					console.log("Delayed function executed after 2 seconds");
				}, 2000);
			}
		},
		openEditarConfirmacao(abertura) {
			this.errorIniciarPC = null;
			this.editarConfirmacao = true;
			this.formConfirmacao = true;
			this.aberturaToEdit = abertura.id;
			this.selectedYear = abertura.ano;
			this.dataAbertura = abertura.dataAbertura.replace(":00.000000Z", "");
			this.dataEncerrar = abertura.dataEncerar.replace(":00.000000Z", "");
		},
		cancelarEdicaoIniciacao() {
			this.errorIniciarPC = null;
			this.formConfirmacao = false;
			this.editarConfirmacao = false;
			this.iniciarConfirmacao = false;
			this.formInscricao = false;
			this.editarInscricao = false;
			this.iniciarInscricao = false;
			this.selectedYear = null;
			this.dataAbertura = null;
			this.dataEncerrar = null;
		},
		openEditarInscricao(abertura) {
			this.errorIniciarPC = null;
			this.editarInscricao = true;
			this.formInscricao = true;
			this.aberturaToEdit = abertura.id;
			this.selectedYear = abertura.ano;
			this.dataAbertura = abertura.dataAbertura.replace(":00.000000Z", "");
			this.dataEncerrar = abertura.dataEncerar.replace(":00.000000Z", "");
		},
		createAbertura(courseId, year, type, dataAbertura, dataEncerrar) {
			this.msgErrorTurnos = null;
			console.log(year);
			if (dataAbertura == null || dataEncerrar == null || dataAbertura.length < 1 || dataEncerrar.length < 1) {
				this.msgErrorTurnos = "Preencha ambas as datas para o pedido de incrições.";

				return;
			}

			if (type == 1 && (year == null || year == "null")) {
				this.msgErrorTurnos = "Selecione o ano(s) a incluir.";
				return;
			}

			this.$axios
				.post("abertura/" + courseId, {
					ano: year,
					tipoAbertura: type,
					dataAbertura: dataAbertura,
					dataEncerar: dataEncerrar,
					semestre: this.counterStore.semestre,
					idAnoletivo: this.counterStore.selectedAnoletivo,
				})
				.then((response) => {
					this.$toast.success("Período de abertura criado com sucesso!");
					this.counterStore.getAberturasByCourse(courseId);
					this.cancelarEdicaoIniciacao();
				})
				.catch((error) => {
					if (type == 1 && error.response.status == 401) {
						this.msgErrorTurnos = error.response.data.erros;
					} else {
						this.errorIniciarPC = error.response.data;
						if (error.response.data.erros) {
							this.$toast.error(error.response.data.erros);
						} else {
							this.$toast.error("Não foi possível criar a abertura!");
						}
					}
				});
		},
		updateAbertura(year, dataAbertura, dataEncerrar) {
			console.log;
			if (dataAbertura == null || dataEncerrar == null || dataAbertura.length < 1 || dataEncerrar.length < 1) {
				this.$toast.warning("Preencha ambas as datas para o pedido de incrições.");
				return;
			}

			// if (type == 1 && (year == null || year == "null")) {
			// 	this.msgErrorTurnos = "Selecione o ano(s) a incluir.";
			// 	return;
			// }

			this.$axios
				.put("abertura/" + this.aberturaToEdit, {
					ano: year,
					dataAbertura: dataAbertura,
					dataEncerar: dataEncerrar,
				})
				.then((response) => {
					this.$toast.success("Período de abertura editado com sucesso!");
					this.counterStore.getAberturasByCourse(this.counterStore.aberturasByCourse.id);
					this.cancelarEdicaoIniciacao();
				})
				.catch((error) => {
					this.errorIniciarPC = error.response.data;
					this.$toast.error("Não foi possível editar a abertura!");
				});
		},
		deleteAbertura(aberturaId) {
			this.$axios
				.delete("abertura/" + aberturaId)
				.then((response) => {
					this.$toast.success("Abertura encerrada com sucesso!");
					this.counterStore.getAberturasByCourse(this.counterStore.aberturasByCourse.id);
					//console.log(this.counterStore.aberturasByCourse.id);
				})
				.catch((error) => {
					this.$toast.error("Não foi possível encerrar esta abertura!");
				});
		},
		compareDate(dataDeEncerramento) {
			//console.log("hello there");
			if (dataDeEncerramento == null) {
				return false;
			}
			//console.log("aaaaaaa passei o primeiro if");
			function formatDate(date) {
				let dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				let mes = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				let ano = date.getFullYear();
				let hora = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

				return `${ano}-${mes}-${dia} ${hora}:${min}`;
			}

			/*console.log("ccccccc passei o 2º if");
			console.log(formatDate(new Date()));
			console.log(dataDeEncerramento);
			console.log(
				dataDeEncerramento.replace(":00.000000Z", "").replace("T", " ")
			);*/

			return formatDate(new Date()) > dataDeEncerramento.replace(":00.000000Z", "").replace("T", " ");
		},
	},
	mounted() {
		this.counterStore.aberturasByCourse = [];
		this.counterStore.getCourses(2);
	},
};
</script>

<style scoped>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
