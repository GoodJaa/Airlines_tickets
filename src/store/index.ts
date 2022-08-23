import { createStore } from 'vuex';
import axios from "axios";

enum EPriorityFilters {
  Optimal = 3,
  Quick = 2,
  Cheap = 1
}
// change to default
const DEFAULT_SORT = EPriorityFilters.Optimal;

const moduleFilter = {
  namespaced: true,
  state: {
    companies: [] as ICompany[],
    tickets: [] as ITicket[],
    filteredTickets: [] as ITicket[],
    activePriorityFilterId: DEFAULT_SORT,
    howManyShowedTickets: 5,
  },
  mutations: {
    setCompanies: (state: any, companies: ICompany[]): void => {
      state.companies = [...companies]
    },
    setTickets: (state: any, tickets: ITicket[]): void => {
      state.tickets = [...tickets];
    },
    setActivePriorityFilter: (state: any, id: number): void => {
      state.activePriorityFilterId = id;
    },
    setShowedTickets: (state: any, count: number): void => {
      state.howManyShowedTickets = count;
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
  },
  getters: {
    ticketsSort: (state: any) => {
      const tickets: ITicket[] = [...state.tickets]
        .sort((a: ITicket, b: ITicket): number => {
          switch (EPriorityFilters[state.activePriorityFilterId]) {
            case 'Optimal':
              return a.info.stops.length - b.info.stops.length;
            case 'Cheap':
              return +a.price - +b.price;
            case 'Quick':
              return a.info.duration - b.info.duration;
            default:
              return 0
          }
        })
      return tickets.slice(0, state.howManyShowedTickets);
    },
  }
}

export default createStore({
  modules: {
    moduleFilter: moduleFilter
  }
})