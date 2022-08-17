import { createStore } from 'vuex';
import axios from "axios";

const moduleFilter = {
  namespaced: true,
  state: {
    companies: [] as ICompany[],
    tickets: [] as ITicket[]
  },
  mutations: {
    setCompanies: (state: any, companies: ICompany[]): void => {
      state.companies = [...companies]
    },
    setTickets: (state: any, tickets: ITicket[]): void => {
      state.tickets = [...tickets];
    }
  },
  actions: {
    async getCompanies (context: any): Promise<any> {
      await axios
        .get('https://api.npoint.io/a1b1c28b32d9785bb26c')
        .then(response => {
          context.commit('setCompanies', response.data)
        });
    },
    async getTickets (context: any): Promise<any> {
      await axios
        .get('https://api.npoint.io/163b5e66df9f2741243e')
        .then(response => {
          context.commit('setTickets', response.data)
        });
    }
  }
}

export default createStore({
  modules: {
    moduleFilter: moduleFilter
  }
})