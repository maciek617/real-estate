<template>
  <nav
      class="flex z-50 w-full justify-between fixed top-0 left-0 p-5 lg:py-0 lg:h-20 xl:px-10 transition"
      :class="isScrolled ? 'bg-cyan-50' : ''">
    <NavTitle/>
    <NavLinks :class="isVisible ? 'visible' : ''" @close="checkVisibility(false)"/>
    <NavOptions class="hidden"/>
    <NavMobile @show="checkVisibility" :isVisible="isVisible"/>
  </nav>
</template>

<script>

import NavTitle from "@/components/navigation/NavTitle"
import NavLinks from "@/components/navigation/NavLinks";
import NavOptions from "@/components/navigation/NavOptions";
import NavMobile from "@/components/navigation/NavMobile";

import {ref} from "vue";
export default {
  name: "MainNav",
  components: { NavTitle, NavLinks, NavOptions, NavMobile},
  setup() {
    const isVisible = ref(null);
    const checkVisibility = (n) => isVisible.value = n;
    const isScrolled = ref(false);

    const checkIfScrolled = () => window.scrollY > 0 ? isScrolled.value = true : isScrolled.value = false
    window.addEventListener('scroll', checkIfScrolled)

    return {isVisible, checkVisibility, isScrolled}
  }
}
</script>

<style scoped lang="scss">
.visible {
  transform: translateY(0);
}
</style>