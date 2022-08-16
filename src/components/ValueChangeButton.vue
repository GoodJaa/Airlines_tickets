<template>
  <div class="value-change-button">
    <Arrow class="arrow"/>
    <Arrow class="arrow arrow--right"/>
  </div>
</template>

<script>
import Arrow from '@/components/icons/Arrow.vue';
export default {
  name: "ValueChangeButton",
  components: {
    Arrow
  }
};
</script>

<style scoped lang="scss">
  .value-change-button {
    cursor: pointer;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 100%;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;

    .arrow--right {
      transform: rotate(180deg);
    }
  }
</style>