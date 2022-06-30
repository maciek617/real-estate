<template>
  <div class="additional_links sm:flex sm:justify-around w-full max-w-4xl">
    <div class="additional_link mt-10" v-for="link in footerLinkBase" :key="link.title">
      <p class="font-bold mb-4 lg:text-2xl">{{link.title}}</p>
      <p class="text-gray-500 cursor-pointer mt-2">{{link.link1}}</p>
      <p class="text-gray-500 cursor-pointer mt-2">{{link.link2}}</p>
      <p class="text-gray-500 cursor-pointer mt-2">{{link.link3}}</p>
      <p class="text-gray-500 cursor-pointer mt-2">{{link.link4}}</p>
      <p class="text-gray-500 cursor-pointer mt-2">{{link.link5}}</p>
      <p class="text-gray-500 cursor-pointer mt-2">{{link.link6}}</p>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "FooterLinks",
  setup() {
    const footerLinkBase = ref([
      {
        title: 'Product',
        link1: 'Download',
        link2: 'Location',
        link3: 'Services',
        link4: 'Pricing'
      },
      {
        title: 'Community',
        link1: 'Accessibility',
        link2: 'Gift',
        link3: 'Guest',
        link4: 'About Us',
        link5: 'Contact',
        link6: 'Events'
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
    return {footerLinkBase}
  }
}
</script>

<style scoped>

</style>