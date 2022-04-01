import { defineStore } from 'pinia'
import axios from "axios";

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    courses: [],
    courseWithUCs: [],
    cadeiraToManage: []
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getCourses() {
      try {
        let response = await axios.get("curso")
        this.courses = response.data
        return response.data;
      } catch (error) {
        console.log(error.response)
        throw error
      }
    },
    async getCourseWithUCs(courseId){
      try {
        let response = await axios.get("curso/cadeiras/" + courseId)
        this.courseWithUCs = response.data;
      } catch {
        console.log(error.response);
        throw error
      }        
    }
  }
})
