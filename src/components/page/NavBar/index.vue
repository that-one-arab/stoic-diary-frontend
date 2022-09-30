<template>
  <v-card class="navbar-card">
    <v-banner color="light-blue lighten-5">
      <div class="d-flex justify-space-between">
        <v-btn icon @click="pushToPrevDay">
          <v-icon large> mdi-arrow-left </v-icon>
        </v-btn>

        <v-btn color="primary" outlined @click="pickerOn = !pickerOn">
          {{ $route.query.date }}
        </v-btn>

        <v-btn icon @click="pushToNextDay">
          <v-icon large> mdi-arrow-right </v-icon>
        </v-btn>
      </div>
      <!-- The date picker -->
      <v-row v-if="pickerOn" justify="center" class="date-picker-row">
        <v-date-picker v-model="picker" @change="handleChange"></v-date-picker>
      </v-row>
    </v-banner>
  </v-card>
</template>

<script>
import { parseDateToYYYYMMDD, addDays, deductDays } from '@/util/date/index.js';

export default {
  name: 'NavBar',
  data() {
    return {
      pickerOn: false,
      picker: '',
    };
  },
  methods: {
    handleChange(date) {
      this.pickerOn = false;
      this.handleAssignDate(date);
    },

    pushToNextDay() {
      const { date } = this.$route.query;
      let newDate = addDays(date, 1);
      newDate = parseDateToYYYYMMDD(newDate);
      this.handleAssignDate(newDate);
    },

    pushToPrevDay() {
      const { date } = this.$route.query;
      let newDate = deductDays(date, 1);
      newDate = parseDateToYYYYMMDD(newDate);
      this.handleAssignDate(newDate);
    },

    handleAssignDate(date) {
      if (this.$route.query.date !== date) {
        this.$router.push(`/page?date=${date}`);
      }

      this.$emit('dateChange');
    },
  },

  // check if the URl has a date query param, if it does, use it else use today's value.
  created() {
    let date = this.$route.query.date;

    if (date) {
      date = parseDateToYYYYMMDD(date);
      this.picker = date;
      this.handleAssignDate(date);
      return;
    }

    const todayDate = parseDateToYYYYMMDD('today');
    this.picker = todayDate;
    this.handleAssignDate(todayDate);
  },
};
</script>

<style scoped>
.navbar-card {
  position: relative;
}

.date-picker-row {
  margin-top: 10px;
  position: absolute;
  left: 39%;
  z-index: 20;
}

@media screen and (max-width: 1024px) {
  .date-picker-row {
    left: 26%;
  }
}
</style>
