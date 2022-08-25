<template>
  <div class="company-filter-wrapper">
    <div class="company-filter-header">компания</div>
    <label class="radio-wrapper"
           :key="filter.id"
           v-for="filter in filters">
      <input class="radio"
             type="radio"
             v-model="checkedFilter"
             :value="filter.id"
             @change="applyCompanyFilter(filter.id)"/>
      <div class="checkmark"></div>
      <div>{{filter.name}}</div>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import type { PropType } from "vue";
import {mapMutations} from "vuex";

type ICompanyFilter = {
  id: string;
  name: string;
}

export default defineComponent({
  name: "CompanyFilter",
  props: {
    companies: {
      type: [] as PropType<ICompany[]>,
      required: true
    }
  },
  data() {
    return {
      filters: [
        {
          id: '1',
          name: 'Все',
        },

      ] as ICompanyFilter[],
      checkedFilter: this.$store.state.moduleFilter.filters.companyFilter.value,
    }
  },
  mounted() {
    for (const company of this.companies) {
      this.filters.push(
        {
          id: company.id,
          name: company.name
        }
      )
    }
  },
  methods: {
    ...mapMutations('moduleFilter', [
      'applyCompanyFilter'
    ])
  }
});
</script>

<style scoped lang="scss">
.company-filter-header {
  text-transform: uppercase;
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 12px;
  line-height: 12px;
}
.company-filter-wrapper {
  padding: 20px 0 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .radio-wrapper {
    display: flex;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #4A4A4A;
    padding: 10px 20px;
    transition: .3s;

    &:hover {
      background-color: #F1FCFF;
    }
  }
  .radio-wrapper input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    height: 20px;
    width: 20px;
    border-radius: 100%;
    border: 1px solid #9ABBCE;
    margin-right: 10px;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .radio-wrapper input:checked ~ .checkmark:after {
    display: block;
  }
  .radio-wrapper input:checked ~ .checkmark {
    border-color: #2196F3;
  }
  .radio-wrapper .checkmark:after {
    width: 12px;
    height: 12px;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    background-color: #2196F3;
  }
}
</style>