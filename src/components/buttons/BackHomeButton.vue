<template>
  <router-link to="/">
    <MainButton>Back to Home</MainButton>
  </router-link>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "BackHomeButton",
  components: {MainButton}
}
</script>

<style scoped>

</style>