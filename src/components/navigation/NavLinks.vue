<template>
  <div
      class="bg-bg-mobile flex flex-col items-start text-white absolute w-full h-vh top-0 left-0 -translate-y-full transition-all delay-75 ease-out py-40 px-10 lg:flex-row lg:translate-y-0 lg:h-auto lg:py-6 lg:justify-center lg:bg-transparent lg:text-black">
    <router-link v-for="link in linkBase" :key="link" :to="{name:
    link.replace(' ', '-').toLowerCase()}" class="text-2xl lg:px-4 lg:text-bg-mobile font-normal" @click="scrollTop">{{ link }}
    </router-link>
    <NavOptions class="mt-48 lg:hidden" @click="scrollTop"/>
  </div>
</template>

<script>
import {ref} from "vue";
import NavOptions from "@/components/navigation/NavOptions";
import scrollToTop from '../../composables/scrollTop'
export default {
  name: "NavLinks",
  components: {NavOptions},
  emits:[ 'close'],
  setup(props, ctx) {
    const linkBase = ref(['Home', 'Find House', 'Pricing', 'Events']);

    const scrollTop = () => {
      scrollToTop()
      ctx.emit('close')
    }


    return {linkBase, scrollTop}
  }
}
</script>

<style scoped>
a.router-link-exact-active {
  color: lightcoral;
}
</style>