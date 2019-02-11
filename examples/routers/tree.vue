<template>
  <div>
    {{ data1 }}
    <tree :data="data1">
    </tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: [
        {
          children: [
            {
              children: [
                {
                  title: 'leaf 1-1-1',
                },
                {
                  title: 'leaf 1-1-2',
                },
              ],
              expand: true,
              title: 'parent 1-1',
            },
            {
              children: [
                {
                  title: 'leaf 1-2-1',
                },
                {
                  title: 'leaf 1-2-1',
                },
              ],
              expand: true,
              title: 'parent 1-2',
            },
          ],
          expand: true,
          title: 'parent 1',
        },
      ],
    };
  },
};
</script>
