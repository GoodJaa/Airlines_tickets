<template>
  <div class="ticket-card__property">
    <div class="property__header">
      <slot name="header"></slot>
    </div>
    <div class="property__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProperty"
};
</script>

<style scoped lang="scss">
  .ticket-card__property {
    display: flex;
    flex-direction: column;

    & .property__header {
      font-size: 12px;
      color: #A0B0B9;
      line-height: 18px;
    }

    & .property__footer {
      min-width: 140px;
      font-size: 14px;
      color: #4A4A4A;
      line-height: 21px;
    }
  }
</style>