<template>
  <div class="min-h-70vh mt-20 max-w-7xl mx-auto text-center pt-16 flex flex-col lg:justify-evenly lg:flex-row lg:items-center lg:pt-0">
    <div>
      <p class="text-7xl font-bold text-blue-500 lg:text-9xl">404</p>
      <p class="text-2xl lg:text-4xl">Page not found</p>
      <router-link to="/">
        <MainButton class="text-white bg-gray-900 mt-2">Back to home</MainButton>
      </router-link>
    </div>
    <img :src="require('@/assets/random/concept-about-business-failure.svg')"
         alt="page not found"
         class="w-52 sm:w-72 mt-5 mx-auto lg:mx-0 lg:w-1/2"
    >
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "PageNotFound",
  components: {MainButton}
}
</script>

<style scoped>

</style>