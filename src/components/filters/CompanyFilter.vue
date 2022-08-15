<template>
  <div class="company-filter-wrapper">
    <div class="company-filter-header">КОМПАНИЯ</div>
    <label class="radio-wrapper"
           :key="filter.id"
           v-for="filter in filters">
      <input class="radio"
             type="radio"
             :value="filter.id"
             v-model="checkedFilter"/>
      <div class="checkmark"></div>
      <div>{{filter.name}}</div>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

type ICompanyFilter = {
  id: number;
  name: string;
}

export default defineComponent({
  name: "CompanyFilter",
  data() {
    return {
      filters: [
        {
          id: 1,
          name: 'Все'
        },
        {
          id: 2,
          name: 'S7 Airlines'
        },
        {
          id: 3,
          name: 'XiamenAir'
        }
      ] as ICompanyFilter[],
      checkedFilter: null
    }
  },
});
</script>

<style scoped lang="scss">
.company-filter-header {
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
    min-width: 227px;
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