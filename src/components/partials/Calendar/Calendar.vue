<template>
  <div class="calendar">
    <div class="controls">
      <button @click="prevMonth">«</button>
      <span>{{ currentMonthName }} {{ currentYear }}</span>
      <button @click="nextMonth">»</button>
    </div>
    <div class="weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
    </div>
    <div class="dates">
      <div
        v-for="date in calendarDates"
        :key="date.dateString"
        class="date"
        :class="{
          'is-today': date.isToday,
          'is-other-month': date.isOtherMonth,
          'holiday': date.type === 'holiday',
          'weekend': date.type === 'weekend',
          'workday': date.type === 'workday'
        }"
      >
        {{ date.day }}
      </div>
    </div>
    <!-- <p @click="showCalendarData">Показать форму рассчёов</p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import dayTypesData from './data/2024.json';

interface CalendarDate {
  day: number;
  isToday: boolean;
  isOtherMonth: boolean;
  dateString: string;
  type: string;
}

const weekdays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const today: Date = new Date();
const currentMonth = ref<number>(today.getMonth());
const currentYear = ref<number>(today.getFullYear());

const currentMonthName = computed(() => new Date(currentYear.value, currentMonth.value).toLocaleString('ru-RU', { month: 'long' }));

const calendarDates = computed<CalendarDate[]>(() => {
  const dates: CalendarDate[] = [];
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();

  // Добавляем дни предыдущего месяца
  const startDay = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
  for (let i = startDay; i > 1; i--) {
    const prevMonthDate = new Date(currentYear.value, currentMonth.value, -i + 2);
    dates.push({
      day: prevMonthDate.getDate(),
      isToday: false,
      isOtherMonth: true,
      dateString: prevMonthDate.toISOString().split('T')[0],
      type: getDayType(prevMonthDate.getDate(), prevMonthDate.toLocaleString('ru-RU', { month: 'long' }))
    });
  }

  // Добавляем дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    dates.push({
      day: i,
      isToday: date.toDateString() === today.toDateString(),
      isOtherMonth: false,
      dateString: date.toISOString().split('T')[0],
      type: getDayType(i, currentMonthName.value)
    });
  }

  // Добавляем дни следующего месяца
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value, daysInMonth);
  for (let i = 1; i <= (7 - lastDayOfMonth.getDay()); i++) {
    const nextMonthDate = new Date(currentYear.value, currentMonth.value + 1, i);
    dates.push({
      day: i,
      isToday: false,
      isOtherMonth: true,
      dateString: nextMonthDate.toISOString().split('T')[0],
      type: getDayType(i, nextMonthDate.toLocaleString('ru-RU', { month: 'long' }))
    });
  }

  return dates;
});

function getDayType(day: number, monthName: string): string {
  const monthData = dayTypesData[monthName];
  if (monthData) {
    const dayData = monthData.find((d: any) => d.day === day);
    return dayData ? dayData.type : 'workday';
  }
  return 'workday';
}

function prevMonth(): void {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  calcCalendarData();
}

function nextMonth(): void {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  calcCalendarData();
}

const emit = defineEmits(['calendarData', 'showCalendarData']);
const calcCalendarData = () => {
  const currentMonthDates = calendarDates.value.filter(date => !date.isOtherMonth);

  const workdays = currentMonthDates.filter(date => date.type === 'workday').length;
  const weekendsAndHolidays = currentMonthDates.filter(date => date.type === 'weekend' || date.type === 'holiday').length;
  const month = currentMonthName.value;

  emit('calendarData', { workdays, weekendsAndHolidays, month });
};

// const calendarDataIsShow = ref<boolean>(false);
// const showCalendarData = () => {
//   calendarDataIsShow.value = !calendarDataIsShow.value;
//   emit('showCalendarData', calendarDataIsShow.value);
// };

onMounted(() => {
  calcCalendarData();
});
</script>

<style scoped lang="scss">
.calendar {
  font-family: Arial, sans-serif;
  max-width: 600px;
  // margin: 0 auto;
  padding: 20px;
  // border: 1px solid #073e4d;
  border-radius: 10px;
  // background-color: #fff;
  background: #e5e5e5e5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    button {
      background-color: #073e4d;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 15px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: lighten(#073e4d, 10%);
      }
    }

    span {
      font-size: 1.5em;
      margin: 0 20px;
      color: #ffffff;
      text-transform: capitalize;
    }
  }

  .weekdays {
    display: flex;
    justify-content: space-around;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    color: #666;
    margin-bottom: 10px;
    gap: 20px;
  }

  .dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }

  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #073e4d;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1.2em;
    padding: 10px;
    text-align: center;
    background-color: #ffb86c6b;

    &.is-today {
      background-color: #fff7a9 !important;
    }

    &.is-other-month {
      color: #fff;
    }

    &.holiday {
      background-color: #ffb86cf5;
    }

    &.weekend {
      background-color: #82eeda;
    }

    &.workday {
      background-color: #cc83f573;
    }

    &:hover {
      background-color: #fd3df1ba;
    }
  }
}
</style>
