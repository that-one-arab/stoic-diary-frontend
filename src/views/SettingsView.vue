<template>
  <v-container>
    <v-row>
      <v-col sm="12" lg="2">
        <v-sheet rounded="lg">
          <v-list color="transparent">
            <v-list-item
              link
              v-for="tab in sidebarTabs"
              :key="tab.value"
              :class="tab.value === selectedTab && 'blue lighten-1'"
              @click="$router.push(`${routes.SETTINGS_ROUTE}?tab=${tab.value}`)"
            >
              <v-list-item-content>
                <v-list-item-title> {{ tab.label }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col sm="12" lg="10">
        <v-sheet min-height="70vh" rounded="lg">
          <tab-renderer :selectedTab="selectedTab" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TabRenderer from '@/components/Settings/TabRenderer.vue';
import { SETTINGS_ROUTE } from '@/constants/routes';
import SIDEBAR_TABS from '@/constants/settings/tabs';

export default {
  components: { TabRenderer },
  name: 'SettingsView',
  data() {
    return {
      sidebarTabs: SIDEBAR_TABS,
      routes: {
        SETTINGS_ROUTE,
      },
    };
  },
  computed: {
    selectedTab() {
      return this.$route.query.tab;
    },
  },
};
</script>
