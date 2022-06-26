<template>
  <HeroPageMain class="bg-no-repeat object-cover bg-cover bg-hero-img"/>
  <HeroPageSecond/>
</template>

<script>
import HeroPageMain from "@/components/hero-page/HeroPageMain";
import HeroPageSecond from "@/components/hero-page/HeroPageSecond";
export default {
  name: 'HomeView',
  components: {HeroPageMain, HeroPageSecond}
}
</script>


<style scoped>
</style>