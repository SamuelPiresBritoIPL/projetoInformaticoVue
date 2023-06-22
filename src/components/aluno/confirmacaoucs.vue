<template>
	<div class="container-fluid">
		<div class="row mt-4">
			<div
				class="col-md-1"
				:class="{ 'col-md-3': adicionarCadeirasForm == false }"
			></div>
			<div
				class="col-md-5"
				:class="{ 'col-md-6': adicionarCadeirasForm == false }"
			>
				<div class="card">
					<div class="card-body">
						<h5 class="card-title mb-1">Unidades Curriculares Inscritas</h5>
						<hr />
						<div
							v-if="!periodo && Object.keys(infoPedidos).length > 0"
							class="alert alert-info text-center mt-1"
							role="alert"
						>
							O período de Pedidos de Inscrição de UC's <b>terá inicio</b> a
							<b
								>{{
									infoPedidos.dataAbertura
										.replace(":00.000000Z", "")
										.replace("T", " ")
								}}h</b
							>
							({{
								infoPedidos.menosdeumdia
									? "falta " + infoPedidos.diasAteAbertura
									: infoPedidos.diasAteAbertura == 1
									? "falta " + infoPedidos.diasAteAbertura + " dia."
									: "faltam " + infoPedidos.diasAteAbertura + " dias."
							}})
						</div>
						<div
							v-if="periodo && Object.keys(infoPedidos).length > 0"
							class="alert alert-success text-center mt-1"
							role="alert"
						>
							O período de Pedidos de Inscrição de UC's <b>estará aberto</b> até
							a
							<b
								>{{
									infoPedidos.dataEncerar
										.replace(":00.000000Z", "")
										.replace("T", " ")
								}}h</b
							>
							({{
								infoPedidos.menosdeumdiatermino
									? "falta " + infoPedidos.diasAteTerminar
									: infoPedidos.diasAteTerminar == 1
									? "falta " + infoPedidos.diasAteTerminar + " dia."
									: "faltam " + infoPedidos.diasAteTerminar + " dias."
							}})
						</div>
						<ul
							v-for="cadeiraToConfirm in cadeirasToConfirm"
							:key="cadeiraToConfirm.cadeira"
						>
							<h5>{{ cadeiraToConfirm[0].nomeCurso }}</h5>
							<li
								class="mb-3"
								v-for="cadeira in cadeiraToConfirm"
								:key="cadeira.id"
							>
								{{
									"(" + cadeira.cadeira.ano + "º ano) " + cadeira.nomeCadeira
								}}
							</li>
						</ul>
						<div v-if="periodo" class="mt-5 text-center">
							<!-- <button type="button" class="btn btn-primary" style="margin-bottom: 5px; width: 50%" @click="inscricaoCadeiras(0)" :disabled="adicionarCadeirasForm">Confirmar Cadeiras</button><br> -->
							<button
								type="button"
								class="btn btn-primary mb-2 w-50"
								@click="adicionarCadeiras()"
								:disabled="adicionarCadeirasForm"
							>
								<i class="align-baseline bi bi-file-earmark-spreadsheet"></i>
								Efetuar Pedido de Inscrição</button
							><br />
						</div>
					</div>
				</div>
			</div>
			<div v-if="adicionarCadeirasForm == true" class="col-md-5">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title mb-3">
							Pedido de inscrição de Unidades Curriculares
						</h5>
						<hr />
						<div class="overflow-y-auto" style="max-height: 300px">
							<div v-for="cadeira in cadeirasNaoAprovadas" :key="cadeira.id">
								<p>
									<input
										class="form-check-input mx-2"
										type="checkbox"
										:id="cadeira.id"
										:value="cadeira.id"
										v-model="cadeirasToRequest"
										:disabled="cadeira.estado == 1"
									/>
									<label
										role="button"
										class="form-check-label"
										:for="cadeira.id"
									>
										{{ cadeira.nome }}
									</label>
								</p>
							</div>
						</div>
						<hr />
						<button
							type="button"
							class="btn btn-outline-primary"
							@click="openAddCadeiraDeOutroCurso()"
						>
							<i class="align-baseline bi bi-calendar2-check-fill"></i>
							Adicionar UC de outro curso
						</button>
						<div v-if="showBtnAdicionarUCOutroCurso == true">
							<select
								class="form-select form-select-sm mt-2 mb-1"
								aria-label=".form-select-sm example"
								v-model="selectedCourse"
								v-on:change="this.counterStore.getCourseWithUCs(selectedCourse)"
							>
								<option value="null">Selecione um curso.</option>
								<option
									v-for="course in this.counterStore.courses"
									:key="course.id"
									v-bind:value="course.id"
								>
									{{ "[" + course.codigo + "] " + course.nome }}
								</option>
							</select>
							<select
								class="form-select form-select-sm"
								aria-label=".form-select-sm example"
								v-model="selectedCadeira"
								v-on:change="addUCToInscrever()"
							>
								<option value="null">Selecione a UC que pretende.</option>
								<option
									v-for="cadeira in this.counterStore.courseWithUCs.cadeiras"
									:key="cadeira"
									v-bind:value="cadeira"
								>
									{{ cadeira.nome }}
								</option>
							</select>
						</div>
						<hr />
						<div v-if="cadeirasOutrosCursos.length > 0">
							<p>UC's de outros cursos</p>
							<div v-for="cadeira in cadeirasOutrosCursos" :key="cadeira">
								<p>
									<input
										class="form-check-input me-3"
										type="checkbox"
										:value="cadeira.id"
										:id="cadeira.id"
										v-model="cadeirasToRequest"
									/>
									<label
										role="button"
										class="form-check-label"
										:for="cadeira.id"
									>
										{{ "[" + cadeira.codigo + "] " + cadeira.nome }}
									</label>
								</p>
							</div>
						</div>
						<div class="form-floating my-3">
							<textarea
								class="form-control"
								placeholder="Leave a comment here"
								id="floatingTextarea2"
								style="height: 100px; resize: none"
								v-model="requestDescription"
							></textarea>
							<label for="floatingTextarea2">Justifique:</label>
						</div>
						<div v-if="hasError" class="errorMessages mb-3 mt-1">
							<small class="badge text-bg-danger text-wrap">{{
								errorMessages
							}}</small>
						</div>
						<div v-if="hasErrorDescricao" class="errorMessages mb-3 mt-1">
							<small class="badge text-bg-danger text-wrap">{{
								errorMessages.descricao[0]
							}}</small>
						</div>
						<div class="text-center">
							<button
								type="button"
								class="btn btn-primary me-1"
								@click="inscricaoCadeiras(1)"
							>
								<i class="align-baseline bi bi-caret-right-fill"></i>
								Submeter
							</button>
							<button
								type="button"
								class="btn btn-danger"
								@click="
									adicionarCadeirasForm = false;
									this.errorMessages = null;
								"
							>
								<i class="align-baseline bi bi-x-circle-fill"></i>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<br />
		<br />
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-2"></div>
				<div class="col-md-8">
					<div v-if="this.pedidos.length != 0">
						<div class="accordion" id="accordionExample">
							<div class="accordion-item">
								<h2 class="accordion-header" id="headingThree">
									<button
										class="accordion-button"
										:class="{ collapsed: this.collapsed[0] }"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#collapseThree"
										:aria-expanded="this.collapsed[0]"
										aria-controls="collapseThree"
										@click="changeCollapsed(0)"
									>
										Histórico dos meus Pedidos de Inscrição
									</button>
								</h2>
								<div
									id="collapseThree"
									class="accordion-collapse"
									:class="{ collapse: this.collapsed[0] }"
									aria-labelledby="headingThree"
									data-bs-parent="#accordionExample"
								>
									<div class="accordion-body">
										<div>
											<table class="table text-start">
												<thead>
													<tr>
														<th scope="col">Curso</th>
														<th scope="col">Ano letivo</th>
														<th scope="col">Unidades Curriculares</th>
														<th scope="col">Estado</th>
													</tr>
												</thead>
												<tbody>
													<tr
														class="tableRow"
														v-for="pedido in this.pedidos"
														:key="pedido"
													>
														<td>{{ pedido.cadeiras[0].cadeira.curso }}</td>
														<td>{{ pedido.anoletivo.anoletivo }}</td>
														<td>
															<p
																v-for="cadeira in pedido.cadeiras"
																:key="cadeira"
															>
																{{
																	cadeira.cadeira.nome +
																	(cadeira.aceite == 1
																		? " (aceite)"
																		: cadeira.aceite == 0
																		? " (rejeitada)"
																		: "")
																}}
															</p>
														</td>
														<td>
															{{
																pedido.estado == 1
																	? "Pendente"
																	: pedido.estado == 2
																	? "Aceite"
																	: pedido.estado == 3
																	? "Recusado"
																	: "Parcial"
															}}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br /><br /><br />
		</div>
	</div>
