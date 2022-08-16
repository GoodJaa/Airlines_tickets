<script lang="ts">
import LogoIcon from '@/components/icons/LogoIcon.vue';
import TicketCard from '@/components/TicketCard.vue';
import PriorityFilter from "@/components/filters/PriorityFilter.vue";
import TransferAmountFilter from "@/components/filters/TransferAmountFilter.vue";
import CompanyFilter from "@/components/filters/CompanyFilter.vue";
import DatesFilter from "@/components/filters/DatesFilter.vue";
import RoutesFilter from "@/components/filters/RoutesFilter.vue";
import { defineComponent } from "vue";

type ITicketInfo = {
  dateEnd: number;
  dateStart: number;
  destination: string;
  duration: number;
  origin: string;
  stops: string[];
}
interface ITicket {
  companyId: string;
  id: string;
  info: ITicketInfo;
  price: string;
}

export default defineComponent({
  name: 'TicketsFilterView',
  data() {
    return {
      ticketCardsData: [] as ITicket[],
      companies: null,
      showedTickets: [] as ITicket[],
      loader: false,
      howManyShowedTickets: 5
    };
  },
  async mounted() {
    try {
      this.loader = true;
      await this.$store.dispatch("moduleFilter/getCompanies");
      await this.$store.dispatch("moduleFilter/getTickets");
      this.ticketCardsData = this.$store.state.moduleFilter.tickets;
      this.companies = this.$store.state.moduleFilter.companies;
      this.showedTickets = this.ticketCardsData.slice(0, this.howManyShowedTickets);
    } catch (error) {
      console.log(error);
    } finally {
      this.loader = false;
    }
  },
  methods: {
    showMoreTickets() {
      const oldValue: number = this.howManyShowedTickets;
      const newValue: number = oldValue + 5;
      const newTickets = (this.ticketCardsData.slice(oldValue, newValue));
      this.showedTickets = [...this.showedTickets, ...newTickets]
      this.howManyShowedTickets = newValue;
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
  }
});
</script>

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
          <template v-if="showedTickets">
            <TicketCard :card-data="card"
                        :key="card.id"
                        v-for="card in showedTickets"/>
          </template>
          <button class="button button--blue" @click="showMoreTickets()">ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ</button>
        </main>
      </div>
    </div>
  </div>
</template>

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
      }
    }
  }
</style>
