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
                <ul v-for="cadeiraToConfirm in cadeirasToConfirm" :key="cadeiraToConfirm.cadeira">
                  <h5>{{ cadeiraToConfirm[0].nomeCurso }}</h5>
                  <li  style="margin-bottom: 15px;" v-for="cadeira in cadeiraToConfirm" :key="cadeira.id">{{ cadeira.nomeCadeira }}</li>
                </ul>
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
                        {{ cadeira.nome }}
                      </label>
                    </p>
                  </div>
                </div>
                <hr>
                <button type="button" class="btn btn-outline-primary" @click="openAddCadeiraDeOutroCurso()">Adicionar UC de outro curso</button>
                <div v-if="showBtnAdicionarUCOutroCurso == true">
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" style="margin-top: 10px; margin-bottom: 5px;" v-model="selectedCourse" v-on:change="this.counterStore.getCourseWithUCs(selectedCourse)">
                    <option value="null">Selecione um curso.</option>
                    <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
                    {{ "["+course.codigo+"] "+course.nome }}
                    </option>
                  </select>
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCadeira" v-on:change="addUCToInscrever()">
                    <option value="null">Selecione a UC que pretende.</option>
                    <option  v-for="cadeira in this.counterStore.courseWithUCs.cadeiras" :key="cadeira" v-bind:value="cadeira">
                    {{ cadeira.nome }}
                    </option>
                  </select>
                </div>
                <hr>
                <div v-if="cadeirasOutrosCursos.length > 0">
                  <p>UC's de outros cursos</p>
                  <div v-for="cadeira in cadeirasOutrosCursos" :key="cadeira">
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
                  <label for="floatingTextarea2">Justifique:</label>
                </div>
                <div v-if="hasError" class="errorMessages" style="margin-bottom: 15px">
                  <small style="color: #a94442; margin-left: 5px;">{{ errorMessages }}</small>
                </div>
                <div v-if="hasErrorDescricao" class="errorMessages" style="margin-bottom: 15px">
                  <small style="color: #a94442; margin-left: 5px;">{{ errorMessages.descricao[0] }}</small>
                </div>
                <div style="text-align: center;">
                  <button type="button" class="btn btn-primary" style="margin-right: 5px;" @click="inscricaoCadeiras(1)">Submeter</button>
                  <button type="button" class="btn btn-danger" @click="adicionarCadeirasForm = false; this.errorMessages = null">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div> 
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "ConfirmacaoUCs",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
        cadeirasToConfirm: [],
        adicionarCadeirasForm: false,
        cadeirasNaoAprovadas: [],
        cadeirasToRequest: [],
        requestDescription: null,
        selectedCourse: null,
        selectedCadeira: null,
        cadeirasOutrosCursos: [],
        showBtnAdicionarUCOutroCurso: false,
        errorMessages: null
    };
  },
  computed: {
    hasError(){
      if (this.errorMessages != null) {
        if (this.errorMessages.descricao) {
          return false
        }
        return true
      }
      return false
    },
    hasErrorDescricao(){
      if (this.errorMessages != null) {
        if (this.errorMessages.descricao) {
          return true
        }
      }
      return false
    },
  },
  methods: {
    getCadeirasToConfirm(){
      this.$axios.get("cadeirasaluno/utilizador")
        .then((response) => {
          this.cadeirasToConfirm = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    inscricaoCadeiras(state){
      this.errorMessages = null
      this.$axios.post("cadeirasaluno/pedidos", {
            "estado": state,
            ...(state == 0 ? { "descricao": "cadeiras confirmadas" } : {"descricao": this.requestDescription}),
            "idUtilizador": this.counterStore.utilizadorLogado.id,
            "idAnoletivo": this.counterStore.selectedAnoletivo,
            "semestre": this.counterStore.semestre,
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
            this.errorMessages = error.response.data
          }
        });
    },
    adicionarCadeiras(){
      this.adicionarCadeirasForm = true
      this.getCadeirasNaoAprovadas()
    },
    getCadeirasNaoAprovadas(){
      this.$axios.get("cadeirasaluno/naoaprovadas/" + this.counterStore.utilizadorLogado.id)
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
    },
    openAddCadeiraDeOutroCurso(){
      this.showBtnAdicionarUCOutroCurso = !this.showBtnAdicionarUCOutroCurso
      if(this.showBtnAdicionarUCOutroCurso == true){
        this.counterStore.getCourses()
      }
    },
    addUCToInscrever(){
      if (this.selectedCadeira != "null") {
        this.cadeirasOutrosCursos.push(this.selectedCadeira)
      }
      console.log(this.selectedCadeira)
    }
  },
  mounted() {
    this.getCadeirasToConfirm()
  }
}
</script>

<style>

</style>