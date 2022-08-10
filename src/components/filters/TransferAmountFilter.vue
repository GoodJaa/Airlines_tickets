<template>
  <div class="transfer-amount-filter-wrapper">
    <div class="transfer-amount-filter-header">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
    <label class="checkbox-wrapper" v-for="item in filters">
      <input class="checkbox" type="checkbox" :checked="isChecked" :value="item.name"/>
      <div class="checkmark"></div>
      <div>{{item.name}}</div>
    </label>
  </div>
</template>

<script>
export default {
  name: "TransferAmountFilter",
  data() {
    return {
      filters: [
        {
          id: 1,
          name: 'Без пересадок'
        },
        {
          id: 2,
          name: '1 пересадка'
        },
        {
          id: 3,
          name: '2 пересадки'
        },
        {
          id: 4,
          name: '3 пересадки'
        }
      ],
      value: "",
      modelValue: [],
    }
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      return this.modelValue === true
    }
  }
};
</script>

<style scoped lang="scss">
  .transfer-amount-filter-header {
    padding: 0 20px;
    margin-bottom: 20px;
    font-size: 12px;
    line-height: 12px;
  }
  .transfer-amount-filter-wrapper {
    padding: 20px 0 15px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 20px;

    .checkbox-wrapper {
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
    .checkbox-wrapper input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .checkmark {
      height: 20px;
      width: 20px;
      border-radius: 2px;
      border: 1px solid #9ABBCE;
      margin-right: 10px;
    }
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    .checkbox-wrapper input:checked ~ .checkmark:after {
      display: block;
    }
    .checkbox-wrapper input:checked ~ .checkmark {
      border-color: #2196F3;
    }
    .checkbox-wrapper .checkmark:after {
      left: 6px;
      top: 1px;
      width: 6px;
      height: 12px;
      border: solid #2196F3;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
</style>