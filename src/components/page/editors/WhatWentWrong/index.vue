<template>
  <input-section label="What Went Wrong" />
</template>

<script>
import InputSection from '../InputSection/index.vue';
export default {
  name: 'WhatWentWrong',
  components: {
    InputSection,
  },
  provide: {
    sectionName: 'whatWentWrong',
  },
};
</script>
