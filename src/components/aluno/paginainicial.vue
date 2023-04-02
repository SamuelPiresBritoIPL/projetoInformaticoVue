<template>
	<div class="container-fluid">
		<div class="text-center">
			<h3 class="mt-5 mb-2">
				AGIT - Aplicação de Gestão de Inscrições nos Turnos
			</h3>
			<h5 v-if="counterStore.utilizadorLogado.length != 0">
				{{
					"[" +
					counterStore.utilizadorLogado.codigoCurso +
					"] " +
					counterStore.utilizadorLogado.curso
				}}
			</h5>
			<p class="card-title text-center">
				Ano Letivo: <b>{{ counterStore.ano }}</b> | Semestre:
				<b>{{ counterStore.semestre }}</b>
			</p>
		</div>
		<div class="row text-center">
			<div class="col-12 col-lg-2"></div>
			<div class="col-12 col-lg-8">
				<div class="card mb-1">
					<div class="card-body">
						<h6 class="card-title">Inscrições de UC's</h6>
						<hr class="mb-0" />
						<div
							v-if="!hasPedidos"
							class="alert alert-danger ms-4 me-4 mt-2"
							role="alert">
							<span class="text-center"
								>Não existe nenhum período de pedidos de alteração de UC's
								definido.</span
							>
						</div>
						<div
							v-if="!isPedidosOpen && Object.keys(infoPedidos).length > 0"
							class="alert alert-info ms-4 me-4 mt-2"
							role="alert">
							O período de Pedidos de Alteração de UC's <b>terá inicio</b> a
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
							v-if="isPedidosOpen && Object.keys(infoPedidos).length > 0"
							class="alert alert-success ms-4 me-4 mt-2"
							role="alert">
							O período de Pedidos de Alteração de UC's <b>estará aberto</b> até
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
						<div
							v-if="showInfoPUC"
							class="mt-1">
							<small class="card-text"
								>Nesta página é possível efetuar pedidos de adição de Unidades
								Curriculares à aplicação, no caso de ainda não o estarem.<br />
								Com o objetivo de possibilitar o estudante de se inscrever-se
								nos turnos sem perder a oportunidade. <br />Durante o período
								definido pela coordenação de curso o estudante pode então
								requerir a adição da(s) UC('s) que pretender, justificando
								devidamente.<br />
								A coordenação posteriormente irá decidir justamente se aprova ou
								rejeita o pedido.<br />
							</small>
						</div>
						<div>
							<button
								@click="showInfoPUC = !showInfoPUC"
								type="button"
								class="btn btn-link mt-1 mb-2">
								{{ !showInfoPUC ? "Saber mais..." : "Saber menos." }}
							</button>
						</div>
						<div class="d-grid gap-5 mx-5">
							<button
								type="button"
								class="btn btn-primary mt-2"
								@click="buttonUnidadesCurriculares()"><i class="align-baseline bi bi-ui-checks"></i>
								Inscrição UC's
							</button>
						</div>
					</div>
				</div>
				<br />
				<div class="card">
					<div class="card-body">
						<h6 class="card-title">Inscrição Turnos</h6>
						<hr class="mb-0" />
						<div
							v-if="!hasInscricoes"
							class="alert alert-danger ms-4 me-4 mt-2"
							role="alert">
							<span class="text-center"
								>Não existe nenhum período de inscrições definido.</span
							>
						</div>
						<div
							v-if="infoInscricoes.length > 0 && isInscricoesOpen"
							class="alert alert-success ms-4 me-4 mt-2"
							role="alert">
							<div
								v-for="inscricao in infoInscricoes"
								:key="inscricao" class="text-center">
								<div v-if="inscricao.isAberto == true">
									<b>{{
										counterStore.utilizadorLogado.codigoCurso !=
										inscricao.codigo
											? "[" + inscricao.codigo + "] " + inscricao.nome + " - "
											: ""
									}}</b
									>O período de Inscrição nos Turnos <b>estará aberto</b> para
									<b>{{
										inscricao.ano == 0
											? "todos os anos "
											: "o ano " + inscricao.ano
									}}</b>
									até a
									<b
										>{{
											inscricao.dataEncerar
												.replace(":00.000000Z", "")
												.replace("T", " ")
										}}h</b
									>
									({{
										inscricao.menosdeumdiatermino
											? "falta " + inscricao.diasAteTerminar
											: inscricao.diasAteTerminar == 1
											? "falta " + inscricao.diasAteTerminar + " dia."
											: "faltam " + inscricao.diasAteTerminar + " dias."
									}})
								</div>
							</div>
						</div>
						<div v-if="infoInscricoes.length > 0">
							<div
								v-for="inscricao in infoInscricoes"
								:key="inscricao" class="text-center">
								<div
									v-if="inscricao.isAberto == false"
									class="alert alert-info ms-4 me-4 mt-2"
									role="alert">
									O período de Inscrição nos Turnos para as UC´s
									<b>{{
										inscricao.ano == 0
											? "de todos os anos"
											: "do ano " + inscricao.ano
									}}</b>
									terá <b>inicio</b> a
									<b
										>{{
											inscricao.dataAbertura
												.replace(":00.000000Z", "")
												.replace("T", " ")
										}}h</b
									>
									({{
										inscricao.menosdeumdia
											? "falta " + inscricao.diasAteAbertura
											: inscricao.diasAteAbertura == 1
											? "falta " + inscricao.diasAteAbertura + " dia."
											: "faltam " + inscricao.diasAteAbertura + " dias."
									}})
								</div>
							</div>
						</div>
						<div
							v-if="showInfoPIT" class="mt-2">
							<small class="card-text"
								>Nesta página é possível efetuar a inscrição nos turnos das
								Unidades Curriculares nas quais o estudante se encontra inscrito
								na aplicação, e no qual a coordenação do curso assim o definiu.
								<br />Durante o período definido para tal o estudante tem a
								liberdade de escolher os seus turnos consoante a disponibilidade
								das vagas e horário de cada turno.<br />
							</small>
						</div>
						<div>
							<button
								@click="showInfoPIT = !showInfoPIT"
								type="button"
								class="btn btn-link mt-1">
								{{ !showInfoPIT ? "Saber mais..." : "Saber menos." }}
							</button>
						</div>
            <div class="d-grid gap-2 mx-5">
						<button
							type="button"
							class="btn btn-primary mt-2"
							@click="buttonInscricaoTurnos()"><i class="align-baseline bi bi-calendar-week-fill"></i>
							Inscrição Turnos
						</button>
          </div>
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
	name: "PaginaInicial",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			showInfoPUC: false,
			showInfoPIT: false,
			infoPedidos: [],
			infoInscricoes: [],
			isPedidosOpen: false,
			isInscricoesOpen: false,
			hasInscricoes: true,
			hasPedidos: true,
		};
	},
	methods: {
		getInfoPedidos() {
			this.$axios
				.get("cadeirasaluno/infoperiodos")
				.then((response) => {
					//console.log(response.data);
					this.infoPedidos = response.data.infoPedidos;
					this.infoInscricoes = response.data.infoInscricoes;
					this.isPedidosOpen = response.data.isPedidosOpen;
					this.isInscricoesOpen = response.data.isInscricoesOpen;
				})
				.catch((error) => {
					console.log(error.response);
				})
				.finally(() => {
					if (this.infoInscricoes.length == 0) {
						this.hasInscricoes = false;
					}
					if (Object.keys(this.infoPedidos).length == 0) {
						this.hasPedidos = false;
					}
				});
		},
		buttonUnidadesCurriculares() {
			this.$router.push("/confirmacaoucs");
		},
		buttonInscricaoTurnos() {
			this.$router.push("/inscricaoturnos");
		},
	},
	mounted() {
		this.getInfoPedidos();
	},
};
</script>

<style></style>
