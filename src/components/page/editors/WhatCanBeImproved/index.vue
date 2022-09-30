<template>
  <input-section label="What Can Be Improved" />
</template>

<script>
import InputSection from '../InputSection/index.vue';
export default {
  name: 'WhatCanBeImproved',
  components: {
    InputSection,
  },
  provide: {
    sectionName: 'whatCanBeImproved',
  },
};
</script>
