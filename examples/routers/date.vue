<template>
  <div style="width: 500px;margin: 100px;">
    <p>
      <label>
        <input type="text">
      </label>
    </p>

    <date-picker
      type="month"
      show-week-numbers
      placeholder="Select date"
      style="width: 200px"
    >
    </date-picker>
    <date-picker
      type="year"
      show-week-numbers
      placeholder="Select date"
      style="width: 200px"
    >
    </date-picker>

    <date-picker
      type="date"
      transfer
      show-week-numbers
      placeholder="Select date"
      style="width: 400px"
    >
    </date-picker>
    <date-picker
      type="datetime"
      show-week-numbers
      confirm
      placeholder="Select date"
      style="width: 400px"
    >
    </date-picker>

    <date-picker
      type="daterange"
      transfer
      show-week-numbers
      placeholder="Select date"
      style="width: 400px"
    >
    </date-picker>
    <date-picker
      type="datetimerange"
      transfer
      show-week-numbers
      placeholder="Select date"
      style="width: 400px"
    >
    </date-picker>
    <time-picker
      :steps="[1, 1, 15]"
      :value="new Date()"
    >
    </time-picker>
  </div>
</template>
<script>
export default {};
</script>