</template>

<script>
import { useCounterStore } from "../../stores/counter";
export default {
	name: "ConfirmacaoUCs",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			cadeirasToConfirm: [],
			pedidos: [],
			infoPedidos: [],
			periodo: false,
			adicionarCadeirasForm: false,
			cadeirasNaoAprovadas: [],
			cadeirasToRequest: [],
			requestDescription: null,
			selectedCourse: null,
			selectedCadeira: null,
			cadeirasOutrosCursos: [],
			showBtnAdicionarUCOutroCurso: false,
			errorMessages: null,
			collapsed: [true],
		};
	},
	computed: {
		hasError() {
			if (this.errorMessages != null) {
				if (this.errorMessages.descricao) {
					return false;
				}
				return true;
			}
			return false;
		},
		hasErrorDescricao() {
			if (this.errorMessages != null) {
				if (this.errorMessages.descricao) {
					return true;
				}
			}
			return false;
		},
	},
	methods: {
		getCadeirasToConfirm() {
			this.$axios
				.get("cadeirasaluno/confirmar/utilizador")
				.then((response) => {
					//console.log(response.data)
					this.cadeirasToConfirm = response.data.cursos;
					this.pedidos = response.data.pedidos;
					this.infoPedidos = response.data.infoPedidos;
					this.periodo = response.data.periodo;
					//console.log(this.pedidos)
				})
				.catch((error) => {
					console.log(error.response);
				});
		},
		inscricaoCadeiras(state) {
			//console.log(this.counterStore.anosletivos)
			this.errorMessages = null;

			if (
				this.requestDescription == null ||
				this.requestDescription.length < 1
			) {
				this.errorMessages = "A justificação é obrigatória!";
				return;
			}

			this.$axios
				.post("cadeirasaluno/pedidos", {
					estado: state,
					...(state == 0
						? { descricao: "cadeiras confirmadas" }
						: { descricao: this.requestDescription }),
					idUtilizador: this.counterStore.utilizadorLogado.id,
					idAnoletivo: this.counterStore.selectedAnoletivo,
					semestre: this.counterStore.semestre,
					...(state == 0 ? {} : { cadeirasIds: this.cadeirasToRequest }),
				})
				.then((response) => {
					if (state == 0) {
						this.$toast.success("Cadeiras confirmadas com sucesso!");
					} else if (state == 1) {
						this.$toast.success(
							"Pedido de alteração de UCs efetuado com sucesso!"
						);
						//this.cadeirasOutrosCursos = []
						//this.cadeirasToRequest = []
						this.requestDescription = null;
						this.adicionarCadeirasForm = false;
						this.getCadeirasToConfirm();
					}
				})
				.catch((error) => {
					if (state == 0) {
						this.$toast.error("Não foi possível confirmar as UCs!");
					} else if (state == 1) {
						this.$toast.error(
							"Não foi possível efetuar o pedido de alteração de UCs!"
						);
						this.errorMessages = error.response.data;
					}
				});
		},
		adicionarCadeiras() {
			this.adicionarCadeirasForm = true;
			this.getCadeirasNaoAprovadas();
		},
		getCadeirasNaoAprovadas() {
			this.$axios
				.get(
					"cadeirasaluno/naoaprovadas/" + this.counterStore.utilizadorLogado.id
				)
				.then((response) => {
					this.cadeirasNaoAprovadas = response.data;
					for (
						let index = 0;
						index < this.cadeirasNaoAprovadas.length;
						index++
					) {
						if (this.cadeirasNaoAprovadas[index].estado == 1) {
							this.cadeirasToRequest.push(this.cadeirasNaoAprovadas[index].id);
						}
					}
				})
				.catch((error) => {
					console.log(error.response);
				});
		},
		openAddCadeiraDeOutroCurso() {
			this.showBtnAdicionarUCOutroCurso = !this.showBtnAdicionarUCOutroCurso;
			if (this.showBtnAdicionarUCOutroCurso == true) {
				this.counterStore.getCourses();
			}
		},
		addUCToInscrever() {
			if (this.selectedCadeira != "null") {
				this.cadeirasOutrosCursos.push(this.selectedCadeira);
				this.cadeirasToRequest.push(this.selectedCadeira.id);
			}
		},
		changeCollapsed(number) {
			this.collapsed[number] = this.collapsed[number] == true ? false : true;
		},
	},
	mounted() {
		this.getCadeirasToConfirm();
	},
};
</script>

<style></style>
