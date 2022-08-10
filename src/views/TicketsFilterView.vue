<script>
import LogoIcon from '@/components/icons/LogoIcon.vue';
import TicketCard from '@/components/TicketCard.vue';
import PriorityFilter from "@/components/filters/PriorityFilter.vue";
import TransferAmountFilter from "@/components/filters/TransferAmountFilter.vue";
import CompanyFilter from "@/components/filters/CompanyFilter.vue";
import ticketStubFile from '@/stubs/ticketsData.json';

export default {
  name: 'TicketsFilterView',
  data() {
    return {
      ticketCardsData: [],
      loader: false
    }
  },
  mounted() {
    try {
      this.loader = true;
      this.ticketCardsData = this.getTickets();
      console.log(this.ticketCardsData)
    } catch (error) {
      console.log(error)
    } finally {
      this.loader = false;
    }
  },
  methods: {
    getTickets() {
      const tickets = ticketStubFile?.tickets;
      return tickets;
    }
  },
  components: {
    LogoIcon,
    TicketCard,
    PriorityFilter,
    TransferAmountFilter,
    CompanyFilter
  }
}
</script>

<template>
  <div class="container">
    <header class="header">
      <LogoIcon/>
    </header>
    <div class="wrapper">
      <div class="content">
        <aside class="content__asside">
          <TransferAmountFilter/>
          <CompanyFilter/>
        </aside>
        <main class="content__main">
          <PriorityFilter/>
          <template v-if="ticketCardsData.length">
            <TicketCard :card-data="card" v-for="card in ticketCardsData"/>
          </template>
          <button class="button button--blue">ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ</button>
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
  .container {
    width: 95%;
    max-width: 940px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center
  }

  .content {
    display: flex;

    & .content__asside, .content__main {
      display: flex;
      flex-direction: column;
    }
    & .content__asside {
      margin-right: 20px;
    }

    & .content__main {

    }

    .button {
      &.button--blue {
        color: #fff;
        background-color: #2196F3;
      }
    }
  }
</style>
