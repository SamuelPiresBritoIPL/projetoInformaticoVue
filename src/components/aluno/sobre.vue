<template>
	<div class="container-fluid row justify-content-center">
		<h3 class="text-center mt-5 mb-5">
			Projeto Aplicação Web para Inscrição nos Turnos
		</h3>
		<hr class="mb-4" />
		<div class="card col-12 my-2 col-lg-8 col-xl-3 mx-xl-2 p-0">
			<div class="card-header">
				<h5 class="text-center">Autores</h5>
			</div>
			<div class="card-body text-center">
				<p class="mt-1">2191727 - Francisco Melícias</p>
				<span>2191740 - Daniel Sarreira</span>
			</div>
		</div>
		<div class="card col-12 my-2 col-lg-8 col-xl-3 mx-xl-2 p-0">
			<div class="card-header">
				<h5 class="text-center">Manutenção e Suporte Inicial</h5>
			</div>
			<div class="card-body text-center">
				<p class="mt-1">2201709 - Carolina Pazeiro Antunes</p>
				<span>2200653 - Samuel Pires Brito</span>
			</div>
		</div>
		<div class="card col-12 my-2 col-lg-8 col-xl-3 mx-xl-2 p-0">
			<div class="card-header">
				<h5 class="text-center">Manutenção e Suporte Atual</h5>
			</div>
			<div class="card-body text-center">
				<address class="mt-1">
					<strong>Suporte DEI</strong><br />
					<a href="mailto:suporte.dei.estg@ipleiria.pt">suporte.dei.estg@ipleiria.pt</a>
				</address>
			</div>
		</div>
	</div>
	<div class="col-12">
		<p class="text-center mt-5">
			Trabalho desenvolvido no âmbito da UC de Projeto Informático, do curso de
			Engenharia Informática.
		</p>
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
