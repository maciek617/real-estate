<template>
  <nav
      class="flex z-50 justify-between p-5 lg:py-0 xl:px-10  lg:h-20 fixed w-full">
    <NavTitle/>
    <NavLinks :class="isVisible ? 'visible' : ''"/>
    <NavOptions/>
    <NavMobile @show="checkVisibility"/>
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

    return {isVisible, checkVisibility}
  }
}
</script>

<style scoped lang="scss">
.visible {
  transform: translateY(0);
}
</style>