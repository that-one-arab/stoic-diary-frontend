<template>
  <input-section label="What Went Right" />
</template>

<script>
import InputSection from '../InputSection/index.vue';
export default {
  name: 'WhatWentRight',
  components: {
    InputSection,
  },
  provide: {
    sectionName: 'whatWentRight',
  },
};
</script>
