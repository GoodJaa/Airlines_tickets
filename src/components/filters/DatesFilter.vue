<template>
  <div class="dates-filter-wrapper">
    <!-- https://icehaunter.github.io/vue3-datepicker -->
    <div class="filter-input-wrapper">
      <datepicker v-model="when"
                  :lower-limit="lowerLimitDatesStart"
                  :upper-limit="upperLimitDatesStart"
                  class="filter-input date-input"
                  placeholder="Когда"/>
    </div>
    <div class="filter-input-wrapper">
      <datepicker v-model="back"
                  :lower-limit="lowerLimitDatesEnd"
                  class="filter-input date-input last"
                  style="border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;"
                  placeholder="Обратно"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Datepicker from 'vue3-datepicker';
import { mapMutations } from "vuex";

export default defineComponent({
  name: "DatesFilter",
  data() {
    return {
      when: null,
      back: null,
    }
  },
  methods: {
    ...mapMutations('moduleFilter', [
      'applyDatesStartFilter',
      'applyDatesEndFilter'
    ])
  },
  computed: {
    lowerLimitDatesStart(): Date {
      return new Date(Date.now() - 8640000)
    },
    upperLimitDatesStart(): Date | null {
      if (this.back) {
        return new Date(this.back)
      }
      return null
    },
    lowerLimitDatesEnd(): Date | null {
      if (this.when) {
        return new Date(this.when)
      }
      return null
    }
  },
  watch: {
    when() {
      this.applyDatesStartFilter(this.when)
    },
    back() {
      this.applyDatesEndFilter(this.back)
    }
  },
  components: {
    Datepicker
  }
});
</script>

<style scoped lang="scss">
  .dates-filter-wrapper {
    display: grid;
    grid-auto-columns: 1fr;
    grid-row: 1;
    grid-gap: 2px;
  }
  .filter-input-wrapper {
    grid-row: 1;
    grid-gap: 2px;
    &::after {
      content: '';
      position: absolute;
      display: block;
      top: 50%;
      right: 18px;
      transform: translate(0, -50%);
      width: 24px;
      height: 24px;
      background-image: url("@/assets/icons/calendar.svg");
    }
    .v3dp__datepicker {
      --elem-selected-bg-color: var(--vdp-selected-bg-color, #008EFF);
      --elem-hover-bg-color: var(--vdp-hover-bg-color, #008EFF);
    };
  }
</style>