<template>
  <div class="home relative">
    <transition
        appear
        @before-enter="beforeEnter"
        @enter="enter"
    >
      <HeroPageMainText class="p-4 py-44 sm:py-50 lg:px-40 lg:py-60 2xl:px-10 2xl:py-80"/>
    </transition>
    <HomePageSearch/>
  </div>
</template>

<script>
import HeroPageMainText from "@/components/hero-page/HeroPageMainText";
import HomePageSearch from "@/components/hero-page/HomePageSearch";
import gsap from 'gsap';

export default {
  name: "HeroPageMain",
  components: {HomePageSearch, HeroPageMainText},
  setup() {
    const beforeEnter = (el) => {
      el.style.transform = 'translateY(-60px)'
      el.style.opacity = 0
    }
    const enter = (el) => {
      gsap.to(el, {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'bounce.out'
      })
    }
    return {beforeEnter, enter}
  }

}
</script>
