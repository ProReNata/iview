<template>
  <div style="width: 500px;margin: 100px;">
    <p>
      <label>
        <input type="text">
      </label>
    </p>

    <DatePicker
      type="month"
      show-week-numbers
      placeholder="Select date"
      style="width: 200px"
    >
    </DatePicker>
    <DatePicker
      type="year"
      show-week-numbers
      placeholder="Select date"
      style="width: 200px"
    >
    </DatePicker>

    <DatePicker
      type="date"
      transfer
      show-week-numbers
      placeholder="Select date"
      style="width: 400px"
    >
    </DatePicker>
    <DatePicker
      type="datetime"
      show-week-numbers
      confirm
      placeholder="Select date"
      style="width: 400px"
    >
    </DatePicker>

    <DatePicker
      type="daterange"
      transfer
      show-week-numbers
      placeholder="Select date"
      style="width: 400px"
    >
    </DatePicker>
    <DatePicker
      type="datetimerange"
      transfer
      show-week-numbers
      placeholder="Select date"
      style="width: 400px"
    >
    </DatePicker>
    <Time-Picker
      :steps="[1, 1, 15]"
      :value="new Date()"
    >
    </Time-Picker>
  </div>
</template>
<script>
export default {};
</script>
