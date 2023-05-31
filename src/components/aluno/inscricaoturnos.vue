<template>
	<GDialog content-class="border border-light-subtle" v-model="dialogState">
		<div class="wrapper">
			<div class="content">
				<div class="text-end">
					<button class="btn text-center" @click="dialogState = false">
						<i class="align-baseline bi bi-x-lg"></i>
						Fechar
					</button>
				</div>
				<div class="title text-center">Horários todos os turnos</div>
				<p class="text-center fw-light">
					*Este horário poderá conter algum erro ou sofrer alterações*
				</p>
				<p class="text-center">
					Horários dos turnos para as uc's que está inscrito
				</p>
				<vue-cal
					locale="pt-br"
					:selected-date="dataInicialHorario"
					hide-view-selector
					:time-cell-height="30"
					:time-from="8 * 60"
					:time-to="24 * 60"
					:time-step="30"
					:disable-views="['years', 'year', 'month', 'day']"
					:hide-weekdays="[7]"
					:events="horario"
				>
					<template v-slot:event="{ event }">
						<div class="vuecal__event-title" v-html="event.title" />
						<div class="vuecal__event-content" v-html="event.content" />
					</template>
				</vue-cal>
			</div>
		</div>
	</GDialog>
	<GDialog v-model="popUpConfirmation" max-width="500">
		<div class="wrapper my-2">
			<div class="content">
				<div class="text-end">
					<button
						class="btn btn-outline-link"
						@click="popUpConfirmation = false"
					>
						<i class="align-baseline bi bi-x-lg"></i>
						Fechar
					</button>
				</div>
				<div class="mx-3">
					<div class="text-center">
						<h5>Tem a certeza que pretende avançar com a submissão?</h5>
					</div>
					<p class="text-center text-warning text-decoration-underline fw-bold">
						<i class="align-baseline bi bi-exclamation-diamond-fill"></i>
						Certifique-se que selecionou as opções que pretende!
						<i class="align-baseline bi bi-exclamation-diamond-fill"></i>
					</p>
					<div class="text-center mb-2">
						<button
							type="button"
							class="btn btn-success"
							@click="submitInscricao()"
						>
							<i class="align-baseline bi bi-check-circle-fill"></i>
							Confirmar
						</button>
						<span class="mx-1"></span>
						<button
							type="button"
							class="btn btn-danger"
							@click="popUpConfirmation = false"
						>
							<i class="align-baseline bi bi-x-circle-fill"></i>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	</GDialog>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">
				<br />
				<div class="card">
					<div class="card-body">
						<h3 class="card-title text-center mb-4">Inscrição nos Turnos</h3>
						<p class="card-title text-center">
							Ano Letivo: <b>{{ counterStore.ano }}</b> | Semestre:
							<b>{{ counterStore.semestre }}</b>
						</p>
						<hr />
						<div
							v-if="
								this.buttonArray.length == 0 &&
								noInscricoes &&
								Object.keys(this.aberturas).length == 0
							"
							class="alert alert-danger ms-5 mt-5"
							role="alert"
						>
							<p class="text-center">
								Não existe nenhum período de inscrições definido.
							</p>
						</div>
						<!-- <div v-if="noInscricoes && Object.keys(this.aberturas).length > 0">
                  <div v-for="aberturaCurso in aberturas" :key="aberturaCurso" style="text-align: center;">
                    <h4 style="margin-bottom: 15px;">{{ "["+aberturaCurso[0].codigo+"] "+aberturaCurso[0].nome }}</h4>
                    <div v-for="aberturaAno in aberturaCurso" :key="aberturaAno.idCurso">
                      
                    </div>  
                  </div>
                </div> -->
						<div
							v-for="(inscricaoucs, index) in cadeirasWithTurnosPorCurso"
							:key="inscricaoucs.id"
						>
							<div v-if="this.buttonArray.length > 0">
								<div
									v-for="aberturaCurso in aberturas"
									:key="aberturaCurso"
									class="text-center"
								>
									<div
										v-if="
											(aberturaCurso[0].idCurso == index &&
												noButtonSelectedMsgs) ||
											(aberturaCurso[0].idCurso == index && buttonArray[index])
										"
									>
										<h4 class="mb-2">
											{{
												"[" +
												aberturaCurso[0].codigo +
												"] " +
												aberturaCurso[0].nome
											}}
										</h4>
										<span
											v-for="aberturaAno in aberturaCurso"
											:key="aberturaAno.idCurso"
										>
											<div
												v-if="
													aberturaAno.isAberto == false && hasButtonSelected
												"
												class="alert alert-info ms-5 mt-2"
												role="alert"
											>
												O período de Inscrição nos Turnos para as UC´s
												<b>{{
													aberturaAno.ano == 0
														? "de todos os anos"
														: "do ano " + aberturaAno.ano
												}}</b>
												terá <b>início</b> a
												<b
													>{{
														aberturaAno.dataAbertura
															.replace(":00.000000Z", "")
															.replace("T", " ")
													}}h</b
												>
												({{
													aberturaAno.menosdeumdia
														? "falta " + aberturaAno.diasAteAbertura
														: aberturaAno.diasAteAbertura == 1
														? "falta " + aberturaAno.diasAteAbertura + " dia."
														: "faltam " +
														  aberturaAno.diasAteAbertura +
														  " dias."
												}})
											</div>
											<div
												v-if="aberturaAno.isAberto == true && hasButtonSelected"
												class="alert alert-success mt-2"
												role="alert"
											>
												O período de Inscrição nos Turnos
												<b>estará aberto</b> para
												<b>{{
													aberturaAno.ano == 0
														? "todos os anos "
														: "o ano " + aberturaAno.ano
												}}</b>
												até a
												<b
													>{{
														aberturaAno.dataEncerar
															.replace(":00.000000Z", "")
															.replace("T", " ")
													}}h</b
												>
												({{
													aberturaAno.menosdeumdiatermino
														? "falta " + aberturaAno.diasAteTerminar
														: aberturaAno.diasAteTerminar == 1
														? "falta " + aberturaAno.diasAteTerminar + " dia."
														: "faltam " +
														  aberturaAno.diasAteTerminar +
														  " dias."
												}})
											</div>
										</span>
									</div>
								</div>
							</div>
							<div v-if="hasButtonSelected">
								<div class="text-center mb-5">
									<button
										v-if="!buttonArray[index] && hasButtonSelected"
										type="button"
										class="btn btn-primary"
										@click="
											buttonArray[index] = !buttonArray[index];
											noInscricoes = false;
											noButtonSelectedMsgs = false;
										"
									>
										<i class="align-baseline bi bi-calendar-week"></i>
										Inscrever nos Turnos
									</button>
								</div>
							</div>
							<div v-else>
								<div class="text-center">
									<button
										v-if="!buttonArray[index] && hasButtonSelected"
										type="button"
										class="btn btn-primary"
										@click="
											buttonArray[index] = !buttonArray[index];
											noInscricoes = false;
											noButtonSelectedMsgs = false;
										"
									>
										Inscrever nos Turnos
									</button>
								</div>
							</div>
							<div v-if="buttonArray[index]" class="mt-3 text-start mb-5">
								<div
									v-for="(inscricaoucs, index2) in cadeirasWithTurnosPorCurso"
									:key="inscricaoucs.id"
								>
									<div v-if="index == index2">
										<label class="col-5 col-form-label"
											><strong>Unidade Curricular </strong>(ano/nome)</label
										>
										<label class="col-7 col-form-label"
											><strong>Turnos diponíveis </strong
											>(inscritos/vagas)</label
										>
										<br />
										<div
											v-for="(cadeira, cadeiraIndex) in inscricaoucs"
											:key="cadeira.cadeira.id"
										>
											<div v-if="cadeira.cadeira.turnos.length != 0">
												<label
													class="col-5 col-form-label align-middle float-start"
													>{{
														"(" +
														cadeira.cadeira.ano +
														"º ano) " +
														cadeira.cadeira.nome
													}}</label
												>
												<label class="col-7 col-form-label" for="nothingAtAll">
													<span
														v-for="(turno, index) in cadeira.cadeira.turnos"
														:key="turno"
														class="me-4"
													>
														<span
															class="ms-2"
															v-for="turnotipo in turno"
															:key="turnotipo.id"
														>
															<input
																role="button"
																class="form-check-input me-1"
																type="radio"
																:value="turnotipo.id"
																:id="turnotipo.id"
																v-model="arrayVmodel[cadeiraIndex][index]"
																@click="
																	clearRadio(cadeiraIndex, index, turnotipo.id)
																"
																:disabled="
																	turnotipo.vagasocupadas >=
																		turnotipo.vagastotal &&
																	arrayVmodelInicial[cadeiraIndex][index] !=
																		turnotipo.id
																"
															/>
															<label
																role="button"
																class="form-check-label"
																:for="turnotipo.id"
																:class="{
																	'text-danger':
																		turnotipo.vagasocupadas >=
																		turnotipo.vagastotal,
																}"
															>
																<i
																	class="bi bi-sunrise-fill text-success align-baseline"
																	v-if="
																		horario
																			.map((test) => test.title + test.content)
																			.indexOf(
																				cadeira.cadeira.nome +
																					turnotipo.tipo +
																					turnotipo.numero
																			) != -1 &&
																		horario[
																			horario
																				.map(
																					(test) => test.title + test.content
																				)
																				.indexOf(
																					cadeira.cadeira.nome +
																						turnotipo.tipo +
																						turnotipo.numero
																				)
																		].end.replace(/.*\s(\d+):\d+:\d+/, '$1') <=
																			14
																	"
																></i>
																<i
																	class="bi bi-sunset-fill text-primary align-baseline"
																	v-if="
																		horario
																			.map((test) => test.title + test.content)
																			.indexOf(
																				cadeira.cadeira.nome +
																					turnotipo.tipo +
																					turnotipo.numero
																			) != -1 &&
																		horario[
																			horario
																				.map(
																					(test) => test.title + test.content
																				)
																				.indexOf(
																					cadeira.cadeira.nome +
																						turnotipo.tipo +
																						turnotipo.numero
																				)
																		].end.replace(/.*\s(\d+):\d+:\d+/, '$1') >
																			14 &&
																		horario
																			.map((test) => test.title + test.content)
																			.indexOf(
																				cadeira.cadeira.nome +
																					turnotipo.tipo +
																					turnotipo.numero
																			) != -1 &&
																		horario[
																			horario
																				.map(
																					(test) => test.title + test.content
																				)
																				.indexOf(
																					cadeira.cadeira.nome +
																						turnotipo.tipo +
																						turnotipo.numero
																				)
																		].end.replace(/.*\s(\d+):\d+:\d+/, '$1') <=
																			18
																	"
																></i>
																<i
																	class="bi bi-moon-fill text-warning align-baseline"
																	v-if="
																		horario
																			.map((test) => test.title + test.content)
																			.indexOf(
																				cadeira.cadeira.nome +
																					turnotipo.tipo +
																					turnotipo.numero
																			) != -1 &&
																		horario[
																			horario
																				.map(
																					(test) => test.title + test.content
																				)
																				.indexOf(
																					cadeira.cadeira.nome +
																						turnotipo.tipo +
																						turnotipo.numero
																				)
																		].end.replace(/.*\s(\d+):\d+:\d+/, '$1') >
																			18
																	"
																></i>
																<i
																	class="bi bi-question-circle text-danger align-baseline"
																	v-if="
																		horario
																			.map((test) => test.title + test.content)
																			.indexOf(
																				cadeira.cadeira.nome +
																					turnotipo.tipo +
																					turnotipo.numero
																			) == -1
																	"
																></i>
																{{
																	turnotipo.numero == 0
																		? turnotipo.tipo
																		: turnotipo.tipo + turnotipo.numero
																}}<small>
																	({{ turnotipo.vagasocupadas }}/{{
																		turnotipo.vagastotal
																	}})</small
																>
															</label>
														</span>
														<br />
													</span>
												</label>
											</div>
										</div>
										<div class="text-center mt-3">
											<button
												type="button"
												class="btn btn-link"
												@click="getCadeirasWithTurnosWebSocket()"
											>
												Atualizar Vagas
											</button>
										</div>
										<div class="text-center mt-3">
											<button
												type="button"
												class="btn btn-secondary me-1"
												@click="dialogState = true"
											>
												<i class="align-baseline bi bi-calendar-check-fill"></i>
												Ver horários disponíveis
											</button>
											<button
												type="button"
												class="btn btn-secondary me-1"
												@click="getSobreposicoes()"
											>
												<i class="align-baseline bi bi-search"></i>
												Verificar sobreposições do meu horário
											</button>
										</div>
										<div class="text-center mt-3">
											<!-- <button type="button" class="btn btn-success" @click="submitInscricao()">Submeter</button> -->
											<button
												type="button"
												class="btn btn-success"
												@click="popUpConfirmation = true"
											>
												<i class="align-baseline bi bi-caret-right-fill"></i>
												Submeter
											</button>
											<button
												type="button"
												class="btn btn-warning ms-1"
												@click="clearRadios()"
											>
												<i class="align-baseline bi bi-x"></i>
												Limpar escolhas
											</button>
											<button
												v-if="buttonArray[index]"
												type="button"
												class="btn btn-primary ms-1"
												@click="
													buttonArray[index] = !buttonArray[index];
													noButtonSelectedMsgs = true;
												"
											>
												<i class="align-baseline bi bi-arrow-return-left"></i>
												Voltar
											</button>
										</div>
										<br />
									</div>
								</div>
							</div>
							<div
								v-if="
									!buttonArray[index] &&
									noButtonSelectedMsgs &&
									this.isncricoesAtuais[index] !== undefined
								"
								class="text-center mb-4"
							>
								<h5>Turnos atualmente inscritos:</h5>
								<p
									v-for="inscricao in this.isncricoesAtuais[index]"
									:key="inscricao"
								>
									{{
										inscricao["nome"] +
										(inscricao["ano"]
											? " (" + inscricao["ano"] + "º ano): "
											: "")
									}}
									<span v-for="ins in inscricao['turnos']" :key="ins">
										{{
											ins.tipo + (ins.numero == 0 ? "" : ins.numero) + "    "
										}}</span
									>
								</p>
								<span class="text-center"
									>Componentes de UC's com apenas 1 turno são inscritos
									automaticamente!</span
								>
							</div>
						</div>
						<div
							v-if="
								showTurnosRejeitados == true &&
								!(this.buttonArray.length > 0 && hasButtonSelected)
							"
							class="text-danger"
						>
							<hr />
							<div>
								Turnos Rejeitados por falta de Vagas:
								<div
									v-for="turnoRejeitado in turnosRejeitados"
									:key="turnoRejeitado"
								>
									<small>
										Turno - {{ turnoRejeitado.tipo }} (UC:
										{{ turnoRejeitado.cadeira }} / Curso:
										{{ turnoRejeitado.curso }})
									</small>
								</div>
							</div>
							<hr />
						</div>
						<div
							v-if="
								showTurnosCoicidem == true &&
								!(this.buttonArray.length > 0 && hasButtonSelected)
							"
							class="text-danger"
						>
							<hr />
							<div>
								Turnos que coincidem:
								<table class="table">
									<thead>
										<tr>
											<th scope="col-md-1">Números das Semanas</th>
											<th scope="col-md-2">Dia da semana</th>
											<th scope="col">Unidade curricular</th>
											<th scope="col">Unidade curricular</th>
										</tr>
									</thead>
									<tbody>
										<tr
											v-for="turnoCoicide in turnosCoicidem"
											:key="turnoCoicide"
										>
											<td scope="col-md-1">{{ turnoCoicide[0] }}</td>
											<td scope="col-md-2">{{ turnoCoicide[1] }}</td>
											<td>{{ turnoCoicide[2] }}</td>
											<td>{{ turnoCoicide[3] }}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<hr />
						</div>
						<div id="app" v-if="dataInicialHorariopessoal != null">
							<hr />
							<h4 ref="horariopessoalref" class="text-center">
								Horário pessoal
							</h4>
							<p class="text-center">
								*Este horário poderá conter algum erro ou sofrer alterações*
							</p>
							<vue-cal
								locale="pt-br"
								:selected-date="dataInicialHorariopessoal"
								hide-view-selector
								:time-cell-height="30"
								:time-from="8 * 60"
								:time-to="24 * 60"
								:time-step="30"
								:disable-views="['years', 'year', 'month', 'day']"
								:hide-weekdays="[7]"
								:events="horariopessoal"
							>
								<template v-slot:event="{ event }">
									<div class="vuecal__event-title" v-html="event.title" />
									<div class="vuecal__event-content" v-html="event.content" />
								</template>
							</vue-cal>
							<hr />
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
import { defineComponent } from "vue";

