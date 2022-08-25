import { createStore } from 'vuex';
import axios from "axios";
import transferAmountFilter from "@/components/filters/TransferAmountFilter.vue";

interface IFilter {
  value: string | number | string[],
  param: string,
  filterMethod: (ticket: ITicket, filter: IFilter) => boolean
}
enum EPriorityFilters {
  Optimal = 3,
  Quick = 2,
  Cheap = 1
}
enum ECompanyFilterAll {
  All = '1',
}
// change to default
const DEFAULT_SORT = EPriorityFilters.Optimal;

function companyFilterMethod(ticket: ITicket, filter: IFilter): boolean {
  return filter.value === ECompanyFilterAll["All"] || ticket[filter.param] === filter.value
}

function dateFilterMethod(ticket: ITicket, filter: IFilter): boolean {
  const ticketDate: Date = new Date(+ticket.info[filter.param]);
  const filterDate: Date = new Date(+filter.value)
  return ticketDate.getFullYear() === filterDate.getFullYear() &&
    ticketDate.getMonth() === filterDate.getMonth() &&
    ticketDate.getDate() === filterDate.getDate()
}

function transferAmountFilterMethod(ticket: ITicket, filter: IFilter): boolean {
  if (Array.isArray(filter.value)) {
    if (!filter.value.length) {
      return true;
    } else {
      for (const value of filter.value) {
        if (+value === ticket.info[filter.param].length) {
          return true
        }
      }
    }
    return false;
  }
}

function commonFilterMethod(ticket: ITicket, filter: IFilter): boolean {
  return ticket.info[filter.param] === filter.value;
}

const moduleFilter = {
  namespaced: true,
  state: {
    cityCodes: ['MOW', 'HKT', 'HKG', 'JNB', 'PTB', 'ARH',
      'TRN', 'KRS', 'SRT', 'LOS', 'EKV', 'EKT'],
    companies: [] as ICompany[],
    tickets: [] as ITicket[],
    activePriorityFilterId: DEFAULT_SORT,
    howManyShowedTickets: 5,
    filters: {
      companyFilter: {
        value: '1',
        param: 'companyId',
        filterMethod: companyFilterMethod
      },
      datesStartFilter: {
        value: 0,
        param: 'dateStart',
        filterMethod: dateFilterMethod
      },
      datesEndFilter: {
        value: 0,
        param: 'dateEnd',
        filterMethod: dateFilterMethod
      },
      routeStartFilter: {
        value: '',
        param: 'origin',
        filterMethod: commonFilterMethod
      },
      routeEndFilter: {
        value: '',
        param: 'destination',
        filterMethod: commonFilterMethod
      },
      transferAmountFilter: {
        value: [] as string[],
        param: 'stops',
        filterMethod: transferAmountFilterMethod
      }
    } as {[key: string]: IFilter}
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
    },
    applyCompanyFilter: (state: any, id: string): void => {
      state.filters.companyFilter.value = id;
    },
    applyTransferAmountFilter: (state: any, checkedFilters: number[]): void => {
      state.filters.transferAmountFilter.value = checkedFilters;
    },
    applyDatesStartFilter: (state: any, dateStart: Date): void => {
      state.filters.datesStartFilter.value = dateStart.getTime();
    },
    applyDatesEndFilter: (state: any, dateEnd: Date): void => {
      state.filters.datesStartFilter.value = dateEnd.getTime();
    },
    applyRouteStartFilter: (state: any, routeStart: string): void => {
      state.filters.routeStartFilter.value = routeStart;
    },
    applyRouteEndFilter: (state: any, routeEnd: string): void => {
      state.filters.routeEndFilter.value = routeEnd;
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
          context.commit('setTickets', response.data);
        });
    }
  },
  getters: {
    filteredTickets: (state: any) => {
      let tickets: ITicket[] = [...state.tickets];
      for (const filterName in state.filters) {
        const filter: IFilter = state.filters[filterName];
        if (Array.isArray(filter.value) || filter.value) {
          tickets = tickets.filter((ticket: ITicket): boolean => {
              return filter.filterMethod(ticket, filter)
            }
          );
        }
      }
      if (tickets.length) {
        tickets.sort((a: ITicket, b: ITicket): number => {
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
      }
    }
  }
}

export default createStore({
  modules: {
    moduleFilter: moduleFilter
  }
})