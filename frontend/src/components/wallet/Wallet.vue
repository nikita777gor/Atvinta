<script setup lang="ts">

</script>

<template>

  <div class="block">
    <div class="wallet">
      <h2 class="block-title">Кошелек криптовалют</h2>
      <div class="wallet-coins">
        <img class="wallet-coins-item" src="/icons/coin.png" alt="coin">
      </div>
      <p class="info-text text-slate wallet-coins-count">45 biorobo монет</p>
      <div class="wallet-buttons">
        <p class="text wallet-buttons-clicker">Нацыганить</p>
        <div class="wallet-buttons-toggler">
          <input type="checkbox">
          <p class="text">Цыганить по пять монет</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">

@import "@/assets/scss/main.scss";

.wallet{

  &-coins{
    margin-bottom: 24px;
    &-item{
      height: 20px;
    }
    &-count{
      margin-bottom: 30px;
    }
  }

  &-buttons{
    @include flex-gap(27px);

    &-clicker{
      cursor: pointer;
      color: $color-light-orange;
      text-decoration: underline;
    }
    &-toggler{
      @include flex-gap(8px);
    }
  }

}

</style>
