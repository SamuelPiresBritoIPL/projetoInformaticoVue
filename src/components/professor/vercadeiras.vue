<template>
	<div class="container-fluid">
		<h3 class="mt-3 mb-4">Unidades Curriculares</h3>
		<div v-if="hasValue">
			<div
				v-if="this.turnos.length != 0"
				class="card text-center">
				<div
					v-for="cadeiras in this.turnos"
					:key="cadeiras">
					<div class="card-header">
						{{ "[" + cadeiras.codigoCurso + "] " + cadeiras.curso }}
					</div>
					<div class="card-body">
						<table
							class="table table-hover text-start">
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
									v-for="(turno, index) in cadeiras.cadeiras"
									:key="turno"
									@click="selectCadeiraToManage(index)">
									<td>{{ "[" + turno[0].codigo + "] " + turno[0].nome }}</td>
									<td>
										<p
											v-for="t in turno"
											:key="t">
											{{
												t.vagas +
												"/" +
												(t.vagastotal == null ? "-" : t.vagastotal)
											}}
										</p>
									</td>
									<td>
										<p
											v-for="t in turno"
											:key="t">
											<a
												:key="t"
												role="button"
												class="link-primary link-underline-opacity-0 link-underline-opacity-100-hover"
												@click.stop="selectTurnoToManage(index, t)"
												>{{ t.numero != 0 ? t.tipo + t.numero : t.tipo }}</a
											>
										</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useCounterStore } from "../../stores/counter";
export default {
	name: "VerCadeiras",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			turnos: [],
		};
	},
	computed: {
		hasValue() {
			if (
				this.counterStore.selectedAnoletivo != null &&
				this.counterStore.semestre != null
			) {
				this.getTurnos();
				return true;
			}
			return false;
		},
	},
	methods: {
		getTurnos() {
			this.$axios
				.get(
					"cadeirasprofessor/" +
						this.counterStore.selectedAnoletivo +
						"/" +
						this.counterStore.semestre
				)
				.then((response) => {
					this.turnos = response.data;
					console.log(this.turnos);
				})
				.catch((error) => {
					console.log(error.response);
				});
		},
		selectCadeiraToManage(idCadeira) {
			this.counterStore.turnoToManage = null;
			this.$router.push("/professor/gerircadeira/" + idCadeira);
		},
		selectTurnoToManage(idCadeira, turno) {
			this.counterStore.turnoToManage = turno.id;
			this.$router.push("/professor/gerircadeira/" + idCadeira);
		},
	},
	mounted() {},
};
</script>

<style>
/* @media (min-width: 1024px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
} */
</style>
