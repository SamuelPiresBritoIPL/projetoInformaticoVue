<template>
	<div class="container-fluid">
		<h3 class="mt-3 mb-4">Atualizar Base de Dados</h3>
		<div class="alert alert-danger text-center" role="alert">
			<i class="align-baseline bi bi-exclamation-octagon-fill"></i> Todas as ações poderão demorar algum tempo
			<i class="align-baseline bi bi-exclamation-octagon-fill"></i><br /><b> Não dê refresh à página</b>, nem saia da
			mesma sem que ação executada termine, caso contrário os dados não ficarão atualizados de forma correta!
		</div>
		<div>
			<div class="alert alert-primary mb-0 text-center" role="alert">
				<i class="align-baseline bi bi-info-square-fill"></i>
				A <b>primeira busca</b> de dados de um determinado ano letivo deve ser efetuada pela seguinte ordem!
				<i class="align-baseline bi bi-info-square-fill"></i>
			</div>
			<br />
			<!-- file input with button to convert using papaparse -->
			<div class="accordion" id="accordionExample">
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingTwo">
						<button
							class="accordion-button"
							:class="{ collapsed: this.collapsed[1] }"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseTwo"
							:aria-expanded="this.collapsed[1]"
							aria-controls="collapseTwo"
							@click="changeCollapsed(1)">
							1º Atualizar turnos/cursos/professores
						</button>
					</h2>
					<div
						id="collapseTwo"
						class="accordion-collapse"
						:class="{ collapse: this.collapsed[1] }"
						aria-labelledby="headingTwo"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<p class="card-text">
								Selecione o <b>ano letivo</b> e o <b>semestre</b> de forma a buscar os dados dos cursos e professores
								mais atualizados.
							</p>
							<div class="mb-3">
								<label for="exampleFormControlInput1" class="form-label">Ano letivo</label>
								<input
									type="number"
									aria-label="Ano Letivo, segundo passo"
									class="form-control"
									list="anosletivos"
									id="exampleFormControlInput1"
									placeholder="Anoletivo (ex: 202223)"
									v-model="anoletivocurso" />
								<datalist id="anosletivos">
									<option
										v-for="anoletivo in this.counterStore.anosletivos"
										:key="anoletivo.id"
										v-bind:value="anoletivo.anoletivo">
										{{ anoletivo.ativo == 1 ? "Ativo (" + anoletivo.semestreativo + "º Semestre)" : "" }}
									</option>
								</datalist>
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInput3" class="form-label">Semestre</label>
								<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="semestrecurso">
									<option value="null">Selecione o semestre</option>
									<option value="1">1</option>
									<option value="2">2</option>
								</select>
							</div>
							<button
								:disabled="blocked"
								class="btn btn-primary"
								@click="updateCourseInformation(anoletivocurso, semestrecurso)">
								<span v-if="loading[0]" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span
								>Atualizar turnos/cursos/professores
							</button>
							<br><br>
							<div class="alert alert-info" role="alert">
								Como alternativa, poderá usar um CSV para enviar os seus dados.
							</div>
							<div>
								<input
									class="form-control my-1"
									type="file"
									ref="file"
									aria-label="Upload CSV File"
									accept=".csv"
									@change="handleFileUpload()" />
								<button class="btn btn-primary" @click="stepOneCSV()" :disabled="blocked">
									<i class="bi bi-filetype-csv"></i> Atualizar turnos/cursos/professores com CSV
								</button>
							</div>
						</div>
					</div>
				</div>
				<!-- <br> -->
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingThree">
						<button
							class="accordion-button"
							:class="{ collapsed: this.collapsed[2] }"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseThree"
							:aria-expanded="this.collapsed[2]"
							aria-controls="collapseThree"
							@click="changeCollapsed(2)">
							2ª Atualizar inscrições e ucs aprovadas (estudantes)
						</button>
					</h2>
					<div
						id="collapseThree"
						class="accordion-collapse"
						:class="{ collapse: this.collapsed[2] }"
						aria-labelledby="headingThree"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<p class="card-text">
								Selecione o <b>ano letivo</b> e o <b>curso</b> de forma a buscar os dados dos estudantes e das suas
								respetivas inscrições em UC's.
							</p>
							<div class="mb-3">
								<label for="exampleFormControlInput4" class="form-label">Ano letivo</label>
								<input
									aria-label="Ano Letivo, terceiro passo"
									type="number"
									class="form-control"
									list="anosletivos"
									id="exampleFormControlInput4"
									placeholder="Anoletivo (ex: 202223)"
									v-model="anoletivoinscricoes" />
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInput5" class="form-label">Curso</label>
								<!-- <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="selectedCourse"
                >
                  <option value="0">Todos</option>
                  <option
                    v-for="course in this.counterStore.courses"
                    :key="course.id"
                    v-bind:value="course.id"
                  >
                    {{ "[" + course.codigo + "] " + course.nome }}
                  </option>
                </select> -->
								<v-select
									aria-label=".form-select-sm example"
									code="code"
									:options="this.counterStore.coursesToVSelect"
									single-line
									v-model="counterStore.selectedCourse"
									@option:selected="selectCurso()">
								</v-select>
							</div>
							<button
								:disabled="blocked"
								class="btn btn-primary"
								@click="updateInscricaoInformation(anoletivoinscricoes, 2)">
								<span
									v-if="loading[1]"
									class="spinner-border spinner-border-sm"
									role="status"
									aria-hidden="true"></span>
								Atualizar inscrições e ucs aprovadas (estudantes)
							</button>
							<br><br>
							<div class="alert alert-info" role="alert">
								Como alternativa, poderá usar um CSV para enviar os seus dados.
							</div>
							<div>
								<input
									class="form-control my-1"
									type="file"
									ref="file2"
									aria-label="Upload CSV File"
									accept=".csv"
									@change="handleFileUpload()" />
								<button class="btn btn-primary" @click="stepTwoCSV()" :disabled="blocked">
									<i class="bi bi-filetype-csv"></i> Atualizar inscrições e ucs aprovadas (estudantes) com CSV
								</button>
							</div>
						</div>
					</div>
				</div>
				<!--<br>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFour">
          <button class="accordion-button" :class="{collapsed:this.collapsed[3]}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" :aria-expanded="this.collapsed[3]" aria-controls="collapseFour" @click="changeCollapsed(3)">
            3º Atualizar ucs feitas pelos alunos
          </button>
        </h2>
        <div id="collapseFour" class="accordion-collapse" :class="{collapse:this.collapsed[3]}" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <p class="card-text">Selecione o ano letivo e o semestre para ir buscar os novos dados dos alunos e das ucs já feitas pelo mesmo.</p>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Ano letivo</label>
              <input type="number" class="form-control" list="anosletivos" id="exampleFormControlInput1" placeholder="Anoletivo (ex: 202223)" v-model="anoletivoaprovacoes">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Curso</label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCourse">
                <option value="0">Todos</option>
                <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
                {{ "["+course.codigo+"] "+course.nome }}
                </option>
              </select>
            </div>
            <button :disabled='blocked' class="btn btn-primary" @click="updateInscricaoInformation(anoletivoaprovacoes, 3, 'webservice/inscricaoaprovados')">
                <span v-if="loading[2]" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Atualizar dados
            </button>
          </div>
        </div>
      </div>-->
				<!-- <br> -->
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingFive">
						<button
							class="accordion-button"
							:class="{ collapsed: this.collapsed[4] }"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseFive"
							:aria-expanded="this.collapsed[4]"
							aria-controls="collapseFive"
							@click="changeCollapsed(4)">
							3º Inscrever estudantes nos turnos
						</button>
					</h2>
					<div
						id="collapseFive"
						class="accordion-collapse"
						:class="{ collapse: this.collapsed[4] }"
						aria-labelledby="headingFive"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<p class="card-text">
								Selecione o <b>ano letivo</b> e o <b>semestre</b> para efetuar a inscrição nos turnos únicos (Turnos no
								qual são únicos para um determinado tipo de aulas de uma UC. Ex: Turno único de uma UC para a componente
								teórica).
							</p>
							<div class="mb-3">
								<label for="exampleFormControlInput2" class="form-label">Ano letivo</label>
								<select
									class="form-select form-select-sm"
									aria-label=".form-select-sm example"
									v-model="anoletivoinscreverturnos">
									<option value="null">Selecione o ano letivo</option>
									<option
										v-for="anoletivo in this.counterStore.anosletivos"
										:key="anoletivo.id"
										v-bind:value="anoletivo.id">
										{{
											anoletivo.anoletivo +
											(anoletivo.ativo == 1 ? " => Ativo (" + anoletivo.semestreativo + "º Semestre)" : "")
										}}
									</option>
								</select>
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInput2" class="form-label">Semestre</label>
								<select
									class="form-select form-select-sm"
									aria-label=".form-select-sm example"
									v-model="semestreinscreverturnos">
									<option value="null">Selecione o semestre</option>
									<option value="1">1</option>
									<option value="2">2</option>
								</select>
							</div>
							<button
								:disabled="blocked"
								class="btn btn-primary"
								@click="updateInscricoes(anoletivoinscreverturnos, semestreinscreverturnos)">
								<span
									v-if="loading[4]"
									class="spinner-border spinner-border-sm"
									role="status"
									aria-hidden="true"></span>
								Inscrever estudantes nos turnos
							</button>
						</div>
					</div>
				</div>
				<!-- <br> -->
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingSix">
						<button
							class="accordion-button"
							:class="{ collapsed: this.collapsed[5] }"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseSix"
							:aria-expanded="this.collapsed[5]"
							aria-controls="collapseSix"
							@click="changeCollapsed(5)">
							4º Atualizar horários dos turnos
						</button>
					</h2>
					<div
						id="collapseSix"
						class="accordion-collapse"
						:class="{ collapse: this.collapsed[5] }"
						aria-labelledby="headingSix"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<p class="card-text">
								Selecione o <b>ano letivo</b>, <b>datas de início e de fim de semestre</b> e o <b>curso</b> para o qual
								pretende atualizar os horários
							</p>
							<div class="mb-3">
								<label for="exampleFormControlInput6" class="form-label">Ano letivo</label>
								<select
									class="form-select form-select-sm"
									aria-label=".form-select-sm example"
									v-model="anoletivoativo">
									<option value="null">Selecione o ano letivo</option>
									<option
										v-for="anoletivo in this.counterStore.anosletivos"
										:key="anoletivo.id"
										v-bind:value="anoletivo.id">
										{{
											anoletivo.anoletivo +
											(anoletivo.ativo == 1 ? " => Ativo (" + anoletivo.semestreativo + "º Semestre)" : "")
										}}
									</option>
								</select>
							</div>
							<div class="mb-3">
								<label for="inputEmail3" class="form-label">Data de início de semestre:</label>
								<div>
									<input
										type="date"
										aria-label="Data de inicio de semestre"
										class="form-control"
										v-model="dataInicioSemestre" />
									<!-- <div v-if="hasErrorDataAbertura" class="errorMessages">
                  <small style="color: #a94442; margin-left: 5px;">{{ errorIniciarPC.dataAbertura[0] }}</small>
                </div> -->
								</div>
							</div>
							<div class="mb-3">
								<label for="inputEmail3" class="form-label">Data de fim de semestre:</label>
								<div>
									<input
										type="date"
										aria-label="Data de fim de semestre"
										class="form-control"
										v-model="dataFimSemestre" />
									<!-- <div v-if="hasErrorDataAbertura" class="errorMessages">
                  <small style="color: #a94442; margin-left: 5px;">{{ errorIniciarPC.dataAbertura[0] }}</small>
                </div> -->
								</div>
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInput7" class="form-label">Curso</label>
								<!-- <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="selectedCourse"
                >
                  <option value="" disabled selected>
                    [Código Curso] Nome do curso (Última atualização do horário)
                  </option>
                  <option value="0">Todos</option> 
                  <option
                    v-for="course in this.counterStore.courses"
                    :key="course.id"
                    v-bind:value="course.id"
                  >
                    {{
                      "[" +
                      course.codigo +
                      "] " +
                      course.nome +
                      " " +
                      course.ultimoupdateaula
                    }}
                  </option>
                </select> -->
								<v-select
									aria-label=".form-select-sm example"
									code="code"
									:options="this.counterStore.coursesToVSelectComTodos"
									single-line
									v-model="counterStore.selectedCourse"
									@option:selected="selectCurso()">
								</v-select>
							</div>
							<button
								:disabled="blocked"
								class="btn btn-primary"
								@click="updateHorariosTurnos(anoletivoativo, dataInicioSemestre, dataFimSemestre, selectedCourse)">
								<span
									v-if="loading[5]"
									class="spinner-border spinner-border-sm"
									role="status"
									aria-hidden="true"></span>
								Atualizar horários dos turnos
							</button>
							<br><br>
							<div class="alert alert-info" role="alert">
								Como alternativa, poderá usar um CSV para enviar os seus dados.
							</div>
							<div>
								<input
									class="form-control my-1"
									type="file"
									ref="file4"
									aria-label="Upload CSV File"
									accept=".csv"
									@change="handleFileUpload()" />
								<button class="btn btn-primary" @click="stepFourCSV()" :disabled="blocked">
									<i class="bi bi-filetype-csv"></i> Atualizar horários dos turnos com CSV
								</button>
							</div>
						</div>
					</div>
				</div>
				<!-- <br> -->
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingSeven">
						<button
							class="accordion-button"
							:class="{ collapsed: this.collapsed[6] }"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseSeven"
							:aria-expanded="this.collapsed[6]"
							aria-controls="collapseSeven"
							@click="changeCollapsed(6)">
							5º Alterar ano letivo/semestre a gerir
						</button>
					</h2>
					<div
						id="collapseSeven"
						class="accordion-collapse"
						:class="{ collapse: this.collapsed[6] }"
						aria-labelledby="headingSeven"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<p class="card-text">Selecione o <b>ano letivo</b> e o <b>semestre</b> de forma a os gerir.</p>
							<div class="mb-3">
								<label for="exampleFormControlInput8" class="form-label">Ano letivo</label>
								<select
									class="form-select form-select-sm"
									aria-label=".form-select-sm example"
									v-model="anoletivoativo">
									<option value="null">Selecione o ano letivo</option>
									<option
										v-for="anoletivo in this.counterStore.anosletivos"
										:key="anoletivo.id"
										v-bind:value="anoletivo.id">
										{{
											anoletivo.anoletivo +
											(anoletivo.ativo == 1 ? " => Ativo (" + anoletivo.semestreativo + "º Semestre)" : "")
										}}
									</option>
								</select>
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInput9" class="form-label">Semestre</label>
								<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="semestreativo">
									<option value="null">Selecione o semestre</option>
									<option value="1">1</option>
									<option value="2">2</option>
								</select>
							</div>
							<button
								:disabled="blocked"
								class="btn btn-primary"
								@click="updateAnoletivoAtivo(anoletivoativo, semestreativo)">
								<span
									v-if="loading[3]"
									class="spinner-border spinner-border-sm"
									role="status"
									aria-hidden="true"></span>
								Alterar ano letivo/semestre a gerir
							</button>
						</div>
					</div>
				</div>
				<!-- <br> -->
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingOne">
						<button
							class="accordion-button"
							:class="{ collapsed: this.collapsed[0] }"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseOne"
							:aria-expanded="this.collapsed[0]"
							aria-controls="collapseOne"
							@click="changeCollapsed(0)">
							Atualizar endpoints de busca às API's
						</button>
					</h2>
					<div
						id="collapseOne"
						class="accordion-collapse"
						:class="{ collapse: this.collapsed[0] }"
						aria-labelledby="headingOne"
						data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<p class="card-text">
								Os endpoints têm de terminar com "?" de forma a a que o url suporte o ano letivo, o semestre e as
								restantes keys para buscar os dados
							</p>
							<div class="mb-3">
								<label for="exampleFormControlInpu0" class="form-label">Url cursos/turnos</label>
								<input
									type="text"
									class="form-control"
									id="exampleFormControlInpu0"
									placeholder="Url cursos (ex: http://www.dei.estg.ipleiria.pt/intranet/horarios/ws/inscricoes/turnos.php? )"
									v-model="urlcursos" />
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInpu1" class="form-label">Url inscrições</label>
								<input
									type="text"
									class="form-control"
									id="exampleFormControlInpu1"
									placeholder="Url inscrições (ex: http://www.dei.estg.ipleiria.pt/intranet/horarios/ws/inscricoes/inscricoes_cursos.php? )"
									v-model="urlinscricoes" />
							</div>
							<div class="mb-3">
								<label for="exampleFormControlInpu3" class="form-label">Url aulas</label>
								<input
									type="text"
									class="form-control"
									id="exampleFormControlInput2"
									placeholder="Url inscrições (ex: http://www.dei.estg.ipleiria.pt/intranet/horarios/ws/inscricoes/listagem_aulas_json.php? )"
									v-model="urlaulas" />
							</div>
							<button :disabled="blocked" class="btn btn-primary" @click="updateUrls()">
								<span aria-hidden="true"></span> Atualizar endpoints de busca às API's
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<br /><br /><br />
</template>

