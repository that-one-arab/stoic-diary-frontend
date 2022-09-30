<template>
  <div>
    <change-username v-if="selectedTab === 'change-username'" />
    <change-password v-else-if="selectedTab === 'change-password'" />
    <delete-my-account v-else-if="selectedTab === 'delete-my-account'" />
  </div>
</template>

<script>
import ChangePassword from './ChangePassword.vue';
import ChangeUsername from './ChangeUsername.vue';
import DeleteMyAccount from './DeleteMyAccount.vue';

export default {
  name: 'TabRenderer',
  props: {
    selectedTab: String,
  },
  components: {
    ChangeUsername,
    ChangePassword,
    DeleteMyAccount,
  },
};
</script>

<style ChangePassword></style>
