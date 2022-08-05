<template>
  <div class="additional_links sm:flex sm:justify-around w-full max-w-4xl">
    <div class="additional_link mt-8" v-for="link in footerLinkBase" :key="link.title">
      <p class="font-bold mb-4 lg:text-2xl">{{ link.title }}</p>

      <router-link :to="{name: link.link1.toLowerCase()}" @click="scrollToTop">
        <p class="text-gray-500 cursor-pointer mt-2">{{ link.link1 }}</p>
      </router-link>
      <router-link :to="{name: link.link2.toLowerCase()}" @click="scrollToTop">
        <p class="text-gray-500 cursor-pointer mt-2">{{ link.link2 }}</p>
      </router-link>
      <router-link :to="{name: link.link3.toLowerCase()}" @click="scrollToTop">
        <p class="text-gray-500 cursor-pointer mt-2">{{ link.link3 }}</p>
      </router-link>
      <router-link :to="{name: link.link4.toLowerCase()}" @click="scrollToTop">
        <p class="text-gray-500 cursor-pointer mt-2">{{ link.link4 }}</p>
      </router-link>
      <router-link :to="{name: link.link5.toLowerCase()}" @click="scrollToTop">
        <p class="text-gray-500 cursor-pointer mt-2">{{ link.link5 }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import scrollToTop from "@/composables/scrollTop";
export default {
  name: "FooterLinks",
  setup() {
    const footerLinkBase = ref([
      {
        title: 'Product',
        link1: 'Download',
        link2: 'Location',
        link3: 'Services',
        link4: 'Pricing',
        link5: 'Future'
      },
      {
        title: 'Community',
        link1: 'Newsletter',
        link2: 'Guest',
        link3: 'About',
        link4: 'Contact',
        link5: 'Events'
      },
      {
        title: 'About',
        link1: 'Investors',
        link2: 'Carriers',
        link3: 'Founders',
        link4: 'Work',
        link5: 'News'
      }
    ])
    return {footerLinkBase, scrollToTop}
  }
}
</script>

<style scoped>

</style>