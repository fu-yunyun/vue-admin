<template></template>
<script>
export default {
  setup(props, { root }) {
    console.log(root.$route.query.id);
  },
};
</script>
<style scoped lang="scss">
</style>