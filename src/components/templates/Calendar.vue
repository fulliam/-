<template>
  <div class="caledar-template">
    <!-- <div class="data-section">
      <p class="data-item">Рабочих дней: <span>{{ calendarData.workdays }}</span></p>
      <p class="data-item">Выходных и праздников: <span>{{ calendarData.weekendsAndHolidays }}</span></p>
      <p class="data-item">Текущий месяц: <span>{{ calendarData.month }}</span></p>
    </div> -->
    <div style="display: flex; gap: 20px; padding-bottom: 20px;">
      <Calendar @calendarData="handleCalendarData" @showCalendarData="handleShowCalendarData" />

      <div v-if="calendarDataIsShow">
        <div class="input-section">
          <div class="input-group">
            <input v-model="transportCost" placeholder="Стоимость проезда" />
            <p v-if="transportCost">
              Сумма затрат на проезд туда-обратно в рабочие дни: <span>{{ transportCost * 2 * calendarData.workdays }}</span>
            </p>
          </div>

          <div class="input-group">
            <input v-model="entertainmentCost" placeholder="Стоимость развлечения" />
            <p v-if="entertainmentCost">
              Сумма трат на развлечения в выходные дни: <span>{{ entertainmentCost * calendarData.weekendsAndHolidays }}</span>
            </p>
          </div>

          <div class="input-group">
            <input v-model="lunchCost" placeholder="Стоимость обеда" />
            <p v-if="lunchCost">
              Сумма трат на обед в рабочий день: <span>{{ lunchCost * calendarData.workdays }}</span>
            </p>
          </div>

          <div class="input-group">
            <input v-model="smokeCost" placeholder="Стоимость табака" />
            <p v-if="smokeCost">
              Сумма трат на табак в месяц: <span>{{ smokeCost * (calendarData.workdays + calendarData.weekendsAndHolidays) / 1.5 }}</span>
            </p>
          </div>
          <p v-if="transportCost && entertainmentCost && lunchCost && smokeCost">Итоговые расходы за {{ calendarData.month }} составят: {{ ( transportCost * 2 * calendarData.workdays ) + (entertainmentCost * calendarData.weekendsAndHolidays) + (lunchCost * calendarData.workdays) + (smokeCost * (calendarData.workdays + calendarData.weekendsAndHolidays) / 1.5) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Calendar from '@/components/partials/Calendar/Calendar.vue';
import { ref } from 'vue';

const calendarData = ref<any>({});
const handleCalendarData = (data: any) => {
  calendarData.value = data;
};

const calendarDataIsShow = ref<boolean>(false);
const handleShowCalendarData = (value: boolean) => {
  calendarDataIsShow.value = value;
};

const transportCost = ref<number>();
const entertainmentCost = ref<number>();
const lunchCost = ref<number>();
const smokeCost = ref<number>();
</script>

<style scoped lang="scss">
.calendar-template {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  // background: #f5f5f5;
  background: transparent;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.data-section, .input-section {
  // margin-top: 20px;
  padding: 20px;
  // background: #fff;
  background: transparent;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.data-item {
  font-size: 1.2em;
  margin: 10px 0;
  font-weight: 600;
}

.data-item span {
  font-weight: 400;
  color: #555;
}

.input-group {
  margin: 20px 0;
}

.input-group input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
}

.input-group p {
  font-size: 1.1em;
  font-weight: 500;
}

.input-group p span {
  font-weight: 400;
  color: #555;
}

.input-group input:focus {
  outline: none;
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.data-item span, .input-group p span {
  color: #007BFF;
}
</style>
