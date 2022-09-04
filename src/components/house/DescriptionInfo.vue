<template>
  <div class="mt-8 bg-white rounded-2xl p-4">
    <p class="text-3xl font-bold">About this home</p>
    <p class="">{{ data.description }}</p>
  </div>
</template>

<script>
export default {
  name: "DescriptionInfo",
  props: ['data']
}
</script>

<style scoped>

</style>