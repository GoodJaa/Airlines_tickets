<template>
  <div class="routes-filter-wrapper">
    <div class="routes-filter">
      <div class="filter-input-wrapper"
           @mouseleave="isActiveFromDropdown = false">
        <ValueChangeButton class="routes-filter-change-button"
                           @click="changeValue"/>
        <input type="text"
               v-model="from"
               @click="activeDropdown('from')"
               class="filter-input filter-input--city filter-input--before-value-change-button"
               placeholder="Откуда">
        <div v-show="isActiveFromDropdown"
             class="filter-input-dropdown-list">
          <div class="filter-input-dropdown-list__item"
               :key="`from${code}${Date.now()}`"
               @click="setCityCode(code, 'from')"
               v-for="code in cityCodes">
            {{code}}
          </div>
        </div>
      </div>
      <div class="filter-input-wrapper"
           @mouseleave="isActiveToDropdown = false">
        <input type="text"
               v-model="to"
               @click="activeDropdown('to')"
               class="filter-input filter-input--city filter-input--after-value-change-button"
               placeholder="Куда">
        <div v-show="isActiveToDropdown"
             class="filter-input-dropdown-list">
          <div class="filter-input-dropdown-list__item"
               @click="setCityCode(code, 'to')"
               :key="`to${code}${Date.now()}`"
               v-for="code in cityCodes">
            {{code}}
          </div>
        </div>
      </div>
    </div>
    <div class="error-hint routes-filter__error-hint"
         v-show="from && to && from === to">
      <span>Пожалуйста, укажите различные точки отправления и прибытия</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ValueChangeButton from "@/components/ValueChangeButton.vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "RoutesFilter",
  data() {
    return {
      from: '',
      to: '',
      isActiveFromDropdown: false,
      isActiveToDropdown: false,
    }
  },
  methods: {
    ...mapMutations('moduleFilter', [
      'applyRouteStartFilter',
      'applyRouteEndFilter'
    ]),
    changeValue() {
      [this.from, this.to] = [this.to, this.from];
      this.applyRouteStartFilter(this.from);
      this.applyRouteEndFilter(this.to);
    },
    activeDropdown(filter: string): void {
      this.isActiveFromDropdown = filter === 'from';
      this.isActiveToDropdown = filter === 'to';
    },
    setCityCode(code: string, filter: 'from' | 'to') {
      this.resetDropdown();
      this[filter] = code;
      if (filter === 'from') {
        this.applyRouteStartFilter(code)
      } else if (filter === 'to') {
        this.applyRouteEndFilter(code)
      }
    },
    resetDropdown() {
      this.isActiveToDropdown = this.isActiveFromDropdown = false;
    }
  },
  computed: {
    ...mapState('moduleFilter', [
      "cityCodes"
    ]),
  },
  components: {
    ValueChangeButton
  }
});
</script>

<style scoped lang="scss">
  .routes-filter-wrapper {
    grid-row: 1;
  }
  .routes-filter {
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

      & .filter-input-dropdown-list {
        position: absolute;
        display: none;
        display: block;
        cursor: pointer;
        top: 100%;
        z-index: 1000;
        background-color: #fff;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 10px 10px;
        width: 100%;

        & .filter-input-dropdown-list__item {
          padding: 4px 12px;
          transition: .3s;
          &:hover {
            background-color: #F1FCFF;
          }
        }
      }
    }
    .filter-input {
      &.filter-input--city {
        cursor: pointer;
      }
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