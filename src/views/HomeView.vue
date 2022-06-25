<template>
  <div class="home relative">
    <div
        class="text_box max-w-screen-2xl m-auto h-vh py-40 p-4 sm:py-50 lg:px-40 lg:py-60 2xl:px-10 2xl:py-80 text-white drop-shadow">
      <h1 class="text-4xl max-w-6xl sm:text-5xl lg:text-6xl 2xl:text-8xl">Are you ready to find your
        dream
        house?</h1>
      <p class="my-4 max-w-screen-sm 2xl:mt-10 2xl:text-very-large">It is now very easy to reach the
        house of your dream with FindState the house you are looking for very easily.</p>
      <MainButton>Get Started</MainButton>
    </div>
    <HomePageSearch/>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import HomePageSearch from "@/components/hero-page/HomePageSearch";
export default {
  name: 'HomeView',
  components: {MainButton,HomePageSearch}
}
</script>


<style scoped>
.home {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
  url('../assets/buildings/house_2.jpg');
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: cover;
}
</style>