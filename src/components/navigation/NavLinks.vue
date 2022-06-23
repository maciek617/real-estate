<template>
  <div
      class="bg-bg-mobile flex flex-col items-start text-white fixed w-full h-full top-0 left-0 -translate-y-full transition-all delay-75 ease-out py-40 px-10 lg:flex-row lg:translate-y-0 lg:h-auto lg:py-6 lg:justify-center lg:bg-white lg:text-black">
    <router-link v-for="link in linkBase" :key="link" :to="{name:
    link.replace(' ', '-').toLowerCase()}"
                 class="text-2xl lg:px-4 lg:text-bg-mobile font-light">{{
        link
      }}
    </router-link>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "NavLinks",
  setup() {
    const linkBase = ref(['Home', 'Our Offices', 'Our Consultants', 'Open Office']);
    return {linkBase}
  }
}
</script>

<style scoped>
a.router-link-exact-active {
  color: black;
}
</style>