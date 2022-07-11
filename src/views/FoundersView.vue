<template>
  <div class="mt-24 px-4 max-w-screen-2xl m-auto lg:flex lg:justify-between min-h-70vh lg:pt-20 3xl:pt-52">
    <div class="sm:mt-24 lg:mt-32">
      <h1 class="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">Inspired by Success Stories</h1>
      <p class="mt-2 text-gray-500 mb-8 max-w-xl">Hi, my name is Maciej. I am 17 years old javascript programmer and
        passionate
        about web development. I created this app to make some progress about Firebase and Vue 3.</p>
      <BackHomeButton class="bg-gray-900 text-white py-2"/>
    </div>
    <img :src="require('../assets/random/insipired.jpg')" alt="inspired people"
         class="mt-8 m-auto sm:max-w-xl lg:w-full lg:max-w-xl xl:max-w-2xl shadow-2xl">
  </div>
</template>

<script>
import BackHomeButton from "@/components/buttons/BackHomeButton";

export default {
  name: "FoundersView",
  components: {BackHomeButton}
}
</script>

<style scoped>

</style>