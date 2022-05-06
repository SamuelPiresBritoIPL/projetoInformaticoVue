<template>
  <div class="container-fluid">
    <h2>Gerir Coordenadores</h2>
    <div v-if="adminLogged" class="card text-center">
      <div class="card-header">
        Coordenadores e sub coordenadores de cada curso
      </div>
      <div class="card-body">
        <div class="table-responsive" style="max-height: 350px;">
          <table class="table" style="text-align: left;">
            <thead style="position: sticky; top: 0; z-index: 1; background-color:white;">
              <tr >
                <th scope="col">Curso</th>
                <th scope="col">Nº de Coordenadores</th>
                <th scope="col">Login </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in coursesWithCoordinatores" :key="course">
                <td>{{ "["+course.codigo+"] "+course.nome }}</td>
                <td>{{ course.coordenadores.length }}</td>
                <td scope="col">
                  <p v-for="coordenador in course.coordenadores" :key="coordenador">{{ coordenador.utilizador.login }}</p> 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-sm-6">
        <div class="card border-light mb-3" style="max-width: 32rem;">
          <div class="card-header">Adicionar Coordenadores</div>
          <div class="card-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Curso:</label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCourse">
                <option value="null">Selecione um curso.</option>
                <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
                {{ "["+course.codigo+"] "+course.nome }}
                </option>
              </select>
              <div v-if="hasErrorCurso" class="errorMessages">
                <small style="color: #a94442; margin-left: 5px;">{{ grantRoleError.idCurso }}</small>
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Tipo de Coordenador:</label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="roleId">
                <option value="null">Selecione uma opção</option>
                <option value="0">Coordenador</option>
                <option value="1">Subcoordenador</option>
              </select>
              <div v-if="hasErrorTipo"  class="errorMessages">
                <small style="color: #a94442; margin-left: 5px;">{{ grantRoleError.tipo }}</small>
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Login/Email:</label>
              <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="Login/Email" v-model="login">
              <div v-if="hasErrorLogin" class="errorMessages">
                <small style="color: #a94442; margin-left: 5px;">{{ grantRoleError.login }}</small>
              </div>
            </div>
            <button class="btn btn-primary" @click="grantCoordinatorRole(selectedCourse, roleId, login)">Submeter</button>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card border-light mb-3" style="max-width: 32rem;">
          <div class="card-header">Remover Coordenadores</div>
          <div class="card-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Curso:</label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCourseRemove" v-on:change="getCoordinatorsByCourse(selectedCourseRemove)">
                <option value="null">Selecione um curso.</option>
                <option v-for="course in this.counterStore.courses" :key="course.id" v-bind:value="course.id">
                {{ "["+course.codigo+"] "+course.nome }}
                </option>
              </select>
              <div v-if="hasErrorCursoNullRemover" class="errorMessages">
                <small style="color: #a94442; margin-left: 5px;">{{ nullCurso }}</small>
              </div>
              <div v-if="hasErrorCursoRemover" class="errorMessages">
                <small style="color: #a94442; margin-left: 5px;">{{ grantRoleError.login }}</small>
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Coordenador:</label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedCoordinator">
                <option value="null">Selecione um coordenador</option>
                <option v-for="coordenador in coordinatoresByCourse" :key="coordenador" v-bind:value="coordenador.id">
                {{ coordenador.utilizador.login }}
                </option>
              </select>
              <div v-if="hasErrorLoginNullRemover" class="errorMessages">
                <small style="color: #a94442; margin-left: 5px;">{{ nullCoordenador }}</small>
              </div>
              <div v-if="hasErrorLoginRemover" class="errorMessages">
                <small style="color: #a94442; margin-left: 5px;">{{ grantRoleError.login }}</small>
              </div>
            </div>
            <small></small>
            <button class="btn btn-danger" @click="revokeCoordinatorRole(selectedCoordinator, selectedCourseRemove)">Remover</button>
          </div>
        </div>
      </div>
    </div>
  </div>    
</template>

