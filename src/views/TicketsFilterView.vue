<template>
  <div class="container">
    <header class="header">
      <LogoIcon/>
    </header>
    <div class="wrapper">
      <div class="content-header">
        <RoutesFilter/>
        <DatesFilter/>
      </div>
      <div class="separator"></div>
      <div class="content">
        <aside class="content__asside">
          <TransferAmountFilter/>
          <CompanyFilter/>
        </aside>
        <main class="content__main">
          <PriorityFilter/>
          <div class="loader-wrapper" v-if="loader">
            <SpinnerLoader/>
          </div>
          <template v-if="!loader && !error && ticketsSort.length">
            <TicketCard :card-data="card"
                        :company="getCompanyById(card.companyId)"
                        :key="card.id"
                        v-for="card in ticketsSort"/>
            <button class="button button--blue" @click="showMoreTickets()">показать ещё 5 билетов</button>
          </template>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LogoIcon from '@/components/icons/LogoIcon.vue';
import TicketCard from '@/components/TicketCard.vue';
import PriorityFilter from "@/components/filters/PriorityFilter.vue";
import TransferAmountFilter from "@/components/filters/TransferAmountFilter.vue";
import CompanyFilter from "@/components/filters/CompanyFilter.vue";
import DatesFilter from "@/components/filters/DatesFilter.vue";
import RoutesFilter from "@/components/filters/RoutesFilter.vue";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import { defineComponent } from "vue";
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default defineComponent({
  name: 'TicketsFilterView',
  data() {
    return {
      ticketCardsData: [] as ITicket[],
      companies: [] as ICompany[],
      showedTickets: [] as ITicket[],
      loader: false,
      error: false
    };
  },
  async mounted() {
    try {
      this.loader = true;
      await this.getCompanies();
      await this.getTickets();
      this.companies = this.$store.state.moduleFilter.companies;
    } catch (error) {
      this.error = true;
    } finally {
      this.loader = false;
    }
  },
  computed: {
    ...mapGetters('moduleFilter', [
      'ticketsSort',
    ]),
  },
  methods: {
    ...mapActions('moduleFilter', [
        'getCompanies',
        'getTickets'
      ]),
    ...mapMutations('moduleFilter', [
      'setShowedTickets'
    ]),
    showMoreTickets(): void {
      this.setShowedTickets(this.$store.state.moduleFilter.howManyShowedTickets + 5);
    },
    getCompanyById(id: string): ICompany | undefined {
      return this.companies.find(company => company.id === id);
    }
  },
  components: {
    LogoIcon,
    TicketCard,
    PriorityFilter,
    TransferAmountFilter,
    CompanyFilter,
    DatesFilter,
    RoutesFilter,
    SpinnerLoader
  }
});
</script>

<style lang="scss">
  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .container {
    width: 95%;
    max-width: 940px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center
  }
  .separator {
    border: 1px solid #DADADA;
    margin-bottom: 25px;
  }

  .content-header {
    display: grid;
    grid-auto-columns: 1fr;
    margin-bottom: 25px;
    width: 100%;
    grid-gap: 2px;
  }

  .content {
    display: grid;
    width: 100%;
    grid-auto-columns: 30% 70%;

    & .loader-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;align-items: center;
    }

    & .content__asside, .content__main {
      display: flex;
      flex-direction: column;
      grid-row: 1;
    }
    & .content__asside {
      margin-right: 20px;
    }

    .button {
      &.button--blue {
        color: #fff;
        background-color: #2196F3;
        &:hover {
          background-color: #fff;
          color: #2196F3;
        }
      }
    }
  }
</style>
