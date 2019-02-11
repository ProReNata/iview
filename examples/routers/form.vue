<template>
  <form
    :model="formItem"
    :label-width="80"
  >
    <form-item label="Input">
      <i-input
        v-model="formItem.input"
        placeholder="Enter something..."
      ></i-input>
    </form-item>
    <form-item label="Select">
      <label>
        <select v-model="formItem.select">
          <option value="beijing">
            New York
          </option>
          <option value="shanghai">
            London
          </option>
          <option value="shenzhen">
            Sydney
          </option>
        </select>
      </label>
    </form-item>
    <form-item label="DatePicker">
      <row>
        <i-col span="11">
          <date-picker
            v-model="formItem.date"
            type="date"
            placeholder="Select date"
          >
          </date-picker>
        </i-col>
        <i-col
          span="2"
          style="text-align: center"
        >
          -
        </i-col>
        <i-col span="11">
          <time-picker
            v-model="formItem.time"
            type="time"
            placeholder="Select time"
          >
          </time-picker>
        </i-col>
      </row>
    </form-item>
    <form-item label="Radio">
      <radio-group v-model="formItem.radio">
        <radio label="male">
          Male
        </radio>
        <radio label="female">
          Female
        </radio>
      </radio-group>
    </form-item>
    <form-item label="Checkbox">
      <checkbox-group v-model="formItem.checkbox">
        <checkbox label="Eat">
        </checkbox>
        <checkbox label="Sleep">
        </checkbox>
        <checkbox label="Run">
        </checkbox>
        <checkbox label="Movie">
        </checkbox>
      </checkbox-group>
    </form-item>
    <form-item label="Switch">
      <i-switch
        v-model="formItem.switch"
        size="large"
      >
        <span slot="open">
          On
        </span>
        <span slot="close">
          Off
        </span>
      </i-switch>
    </form-item>
    <form-item label="Slider">
      <slider
        v-model="formItem.slider"
        range
      >
      </slider>
    </form-item>
    <form-item label="Text">
      <i-input
        v-model="formItem.textarea"
        type="textarea"
        :autosize="{minRows: 2,maxRows: 5}"
        placeholder="Enter something..."
      ></i-input>
    </form-item>
    <form-item>
      <i-button type="primary">
        Submit
      </i-button>
      <i-button
        type="ghost"
        style="margin-left: 8px"
      >
        Cancel
      </i-button>
    </form-item>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </form>
</template>
<script>
export default {
  data() {
    return {
      formItem: {
        checkbox: [],
        date: '',
        input: '',
        radio: 'male',
        select: '',
        slider: [20, 50],
        switch: true,
        textarea: '',
        time: '',
      },
    };
  },
};
</script>
