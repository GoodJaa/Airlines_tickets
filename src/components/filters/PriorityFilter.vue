<template>
  <div class="priority-filter-wrapper">
    <div class="priority-filter__item"
         :class="{'priority-filter__item--active': filter.isActive}"
         @click="[activatedFilter(filter)]"
         :key="filter.id"
         v-for="filter in filters">
      {{ filter.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import { mapMutations } from "vuex";

type IPriorityFilter = {
  id: number;
  text: string;
  isActive: boolean
}

export default defineComponent({
  name: "PriorityFilter",
  data() {
    return {
      filters: [
        {
          id: 1,
          text: 'самый дешевый',
          isActive: false,
        },
        {
          id: 2,
          text: 'самый быстрый',
          isActive: false,
        },
        {
          id: 3,
          text: 'оптимальный',
          isActive: false,
        }
      ] as IPriorityFilter[]
    }
  },
  mounted() {
    this.filters.forEach(
      item => item.isActive = item.id === this.$store.state.moduleFilter.activePriorityFilterId
    );
  },
  methods: {
    ...mapMutations('moduleFilter', [
      'setActivePriorityFilter',
      'setShowedTickets'
    ]),
    activatedFilter(filter: IPriorityFilter): void {
      if (filter.isActive) {
        return;
      }
      this.filters.forEach(item => item.isActive = filter.id === item.id);
      this.setShowedTickets(5);
      this.setActivePriorityFilter(filter.id);
    }
  },
});
</script>

<style scoped lang="scss">
  .priority-filter-wrapper {
    background-color: #fff;
    margin-bottom: 20px;
    display: grid;
    grid-auto-columns: 1fr;
    border-radius: 5px;
    border: 1px solid #DFE5EC;
    overflow: hidden;

    & .priority-filter__item {
      text-transform: uppercase;
      padding: 15px;
      cursor: pointer;
      grid-row: 1;
      text-align: center;
      transition: .3s;
      &:hover {
        background-color: #F1FCFF;
      }
      &:nth-child(1) {
        border-right: 1px solid #DFE5EC;
      }
      &:nth-child(3) {
        border-left: 1px solid #DFE5EC;
      }
      &:nth-child(2) {
        border: none;
      }
      &.priority-filter__item--active {
        &:nth-child(1) {
          border-right: 1px solid #2196F3;
        }
        &:nth-child(3) {
          border-left: 1px solid #2196F3;
        }
        &:nth-child(2) {
          border-left: 1px solid #2196F3;
          border-right: 1px solid #2196F3;
        }
        color: #fff;
        background-color: #2196F3;
      }
    }
  }
</style>