export default {
	name: "InscricaoTurnos",
	component: { defineComponent },
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	el: "#calendario",
	data() {
		return {
			cadeirasWithTurnosPorCurso: [],
			cadeirasWithTurnosPorCursoWebSocket: [],
			isncricoes: [],
			isncricoesAtuais: [],
			aberturas: [],
			arrayVmodel: [],
			arrayVmodelInicial: [],
			allTurnosIds: [],
			showTurnosRejeitados: false,
			turnosRejeitados: [],
			showTurnosCoicidem: false,
			turnosCoicidem: [],
			showInscricaoForm: false,
			buttonArray: [],
			buttonBlockArray: [],
			noInscricoes: false,
			myUCsIds: [],
			noButtonSelectedMsgs: true,
			added: [],
			removed: [],
			dialogState: false,
			horario: [],
			c: null,
			horariopessoal: [],
			dataInicialHorariopessoal: null,
			popUpConfirmation: false,
		};
	},
	sockets: {
		newInscricao(response) {
			if (response.added) {
				this.added = response.added;
			}
			if (response.removed) {
				this.removed = response.removed;
			}
			this.updateVagasTurnos();
		},
	},
	computed: {
		hasButtonSelected() {
			for (let index = 0; index < this.buttonArray.length; index++) {
				if (this.buttonArray[index] == true) {
					return false;
				}
			}
			return true;
		},
	},
	methods: {
		clearRadio(cadeiraIndex, index, turnotipoId) {
			if (this.arrayVmodel[cadeiraIndex][index] == turnotipoId) {
				this.arrayVmodel[cadeiraIndex][index] = [];
			}
		},
		clearRadios() {
			for (let i = 0; i < this.arrayVmodel.length; i++) {
				this.arrayVmodel[i] = [];
			}
			//para ir buscar turnos ja inscritos
			//this.getCadeirasWithTurnos()
		},
		async getCadeirasWithTurnos() {
			var copyDecadeirasWithTurnosPorCurso;
			await this.$axios
				.get("cadeirasaluno/utilizador")
				.then((response) => {
					if (response.data.horario.horario.length > 0) {
						this.horario = response.data.horario.horario;
						this.dataInicialHorario = response.data.horario.data;
						//console.log(this.horario);
					}
					if (response.data.horariopessoal.horario.length > 0) {
						this.horariopessoal = response.data.horariopessoal.horario;
						this.dataInicialHorariopessoal = response.data.horariopessoal.data;
					} else {
						this.horariopessoal = [];
						this.dataInicialHorariopessoal = null;
					}
					copyDecadeirasWithTurnosPorCurso = JSON.parse(
						JSON.stringify(response.data.cursos)
					);
					this.cadeirasWithTurnosPorCurso = response.data.cursos;
					this.inscricoes = response.data.inscricoes;
					this.isncricoesAtuais = response.data.inscricoesTurnosAtuais;
					this.aberturas = response.data.aberturas;
					Object.values(this.cadeirasWithTurnosPorCurso).forEach(
						(inscricaoucs, index3) => {
							inscricaoucs.forEach((cadeira, cadeiraIndex) => {
								this.buttonArray[cadeira.idCurso] = false;
								this.arrayVmodel.push([]);
								this.arrayVmodelInicial.push([]);
								this.myUCsIds.push(cadeira.id);
								Object.values(cadeira.cadeira.turnos).forEach(
									(turno, index) => {
										turno.forEach((turnotipo, index2) => {
											this.inscricoes.forEach((inscricao) => {
												if (
													cadeira.id == inscricao.idCadeira &&
													turnotipo.id == inscricao.id &&
													turnotipo.tipo === inscricao.tipo
												) {
													this.arrayVmodel[cadeiraIndex][inscricao.tipo] =
														inscricao.id;
													this.arrayVmodelInicial[cadeiraIndex][
														inscricao.tipo
													] = inscricao.id;
												}
											});
										});
									}
								);
							});
						}
					);
					//console.log(this.arrayVmodelInicial);
					this.noInscricoes = true;
				})
				.catch((error) => {});

			//this.horario[0].class = "bg-danger";
			//console.log(this.horario);
			this.horario.forEach((horario) => {
				//console.log("entrei no foreach");
				//console.log(copyDecadeirasWithTurnosPorCurso);
				//console.log(Object.values(copyDecadeirasWithTurnosPorCurso)[0]);
				Object.values(copyDecadeirasWithTurnosPorCurso)[0].forEach(
					(cadeira) => {
						//console.log("entrei no foreach2");
						//console.log(cadeira.cadeira.turnos);
						Object.values(cadeira.cadeira.turnos).forEach((turno) => {
							//console.log(turno);
							//console.log("entrei no foreach3");
							turno.forEach((turnotipo) => {
								//console.log("entrei no foreach4");
								//console.log(turnotipo);
								// console.log(horario.title);
								// console.log(cadeira.cadeira.nome);
								// console.log(turnotipo.vagasocupadas);
								// console.log(turnotipo.vagastotal);
								// console.log(horario.title == cadeira.cadeira.nome);
								// console.log("-----------------------------------");
								if (
									horario.title == cadeira.cadeira.nome &&
									turnotipo.vagasocupadas >= turnotipo.vagastotal &&
									turnotipo.tipo + turnotipo.numero == horario.content
								) {
									//console.log("entrei no if");
									horario.class = "bg-danger text-white border-danger";
								}
							});
						});
					}
				);
			});
			//console.log(this.horario);
		},
		getCadeirasWithTurnosWebSocket() {
			this.$axios
				.get("cadeirasaluno/utilizador")
				.then((response) => {
					this.cadeirasWithTurnosPorCursoWebSocket = response.data.cursos;
					Object.values(this.cadeirasWithTurnosPorCurso).forEach(
						(inscricaoucs) => {
							inscricaoucs.forEach((cadeira) => {
								Object.values(cadeira.cadeira.turnos).forEach((turno) => {
									turno.forEach((turnotipo, index) => {
										Object.values(
											this.cadeirasWithTurnosPorCursoWebSocket
										).forEach((inscricaoucsNovo) => {
											inscricaoucsNovo.forEach((cadeiraNovo) => {
												Object.values(cadeiraNovo.cadeira.turnos).forEach(
													(turnoNovo) => {
														turnoNovo.forEach((turnotipoNovo, indexNovo) => {
															if (
																turnotipo.vagasocupadas !=
																	turnotipoNovo.vagasocupadas &&
																index == indexNovo &&
																turnotipo.id == turnotipoNovo.id
															) {
																turnotipo["vagasocupadas"] =
																	turnotipoNovo.vagasocupadas;
															}
														});
													}
												);
											});
										});
									});
								});
							});
						}
					);
				})
				.catch((error) => {});
		},
		updateVagasTurnos() {
			Object.values(this.cadeirasWithTurnosPorCurso).forEach((inscricaoucs) => {
				inscricaoucs.forEach((cadeira) => {
					Object.values(cadeira.cadeira.turnos).forEach((turno) => {
						turno.forEach((turnotipo, index) => {
							this.added.forEach((turnoAdded) => {
								if (turnotipo.id == turnoAdded) {
									turnotipo["vagasocupadas"] += 1;
								}
							});
							this.removed.forEach((turnoRemoved) => {
								if (turnotipo.id == turnoRemoved) {
									turnotipo["vagasocupadas"] -= 1;
								}
							});
						});
					});
				});
			});
			this.arrayVmodelInicial = this.arrayVmodel;
			// console.log(this.arrayVmodelInicial);
		},
		submitInscricao() {
			this.added = null;
			this.removed = null;
			this.turnosRejeitados = null;
			this.showTurnosRejeitados = false;
			this.turnosCoicidem = null;
			this.showTurnosCoicidem = false;
			this.arrayVmodel.forEach((cadeira) => {
				if (cadeira.TP != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.TP);
				}
				if (cadeira.PL != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.PL);
				}
				if (cadeira.T != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.T);
				}
				if (cadeira.P != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.P);
				}
				if (cadeira.E != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.E);
				}
				if (cadeira.OT != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.OT);
				}
			});
			this.popUpConfirmation = false;

			// if (!this.allTurnosIds) {
			// 	this.$toast.warning("Selecione pelo menos um turno!");
			// 	return;
			// }

			this.$axios
				.post("cadeirasaluno/inscricao", {
					idUtilizador: this.counterStore.utilizadorLogado.id,
					turnosIds: this.allTurnosIds,
				})
				.then((response) => {
					this.$toast.success("Inscrição feita com sucesso");
					//console.log(response);
					if (response.data.rejeitados && response.data != 201) {
						this.showTurnosRejeitados = true;
						this.turnosRejeitados = response.data.rejeitados;
					}
					if (response.data.inscricoesTurnosAtuais) {
						this.isncricoesAtuais = response.data.inscricoesTurnosAtuais;
					}

					if (response.data.updatedTurnos.added) {
						this.added = response.data.updatedTurnos.added;
					}
					if (response.data.updatedTurnos.removed) {
						this.removed = response.data.updatedTurnos.removed;
					}
					if (response.data.horariopessoal.horario.length > 0) {
						this.horariopessoal = response.data.horariopessoal.horario;
						this.dataInicialHorariopessoal = response.data.horariopessoal.data;
					} else {
						this.horariopessoal = [];
						this.dataInicialHorariopessoal = null;
					}
					if (response.data.coicidem.length > 0) {
						this.showTurnosCoicidem = true;
						this.turnosCoicidem = response.data.coicidem;
					}
					this.updateVagasTurnos();
					this.$socket.emit("newInscricao", response.data.updatedTurnos);
					this.allTurnosIds = [];

					var element = this.$refs["horariopessoalref"];
					var top = element.offsetTop;
					window.scrollTo(0, top);
				})
				.catch((error) => {
					console.log(error);
					this.$toast.error(
						"Não foi possível inscrever! " + error.response.data
					);
					this.allTurnosIds = [];
				});
		},
		getSobreposicoes() {
			this.turnosCoicidem = null;
			this.showTurnosCoicidem = false;
			this.arrayVmodel.forEach((cadeira) => {
				if (cadeira.TP != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.TP);
				}
				if (cadeira.PL != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.PL);
				}
				if (cadeira.T != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.T);
				}
				if (cadeira.P != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.P);
				}
				if (cadeira.E != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.E);
				}
				if (cadeira.OT != undefined) {
					this.allTurnosIds = this.allTurnosIds.concat(cadeira.OT);
				}
			});
			this.$axios
				.post("cadeirasaluno/sobreposicoes", {
					idUtilizador: this.counterStore.utilizadorLogado.id,
					turnosIds: this.allTurnosIds,
				})
				.then((response) => {
					if (response.data.horariopessoal.horario.length > 0) {
						this.horariopessoal = response.data.horariopessoal.horario;
						this.dataInicialHorariopessoal = response.data.horariopessoal.data;
					}
					if (response.data.coicidem.length > 0) {
						this.showTurnosCoicidem = true;
						this.turnosCoicidem = response.data.coicidem;
					}
					this.allTurnosIds = [];
				})
				.catch((error) => {
					this.allTurnosIds = [];
				});
		},
	},
	mounted() {
		this.getCadeirasWithTurnos();
	},
};
</script>

<style></style>
