<template>
  <div v-if="Object.keys(ticketCardData).length" class="ticket-card-wrapper">
    <div class="ticket-card-header">
      <div class="ticket-card__price">{{ticketCardData.price}} Р</div>
      <img :src="imagePath" alt="Company logo" width="110" height="36">
    </div>
    <div class="ticket-card-footer">
      <CardProperty>
        <template #header>{{`${ticketCardData.info.origin} - ${ticketCardData.info.destination}`}}</template>
        <template #footer>{{getFormatRouteTime}}</template>
      </CardProperty>
      <CardProperty>
        <template #header>В ПУТИ</template>
        <template #footer>{{getFormatDuration}}</template>
      </CardProperty>
      <CardProperty>
        <template #header>{{getTransferCount}}</template>
        <template #footer>{{ticketCardData.info.stops?.join(', ')}}</template>
      </CardProperty>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import CardProperty from '@/components/CardProperty.vue';

export default defineComponent({
  name: "TicketCard",
  props: {
    cardData: {
      type: Object as PropType<ITicket>,
      required: true
    },
    company: {
      type: Object as PropType<ICompany | undefined>,
      required: true
    }
  },
  data() {
    return {
      ticketCardData: {} as ITicket
    }
  },
  mounted() {
    this.ticketCardData = { ...this.cardData };
  },
  computed: {
    imagePath(): string {
      return new URL(`../assets/icons/${this.company?.name?.replace(/\s+/g, '')}.png`, import.meta.url).href
    },
    getTransferCount(): string {
      const length = this.ticketCardData.info.stops?.length || null;
      let transferString;
      if (length) {
        if (length === 1) {
          transferString = 'пересадка';
        } else if (1 < length && length < 5) {
          transferString = 'пересадки';
        } else {
          transferString = 'пересадок';
        }
      } else {
        transferString = 'без пересадок';
      }
      return `${length ? length : ''} ${transferString}`.toUpperCase();
    },
    getFormatRouteTime(): string {
      if (this.ticketCardData?.info) {
        const start: {[key: string]: number | string} = this.formatTime(this.ticketCardData.info?.dateStart);
        const end: {[key: string]: number | string} = this.formatTime(this.ticketCardData.info?.dateEnd);
        start.hours = start.hours < 10 ? `0${start.hours}` : start.hours;
        end.hours = end.hours < 10 ? `0${end.hours}` : end.hours;
        return `${start.hours}:${start.mins} - ${end.hours}:${end.mins}`
      }
      return ''
    },
    getFormatDuration(): string {
      const date: {[key: string]: number | string} =  this.formatTime(this.ticketCardData.info?.duration);
      return `${date.hours}ч ${date.mins}м`
    }
  },
  methods: {
    formatTime(value: number): {[key: string]: number} {
      const date: Date = new Date(value)
      const hours: number = date.getUTCHours();
      const mins: number = date.getUTCMinutes();

      return {hours, mins}
    }
  },
  components: {
    CardProperty
  }
});
</script>

<style scoped lang="scss">
  .ticket-card-wrapper {
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 20px;
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