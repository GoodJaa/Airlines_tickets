<template>
  <div class="routes-filter-wrapper">
    <div class="filter-input-wrapper">
      <ValueChangeButton class="routes-filter-change-button"/>
      <input type="text" v-model="from"
             class="filter-input filter-input--before-value-change-button"
             placeholder="Откуда">
    </div>
    <input type="text" v-model="to"
           class="filter-input filter-input--after-value-change-button"
           placeholder="Куда">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ValueChangeButton from "@/components/ValueChangeButton.vue";

export default defineComponent({
  name: "RoutesFilter",
  data() {
    return {
      from: '',
      to: ''
    }
  },
  components: {
    ValueChangeButton
  }
});
</script>

<style scoped lang="scss">
  .routes-filter-wrapper {
    display: grid;
    grid-auto-columns: 1fr;
    grid-row: 1;
    grid-gap: 2px;
    .routes-filter-change-button {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
    }
    .filter-input-wrapper {
      position: relative;
      grid-row: 1;
      grid-gap: 2px;
    }
    .filter-input {
      &.filter-input--before-value-change-button {
        width: 100%;
        position: relative;
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
      }
      &.filter-input--after-value-change-button {
        grid-row: 1;
        padding-left: 20px;
      }
    }
  }
</style>