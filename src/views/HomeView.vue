<template>
  <HeroPageMain class="bg-no-repeat object-cover bg-cover bg-hero-img"/>
  <HeroPageSecond/>
  <PopularResidences/>
  <QuoteView/>
</template>

<script>
import HeroPageMain from "@/components/hero-page/HeroPageMain";
import HeroPageSecond from "@/components/hero-page/HeroPageSecond";
import PopularResidences from "@/components/hero-page/scroll-down/PopularResidences";
import QuoteView from "@/components/hero-page/scroll-down/QuoteView";
export default {
  name: 'HomeView',
  components: {HeroPageMain, HeroPageSecond, PopularResidences, QuoteView}
}
</script>


<style scoped>
</style>