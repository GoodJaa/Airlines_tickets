<template>
  <div class="priority-filter-wrapper">
    <div class="priority-filter__item" :class="{'priority-filter__item--active': filter.active}" @click="[activatedFilter(filter)]" v-for="filter in filters">
      {{ filter.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "PriorityFilter",
  data() {
    return {
      filters: [
        {
          id: 1,
          text: 'САМЫЙ ДЕШЁВЫЙ',
          active: true,
        },
        {
          id: 2,
          text: 'САМЫЙ БЫСТРЫЙ',
          active: false,
        },
        {
          id: 3,
          text: 'ОПТИМАЛЬНЫЙ',
          active: false,
        }
      ]
    }
  },
  methods: {
    activatedFilter(filter) {
      this.filters.forEach(item => item.active = filter.id === item.id ? true : false)
    }
  }
};
</script>

<style scoped lang="scss">
  .priority-filter-wrapper {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    border: 1px solid #DFE5EC;
    overflow: hidden;

    & .priority-filter__item {
      padding: 15px;
      cursor: pointer;
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
        broder: none;
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