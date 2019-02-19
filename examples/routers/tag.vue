<template>
  <div>
    <tag checkable>
      Label 1
    </tag>
    <tag>Label 2</tag>
    <tag
      v-if="show"
      closable
      @on-close="handleClose"
    >
      Label 3
    </tag>
    <br><br>
    <tag
      type="border"
      checkable
    >
      Label 3
    </tag>
    <tag
      type="border"
      closable
    >
      Label 4
    </tag>
    <tag type="dot">
      Label 1
    </tag>
    <tag
      type="dot"
      closable
    >
      Label 2
    </tag>
    <br><br>
    <tag
      closable
      color="blue"
      checkable
    >
      Label 1
    </tag>
    <tag
      closable
      color="green"
      checkable
    >
      Label 2
    </tag>
    <tag
      closable
      color="red"
      checkable
    >
      Label 3
    </tag>
    <tag
      closable
      color="yellow"
      checkable
    >
      Label 4
    </tag>
    <br><br>
    <tag
      color="blue"
      checkable
    >
      Label 1
    </tag>
    <tag
      color="green"
      checkable
    >
      Label 2
    </tag>
    <tag
      color="red"
      checkable
    >
      Label 3
    </tag>
    <tag
      color="yellow"
      checkable
    >
      Label 4
    </tag>
    <br><br>
    <tag
      closable
      color="#EF6AFF"
      checkable
    >
      Label 1
    </tag>
    <tag
      color="#EF6AFF"
      checkable
    >
      Label 1
    </tag>
    <tag
      type="border"
      closable
      color="#EF6AFF"
      checkable
    >
      Label 2
    </tag>
    <tag
      type="dot"
      closable
      color="#EF6AFF"
      checkable
    >
      Label 3
    </tag>
    <tag
      closable
      color="default"
      checkable
    >
      Label 4
    </tag>
    <br><br>
    <tag
      closable
      color="#EF6AFF"
    >
      Label 1
    </tag>
    <tag
      type="border"
      closable
      color="#EF6AFF"
    >
      Label 2
    </tag>
    <tag
      type="dot"
      closable
      color="#EF6AFF"
    >
      Label 3
    </tag>
    <tag
      closable
      color="default"
    >
      Label 4
    </tag>
    <br><br>
    <tag
      type="border"
      closable
      color="blue"
      checkable
    >
      Label 1
    </tag>
    <tag
      type="border"
      closable
      color="green"
    >
      Label 2
    </tag>
    <tag
      type="border"
      closable
      color="red"
    >
      Label 3
    </tag>
    <tag
      type="border"
      closable
      color="yellow"
    >
      Label 4
    </tag>
    <br><br>
    <tag
      type="dot"
      closable
      color="blue"
      checkable
    >
      Label 1
    </tag>
    <tag
      type="dot"
      closable
      color="green"
    >
      Label 2
    </tag>
    <tag
      type="dot"
      closable
      color="red"
    >
      Label 3
    </tag>
    <tag
      type="dot"
      closable
      color="yellow"
    >
      Label 4
    </tag>
    <br><br>
    <tag
      v-for="item in count"
      :key="item"
      :name="item"
      closable
      @on-close="handleClose2"
    >
      Label {{ item + 1 }}
    </tag>
    <i-button
      icon="plus"
      icon-weight="regular"
      size="small"
      @click="handleAdd"
    >
      Add Tag
    </i-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: [0, 1, 2],
      show: true,
    };
  },

  methods: {
    handleAdd() {
      if (this.count.length) {
        this.count.push(this.count[this.count.length - 1] + 1);
      } else {
        this.count.push(0);
      }
    },
    handleClose() {
      this.show = false;
    },
    handleClose2(event, name) {
      const index = this.count.indexOf(name);

      this.count.splice(index, 1);
    },
  },
};
</script>
