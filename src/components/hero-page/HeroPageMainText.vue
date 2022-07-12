<template>
  <div
      class="text_box max-w-screen-2xl m-auto h-vh text-white drop-shadow">
    <h1 class="text-4xl max-w-6xl sm:text-5xl lg:text-6xl 2xl:text-8xl">Are you ready to find your
      dream
      house?</h1>
    <p class="my-4 max-w-screen-sm 2xl:mt-10 2xl:text-very-large">It is now very easy to reach the
      house of your dream with FindState the house you are looking for very easily.</p>
    <router-link :to="user ? {name: 'find-house'} : {name: 'signup'}">
      <MainButton class="bg-white text-black">Get Started</MainButton>
    </router-link>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import getUser from "@/composables/getUser";

export default {
  name: "HeroPageMainText",
  components: {MainButton},
  setup() {
    const {user} = getUser();
    return {user}
  }
}
</script>

<style scoped>

</style>