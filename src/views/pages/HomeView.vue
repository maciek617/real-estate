<template>
  <HeroPageMain class="bg-no-repeat object-cover bg-cover bg-hero-img"/>
  <HeroPageSecond/>
  <PopularResidences/>
  <QuoteView/>
  <HeroPageCustomers/>
  <HeroPageLastSection/>
</template>

<script>
import HeroPageMain from "@/components/hero-page/HeroPageMain";
import HeroPageSecond from "@/components/hero-page/HeroPageSecond";
import PopularResidences from "@/components/hero-page/scroll-down/PopularResidences";
import QuoteView from "@/components/hero-page/scroll-down/QuoteView";
import HeroPageCustomers from "@/components/hero-page/HeroPageCustomers";
import HeroPageLastSection from "@/components/hero-page/scroll-down/HeroPageLastSection";

export default {
  name: 'HomeView',
  components: {HeroPageMain, HeroPageSecond, PopularResidences, HeroPageCustomers, HeroPageLastSection, QuoteView},
  setup() {
  }
}
</script>
<style scoped>
</style>