<script>
import { useCounterStore } from "../../stores/counter"
export default {
  name: "GerirCoordenadores",
  component: {},
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data() {
    return {
        coursesWithCoordinatores: [],
        coordinatoresByCourse: [],
        selectedCourseRemove: null,
        selectedCourse: null,
        roleId: null,
        login: null,
        selectedCoordinator: null,
        adminLogged: false,
        coordenadorLogged: false,
        grantRoleError: null,
        revokeRoleError: null,
        nullCoordenador: null,
        nullCurso: null
    };
  },
  computed: {
    hasErrorCurso(){
      if (this.grantRoleError != null) {
        if (this.grantRoleError.idCurso) {
          return true
        }  
      }
      return false
    },
    hasErrorTipo(){
      if (this.grantRoleError != null) {
        if (this.grantRoleError.tipo) {
          return true
        }
      }
      return false
    },
    hasErrorLogin(){
      if (this.grantRoleError != null) {
        if (this.grantRoleError.login) {
          return true
        }
      }
      return false
    },
    hasErrorCursoRemover(){
      if (this.revokeRoleError != null) {
        if (this.revokeRoleError.idCurso) {
          return true
        }
      }
      return false
    },
    hasErrorCursoNullRemover(){
      if (this.nullCurso != null) {
        return true
      }
      return false
    },
    hasErrorLoginNullRemover(){
      if (this.nullCoordenador != null) {
        return true
      }
      return false
    },
    hasErrorLoginRemover(){
      if (this.revokeRoleError != null) {
        if (this.revokeRoleError.login) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    getCoursesCoordinators(){
      this.$axios.get("curso/coordenadores")
        .then((response) => {
          console.log(response.data);
          this.coursesWithCoordinatores = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    grantCoordinatorRole(idCurso, type, login){
      this.$axios.post("coordenador", {
            "login": login,
            "idCurso": idCurso,
            "tipo": parseInt(type)
          })
        .then((response) => {
          this.$toast.success("Role concedido a " + login + "!",);
          this.getCoursesCoordinators()
          this.login = null
        })
        .catch((error) => {
          this.grantRoleError = error.response.data
          if (this.grantRoleError.idCurso) {
            this.grantRoleError.idCurso = "Deve selecionar um curso."
          }
          if (this.grantRoleError.tipo) {
            this.grantRoleError.tipo = "Deve selecionar o tipo de coordenador."
          }
          if (this.grantRoleError.login) {
            this.grantRoleError.login = "Login/Email não encontrado."
          }
          this.$toast.error("Não foi possível conceder o role a este utilizador!");
        });
    },
    getCoordinatorsByCourse(courseId){
      this.$axios.get("curso/coordenadores/" + courseId)
        .then((response) => {
          console.log(response.data);
          this.coordinatoresByCourse = response.data.coordenadores;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    revokeCoordinatorRole(coordinatorId, courseId){
      if (courseId == null && coordinatorId == null) {
        this.nullCurso = "Deve selecionar um curso"
        this.nullCoordenador = "Deve selecionar um coordenador"
        this.$toast.error("Não foi possível retirar o role a este utilizador!");
        throw "Error"
      }
      if (coordinatorId == null) {
        this.nullCoordenador = "Deve selecionar um coordenador"
        this.$toast.error("Não foi possível retirar o role a este utilizador!");
        throw "Error"
      }
      this.$axios.delete("coordenador/" + coordinatorId)
        .then((response) => {
          this.$toast.success("Role retirado com sucesso!");
          this.selectedCoordinator = null
          this.getCoursesCoordinators()
          this.getCoordinatorsByCourse(courseId)
        })
        .catch((error) => {
          this.$toast.error("Não foi possível retirar o role a este utilizador!");
        });
    },
  },
  mounted() {
    if (localStorage.getItem("adminState") && sessionStorage.getItem("tokenAdmin")) {
      this.adminLogged = true
    }
    this.getCoursesCoordinators()
    this.counterStore.getCourses()
  },
};
</script>

<style>
.errorMessages{
  background-color: #f2dede; 
  border-radius: 3px;
  text-align: center
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>