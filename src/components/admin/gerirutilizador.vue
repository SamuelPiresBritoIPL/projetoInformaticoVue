<template>
	<div class="container-fluid">
		<h3 class="mt-3 mb-4">Gestão Utilizador</h3>
		<div class="card text-center">
			<div class="card-body">
				<form>
					<div class="card-header bg-transparent text-center">
						<h5>Mudar password</h5>
					</div>
					<div class="card-body">
						<div class="pt-2 pe-4">
							<div class="mb-3">
								<label
									for="formGroupExampleInput"
									class="form-label"
									><b>Password atual</b></label
								>
								<input
									type="password"
									class="form-control"
									id="formGroupExampleInput"
									placeholder="Password atual"
									v-model="password" />
								<div
									v-if="errors.password != null"
									class="mb-3 mt-1">
									<small class="badge text-bg-danger ms-1 text-wrap">{{
										errors.password
									}}</small>
								</div>
							</div>
							<div class="mb-3">
								<label
									for="formGroupExampleInput2"
									class="form-label"
									><b>Nova Password</b></label
								>
								<input
									type="password"
									class="form-control"
									id="formGroupExampleInput2"
									placeholder="Nova Password"
									v-model="newpassword" />
								<div
									v-if="errors.newpassword != null"
									class="errorMessages mb-3 mt-1">
									<small class="badge text-bg-danger ms-1 text-wrap">{{
										errors.newpassword
									}}</small>
								</div>
							</div>
							<div class="d-grid gap-2">
								<button
									type="button"
									class="btn btn-primary mb-1"
									@click="changePassword()">
									<i class="align-baseline bi bi-pencil-square"></i> Alterar
									Password
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { useCounterStore } from "../../stores/counter";
export default {
	name: "Gerirutilizador",
	component: {},
	setup() {
		const counterStore = useCounterStore();
		return { counterStore };
	},
	data() {
		return {
			password: null,
			newpassword: null,
			errors: { password: null, newpassword: null },
		};
	},
	computed: {},
	methods: {
		changePassword() {
			if (this.password == null || this.password == "") {
				this.errors.password = "A password não pode estar vazia";
				return;
			} else {
				this.errors.password = null;
			}
			if (
				this.newpassword == null ||
				this.newpassword == "" ||
				this.newpassword.length < 3
			) {
				this.errors.newpassword =
					"A nova password tem de ter no minimo 3 caracteres";
				return;
			} else {
				this.errors.newpassword = null;
			}
			this.$axios
				.put("admin/changepassword", {
					password: this.password,
					newpassword: this.newpassword,
				})
				.then((response) => {
					this.password = null;
					this.newpassword = null;
					this.$toast.success("Password atualizada");
				})
				.catch((error) => {
					console.log(error.response);
					this.$toast.error(error.response.data.message);
				});
		},
	},
	mounted() {},
};
</script>

<style scoped>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.errorMessages{
  background-color: #f2dede; 
  border-radius: 3px;
  text-align: center
} */
</style>
