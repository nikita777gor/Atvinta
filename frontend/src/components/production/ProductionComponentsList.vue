<script setup lang="ts">

import {STATIC_URL} from "@/const/api/apiUrl.const.ts";
import {ref} from "vue";

const img = ref('/components/biohand2.png');


</script>

<template>
  <div class="components-list">
    <div class="components-item">
      <img @click="img = '/components/biohand3.png'" :src="STATIC_URL + img" alt="production component">
    </div>
  </div>
</template>

<style scoped lang="scss">

.components-list{
  @include flex-gap(10px);
  img{
    width: 48px;
    height: auto;
  }
}

</style>
