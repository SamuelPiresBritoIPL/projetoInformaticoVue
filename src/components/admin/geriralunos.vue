<template>
  <div class="container-fluid">
    <h3 style="margin-top: 20px; margin-bottom: 25px;">Gestão de Alunos</h3>
    <div class="card">
      <div class="card-header">
        Gestão de Aluno
      </div>
      <div class="card-body">
        <h6 class="card-title">Insira o número de aluno que pretende ver</h6>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Número de aluno</label>
          <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="Número aluno" v-model="login">
        </div>
        <button class="btn btn-primary" @click="getAlunoInfo()">Procurar</button>
        <hr>
        <h5 class="card-title">Dados aluno</h5>
        <!-- CARD TAB -->
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link" role="button" :class="{ active: navTabs[0] == true }" @click="navTabs[0] = true;navTabs[1] = false;navTabs[2] = false">UC's Inscritas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" role="button" :class="{ active: navTabs[1] == true }" @click="navTabs[0] = false;navTabs[1] = true;navTabs[2] = false;">UC's Aprovadas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" role="button" :class="{ active: navTabs[2] == true }" @click="navTabs[0] = false;navTabs[1] = false;navTabs[2] = true">Pedidos</a>
              </li>
            </ul>
          </div>
          <div v-if="navTabs[0] == true" class="card-body">
            <div v-if="this.ucsInscritas.length == 0">
              <h6 class="card-title" style="margin-bottom:25px;">Unidades curriculares</h6>
              <p style="margin-bottom:25px;">O aluno não esta inscrito em nenhuma unidade curricular</p>
            </div>
            <div v-else>
              <div v-for="curso in this.ucsInscritas" :key="curso">
                <h6>{{curso.nome}}</h6>
                <table class="table" style="text-align: left;">
                  <thead>
                    <tr>
                      <th scope="col">Unidade Curricular</th>
                      <th scope="col">Número de inscrições</th>
                      <th scope="col">Turnos inscritos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="tableRow" v-for="cadeira in curso.cadeiras" :key="cadeira">
                      <td>{{ "["+cadeira.uc.codigo+"] "+cadeira.uc.nome }}</td>
                      <td>{{ cadeira.uc.nrinscricoes }}</td>
                      <td>
                        <p v-for="turno in cadeira.turnos" :key="turno">
                          {{turno.tipo + (turno.numero == 0 ? "" : turno.numero)}}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="navTabs[1] == true" class="card-body">
            <div v-if="this.ucsAprovadas.length == 0">
              <h6 class="card-title" style="margin-bottom:25px;">Unidades curriculares</h6>
              <p style="margin-bottom:25px;">O aluno não foi aprovado em nenhuma unidade curricular até ao momento</p>
            </div>
            <div v-else>
              <div v-for="curso in this.ucsAprovadas" :key="curso">
                <h6>{{curso.nome}}</h6>
                <table class="table" style="text-align: left;">
                  <thead>
                    <tr>
                      <th scope="col">Unidade Curricular</th>
                      <th scope="col">Número de inscrições</th>
                      <th scope="col">Ano letivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="tableRow" v-for="cadeira in curso.cadeiras" :key="cadeira">
                      <td>{{ "["+cadeira.codigo+"] "+cadeira.nome }}</td>
                      <td>{{ cadeira.nrinscricoes }}</td>
                      <td>{{ cadeira.anoletivo }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="navTabs[2] == true" class="card-body">
            <div v-if="this.pedidos.length == 0">
              <h6 class="card-title" style="margin-bottom:25px;">Pedidos de confirmação de unidades curriculares</h6>
              <p style="margin-bottom:25px;">O aluno não tem nenhum pedido de confirmação de unidades curriculares</p>
            </div>
            <div v-else>
              <div>
                <table class="table" style="text-align: left;">
                  <thead>
                    <tr>
                      <th scope="col">Curso</th>
                      <th scope="col">Ano letivo</th>
                      <th scope="col">Unidades Curriculares</th>
                      <th scope="col">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="tableRow" v-for="pedido in this.pedidos" :key="pedido">
                      <td>{{pedido.cadeiras[0].cadeira.curso}}</td>
                      <td>{{pedido.anoletivo.anoletivo}}</td>
                      <td>
                        <p v-for="cadeira in pedido.cadeiras" :key="cadeira">
                          {{cadeira.cadeira.nome  + (cadeira.aceite == 1 ? " (aceite)" : (cadeira.aceite == 0 ? " (rejeitada)" : ""))}}
                        </p>
                      </td>
                      <td>{{(pedido.estado == 1 ? "Pendente" : ((pedido.estado == 2) ? "Aceite" : ((pedido.estado == 3) ? "Recusado" : "Parcial")))}}</td>
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
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "GerirAlunos",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
      login: null,
      navTabs: [true,false,false],
      ucsInscritas: [],
      ucsAprovadas: [],
      pedidos: []
    };
  },
  methods: {
    getAlunoInfo(){
      this.pedidos = []
      this.ucsInscritas = []
      this.ucsAprovadas = []
      this.$axios.get("estudante/dados/" + this.login + "/" +  this.counterStore.selectedAnoletivo + "/" + this.counterStore.semestre)
        .then((response) => {
          console.log(response.data)
          this.pedidos = response.data["pedidos"]
          this.ucsInscritas = response.data["cadeirasInscritas"]
          this.ucsAprovadas = response.data["cadeirasAprovadas"]
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },
  mounted() {},
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>