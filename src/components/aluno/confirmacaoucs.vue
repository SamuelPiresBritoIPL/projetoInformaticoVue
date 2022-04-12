<template>
    <div class="container-fluid">
        <h2 style="text-align: center; margin-bottom: 35px">Confirmação de UCs</h2>
        <div class="row">
          <div class="col-md-1" :class="{ 'col-md-3': adicionarCadeirasForm == false}">
          </div>
          <div class="col-md-5" :class="{ 'col-md-6': adicionarCadeirasForm == false}">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 25px;">Unidades Curriculares Atualmente Inscritas</h5>
                <hr>
                <p v-for="cadeira in cadeirasToConfirm" :key="cadeira.cadeira.id">{{ "["+cadeira.cadeira.codigo+"] "+cadeira.cadeira.nome }}</p>
                <div style="margin-top: 35px; text-align: center;">
                  <button type="button" class="btn btn-primary" style="margin-bottom: 5px; width: 50%" @click="inscricaoCadeiras(0)" :disabled="adicionarCadeirasForm">Confirmar Cadeiras</button><br>
                  <button type="button" class="btn btn-primary" style="margin-bottom: 5px; width: 50%" @click="adicionarCadeiras()" :disabled="adicionarCadeirasForm">Fazer Pedido de Alteração</button><br>     
                </div>  
              </div>
            </div>  
          </div>
          <div v-if="adicionarCadeirasForm == true" class="col-md-5">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 25px;">Pedido de inscrição de Unidades Curriculares</h5>
                <hr>
                <div style="overflow-y: auto; max-height: 300px;">
                  <div v-for="cadeira in cadeirasNaoAprovadas" :key="cadeira.id">
                    <p>
                      <input class="form-check-input" style="margin-right: 15px" type="checkbox" :value="cadeira.id" v-model="cadeirasToRequest">
                      <label class="form-check-label">
                        {{ "["+cadeira.codigo+"] "+cadeira.nome }}
                      </label>
                    </p>
                  </div>
                </div>
                <div class="form-floating" style="margin-top: 20px; margin-bottom: 20px;">
                  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px; resize: none;" v-model="requestDescription"></textarea>
                  <label for="floatingTextarea2">Descrição:</label>
                </div>
                <div style="text-align: center;">
                  <button type="button" class="btn btn-primary" style="margin-right: 5px;" @click="inscricaoCadeiras(1)">Submeter</button>
                  <button type="button" class="btn btn-danger" @click="adicionarCadeirasForm = false">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div> 
</template>

<script>
export default {
  name: "ConfirmacaoUCs",
  component: {},
  data() {
    return {
        cadeirasToConfirm: [],
        adicionarCadeirasForm: false,
        cadeirasNaoAprovadas: [],
        cadeirasToRequest: [],
        requestDescription: null
    };
  },
  methods: {
    getCadeirasToConfirm(){
      this.$axios.get("cadeiras/5185")
        .then((response) => {
          this.cadeirasToConfirm = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    inscricaoCadeiras(state){
      this.$axios.post("cadeiras/pedidos", {
            "estado": state,
            ...(state == 0 ? { "descricao": "cadeiras confirmadas" } : {"descricao": this.requestDescription}),
            "idUtilizador": 5185,
            "idAnoletivo": 1,
            "semestre": 2,
            ...(state == 0 ? { } : {"cadeirasIds": this.cadeirasToRequest})
          })
        .then((response) => {
          if(state == 0){
            this.$toast.success("Cadeiras confirmadas com sucesso!");
          } else if (state == 1){
            this.$toast.success("Pedido de alteração de UCs efetuado com sucesso!");
          }
        })
        .catch((error) => {
          if(state == 0){ 
            this.$toast.error("Não foi possível confirmar as UCs!");
          } else if (state == 1){
            this.$toast.error("Não foi possível efetuar o pedido de alteração de UCs!");
          }
        });
    },
    adicionarCadeiras(){
      this.adicionarCadeirasForm = true
      this.getCadeirasNaoAprovadas()
    },
    getCadeirasNaoAprovadas(){
      this.$axios.get("cadeiras/naoaprovadas/5185")
        .then((response) => {
          this.cadeirasNaoAprovadas = response.data;
          for (let index = 0; index < this.cadeirasNaoAprovadas.length; index++) {
            if(this.cadeirasNaoAprovadas[index].estado == 1){
              this.cadeirasToRequest.push(this.cadeirasNaoAprovadas[index].id)
            }
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },
  mounted() {
    this.getCadeirasToConfirm()
  }
}
</script>

<style>

</style>