<script>
import papaparse from "papaparse";
import { useCounterStore } from "../../stores/counter";
export default {
	name: "AtualizarDados",
	component: {},
	methods: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			loading: [false, false, false, false, false, false],
			blocked: false,
			anoletivocurso: null,
			semestrecurso: null,
			anoletivoinscricoes: null,
			semestreinscricoes: null,
			anoletivoaprovacoes: null,
			semestreaprovacoes: null,
			anoletivoativo: null,
			semestreativo: null,
			anoletivoinscreverturnos: null,
			semestreinscreverturnos: null,
			anosletivos: [],
			urlcursos: "",
			urlinscricoes: "",
			urlaulas: "",
			selectedCourse: 0,
			dataInicioSemestre: null,
			dataFimSemestre: null,
			collapsed: [true, true, true, true, true, true, true],
			selectedCourse: null,
			fileStepOne: null,
			fileStepTwo: null,
			fileStepFour: null,
		};
	},
	methods: {
		handleFileUpload() {
			this.fileStepOne = this.$refs.file.files[0];
			this.fileStepTwo = this.$refs.file2.files[0];
			this.fileStepFour = this.$refs.file4.files[0];
			// console.log(this.fileStepTwo);
		},
		stepOneCSV() {
			try {
				this.blocked = true;
				//use papaparse

				if (!this.fileStepOne) {
					this.$toast.error("Tem de selecionar um ficheiro.");
					return;
				}

				papaparse.parse(this.fileStepOne, {
					header: true,
					complete: (results) => {
						//console.log(results);
						this.$axios
							.post("webservice/stepOneCSV", results.data)
							.then((response) => {
								//console.log(response);
								this.$toast.success("Dados atualizados");
							})
							.catch((error) => {
								console.log(error);
							});
					},
				});
			} catch (error) {
				console.log(error);
			} finally {
				//console.log("finally");
				this.blocked = false;
			}
		},
		stepTwoCSV() {
			try {
				this.blocked = true;
				//use papaparse

				if (!this.fileStepTwo) {
					this.$toast.error("Tem de selecionar um ficheiro.");
					return;
				}

				papaparse.parse(this.fileStepTwo, {
					header: true,
					complete: (results) => {
						//console.log(results);
						this.$axios
							.post("webservice/stepTwoCSV", results.data)
							.then((response) => {
								//console.log(response);
								this.$toast.success("Dados atualizados");
							})
							.catch((error) => {
								console.log(error);
							});
					},
				});
			} catch (error) {
				console.log(error);
			} finally {
				//console.log("finally");
	
				this.blocked = false;
			}
		},
		stepFourCSV() {
			try {
				this.blocked = true;
				//use papaparse

				if (!this.fileStepFour) {
					this.$toast.error("Tem de selecionar um ficheiro.");
					return;
				}

				papaparse.parse(this.fileStepFour, {
					header: true,
					complete: (results) => {
						//console.log(results);
						this.$axios
							.post("webservice/stepFourCSV", results.data)
							.then((response) => {
								//console.log(response);
								this.$toast.success("Dados atualizados");
							})
							.catch((error) => {
								console.log(error);
							});
					},
				});
			} catch (error) {
				console.log(error);
			} finally {
				//console.log("finally");
	
				this.blocked = false;
			}
		},
		updateAnoletivoAtivo(anoletivo, semestre) {
			if (!anoletivo) {
				this.$toast.error("Tem de selecionar o ano letivo.");
				return;
			}
			this.loading[3] = true;
			this.blocked = true;
			this.$axios
				.put("anoletivo/" + anoletivo, {
					semestre: semestre,
				})
				.then((response) => {
					this.counterStore.getAnosLetivos();
					this.$toast.success("Dados atualizados");
					this.counterStore.selectedAnoletivo = anoletivo;
					this.counterStore.semestre = semestre;
					this.anoletivoativo = null;
					this.semestreativo = 1;
				})
				.catch((error) => {
					this.$toast.error(error);
				})
				.finally(() => {
					this.loading[3] = false;
					this.blocked = false;
				});
		},
		//updateInscricaoInformation(anoletivo, numero, url="webservice/inscricao"){
		updateInscricaoInformation(anoletivo, numero, url = "webservice/inscricaotodas") {
			if (!anoletivo) {
				this.$toast.error("Tem de selecionar o ano letivo.");
				return;
			}
			if (this.selectedCourse == null) {
				this.$toast.error("Tem de selecionar um curso ou todos.");
				return;
			}
			if (numero == 2) {
				this.loading[1] = true;
			} else {
				this.loading[2] = true;
			}
			this.blocked = true;
			this.$axios
				.post(url, {
					anoletivo: anoletivo,
					semestre: 1,
					idcurso: this.selectedCourse,
				})
				.then((response) => {
					this.$toast.success("Dados atualizados");
				})
				.catch((error) => {
					if (error.response.data.anoletivo) {
						this.$toast.error(error.response.data.anoletivo);
					} else {
						this.$toast.error(error.response.data);
					}
				})
				.finally(() => {
					this.loading[1] = false;
					this.loading[2] = false;
					this.blocked = false;
				});
		},
		updateCourseInformation(anoletivo, semestre) {
			if (!anoletivo) {
				this.$toast.error("Tem de selecionar o ano letivo.");
				return;
			}
			if (!semestre) {
				this.$toast.error("Tem de selecionar o semestre.");
				return;
			}
			this.loading[0] = true;
			this.blocked = true;
			this.$axios
				.post("webservice/curso", {
					anoletivo: anoletivo,
					semestre: semestre,
				})
				.then((response) => {
					this.$toast.success("Dados atualizados");
					this.anoletivocurso = null;
					this.semestrecurso = 1;
					this.counterStore.getCourses();
				})
				.catch((error) => {
					this.$toast.error(error.response.data);
				})
				.finally(() => {
					this.loading[0] = false;
					this.blocked = false;
				});
		},
		updateUrls() {
			this.$axios
				.put("webservice/url", {
					urlturnos: this.urlcursos,
					urlinscricoes: this.urlinscricoes,
					urlaulas: this.urlaulas,
				})
				.then((response) => {
					this.$toast.success("Dados atualizados");
				})
				.catch((error) => {
					this.$toast.error(error);
				});
		},
		getUrls() {
			this.$axios
				.get("webservice/url")
				.then((response) => {
					this.urlcursos = response.data.urlturnos;
					this.urlinscricoes = response.data.urlinscricoes;
					this.urlaulas = response.data.urlaulas;
				})
				.catch((error) => {});
		},
		updateInscricoes(anoletivo, semestre) {
			if (!anoletivo) {
				this.$toast.error("Tem de selecionar o ano letivo.");
				return;
			}
			if (!semestre) {
				this.$toast.error("Tem de selecionar o semestre.");
				return;
			}
			this.loading[4] = true;
			this.blocked = true;
			this.$axios
				.post("webservice/inscriverturnos", {
					anoletivo: anoletivo,
					semestre: semestre,
				})
				.then((response) => {
					this.$toast.success("Dados atualizados");
				})
				.catch((error) => {
					this.$toast.error(error.response.data);
				})
				.finally(() => {
					this.loading[4] = false;
					this.blocked = false;
				});
		},
		selectCurso() {
			if (this.counterStore.selectedCourse != null && this.counterStore.selectedCourse.code != 0) {
				this.counterStore.getCourseWithUCs(this.counterStore.selectedCourse.code);
				return;
			}
		},
		updateHorariosTurnos(anoletivoativo, dataInicioSemestre, dataFimSemestre, selectedCourse) {
			if (dataInicioSemestre == null) {
				this.$toast.error("Tem de inserir uma data do inicio do semestre.");
				return;
			}
			if (dataFimSemestre == null) {
				this.$toast.error("Tem de inserir uma data do fim do semestre.");
				return;
			}
			if (anoletivoativo == null) {
				this.$toast.error("Tem de selecionar o ano letivo.");
				return;
			}
			if (selectedCourse == null || selectedCourse == 0) {
				this.$toast.error("Tem de selecionar o curso.");
				return;
			}
			this.loading[5] = true;
			this.blocked = true;
			this.$axios
				.post("webservice/aulas", {
					dataInicio: dataInicioSemestre,
					dataFim: dataFimSemestre,
					idAnoletivo: anoletivoativo,
					idcurso: selectedCourse,
				})
				.then((response) => {
					//console.log(response);
					this.$toast.success("Dados dos horários atualizados");
				})
				.catch((error) => {
					this.$toast.error(error.response.data);
				})
				.finally(() => {
					this.loading[5] = false;
					this.blocked = false;
				});
		},
		changeCollapsed(number) {
			this.collapsed[number] = this.collapsed[number] == true ? false : true;
		},
		//confirm before leaving page
		confirmLeaving(event) {
			if (this.blocked) {
				if (!window.confirm("Os dados estão a ser carregados, tem a certeza que quer sair?")) {
					event.preventDefault();
					event.returnValue = "";
				}
			}
		},
		preventNav(event) {
			if (!this.blocked) return;
			event.preventDefault();
			event.returnValue = "";
		},
	},
	mounted() {
		this.counterStore.getAnosLetivos();
		this.counterStore.getCourses();
		this.getUrls();
	},
	beforeMount() {
		window.addEventListener("beforeunload", this.preventNav);
	},
	beforeRouteLeave(to, from, next) {
		if (this.blocked) {
			if (!window.confirm("Os dados estão a ser carregados, tem a certeza que quer sair?")) {
				window.removeEventListener("beforeunload", this.preventNav);
				return;
			}
		}
		next();
	},
	onClose(event) {
		this.preventNav(event);
	},
};
</script>

<style scoped></style>
