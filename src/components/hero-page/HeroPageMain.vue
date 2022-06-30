<template>
  <div class="home relative">
    <HeroPageMainText class="p-4 py-44 sm:py-50 lg:px-40 lg:py-60 2xl:px-10 2xl:py-80"/>
    <HomePageSearch/>
  </div>
</template>

<script>
import HeroPageMainText from "@/components/hero-page/HeroPageMainText";
import HomePageSearch from "@/components/hero-page/HomePageSearch";

export default {
  name: "HeroPageMain",
  components: {HomePageSearch, HeroPageMainText}
}
</script>
