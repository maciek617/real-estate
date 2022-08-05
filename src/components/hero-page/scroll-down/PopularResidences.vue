<template>
  <div class="px-4">
    <div
        class="residence_main_title mt-14 flex flex-col sm:flex-row sm:justify-between lg:justify-between lg:px-44">
      <span class="font-bold text-2xl sm:text-3xl lg:text-4xl">Latest Residences</span>
      <router-link :to="{name: 'find-house'}">
         <span class="text-gray-500 py-2 cursor-pointer">Explore All <i class="fa-solid fa-arrow-right-long text-gray-500"></i></span>
      </router-link>
    </div>
    <HeroResidences/>
  </div>
</template>

<script>
import HeroResidences from "@/components/hero-page/scroll-down/HeroResidences";

export default {
  name: "PopularResidences",
  components: {HeroResidences}
}
</script>

<style scoped>

</style>