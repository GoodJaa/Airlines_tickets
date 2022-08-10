<template>
  <div class="ticket-card-wrapper">
    <div class="ticket-card-header">
      <div class="ticket-card__price">{{ticketCardData.price}}</div>
      <S7AirlinesIcon/>
    </div>
    <div class="ticket-card-footer">
      <CardProperty>
        <template #header>{{ticketCardData.route}}</template>
        <template #footer>{{ticketCardData.time}}</template>
      </CardProperty>
      <CardProperty>
        <template #header>В ПУТИ</template>
        <template #footer>{{ticketCardData.duration}}</template>
      </CardProperty>
      <CardProperty>
        <template #header>{{getTransferCount}}</template>
        <template v-if="ticketCardData.transfer?.length" #footer>{{ticketCardData.transfer?.join(', ')}}</template>
      </CardProperty>
    </div>
  </div>
</template>

<script>
import CardProperty from '@/components/CardProperty.vue';
import S7AirlinesIcon from '@/components/icons/S7AirlinesIcon.vue';

export default {
  name: "TicketCard",
  props: {
    cardData: {
      type: Object
    }
  },
  data() {
    return {
      ticketCardData: {}
    }
  },
  mounted() {
    console.log(this.cardData);
    this.ticketCardData = { ...this.cardData };
  },
  computed: {
    getTransferCount() {
      const length = this.ticketCardData.transfer?.length || '';
      let transferString;
      console.log(length)
      if (length) {
        if (length === 1) {
          transferString = 'ПЕРЕСАДКА';
        } else if (1 < length && length < 5) {
          transferString = 'ПЕРЕСАДКИ';
        } else {
          transferString = 'ПЕРЕСАДОК';
        }
      } else {
        transferString = 'БЕЗ ПЕРЕСАДОК';
      }
      return `${length} ${transferString}`;
    }
  },
  components: {
    CardProperty,
    S7AirlinesIcon
  }
};
</script>

<style scoped lang="scss">
  .ticket-card-wrapper {
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin: 20px 0;
    padding: 20px;
    length: 100%;

    & .ticket-card-header {
      margin-bottom: 26px;
    }

    & .ticket-card-header, .ticket-card-footer {
      display: flex;
      justify-content: space-between;

      & .ticket-card__price {
        color: #2196F3;
        font-size: 24px;
      }
    }
  }
</style>