<template>
  <div
      class="swiper_wrapper border-b-2 border-gray-500 max-w-screen-lg m-auto p-4 pb-10 mt-24 border-b-2 border-gray-500">
    <swiper class="cursor-grab"
            :modules="modules"
            :space-between="10"
            :loop="true"
            :pagination="{ clickable: true }"
            :autoplay="{
              delay: 7000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }"

    >
      <swiper-slide v-for="text in swiperTextBase" :key="text.description" class="pb-14 sm:flex sm:justify-evenly">
        <h1 class="font-bold text-2xl pb-6 lg:text-3xl">{{ text.author }}</h1>
        <p class="text-gray-500 max-w-sm lg:max-w-lg">{{ text.description }}</p>
      </swiper-slide>
    </swiper>
  </div>
  <CompaniesView/>
</template>

<script>
import CompaniesView from "@/components/hero-page/scroll-down/CompaniesView";
import {Pagination, Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import {ref} from "vue";

export default {
  name: "QuoteView",
  components: {CompaniesView, Swiper, SwiperSlide},
  setup() {
    const swiperTextBase = ref([
      {
        author: 'Elon Musk',
        description: 'When something is important enough, you do it even if the odds are not in your favor.'
      },
      {
        author: 'Bill Gates',
        description: 'The belief that the world is getting worse, that we can\'t solve extreme poverty and disease, isn\'t just mistaken.'
      },
      {
        author: 'Jeff Bezos',
        description: 'A man must physically protect his woman. But a woman must spiritually protect her man. She must bring positivity and joy.'
      },
    ])

    return {
      modules: [Pagination, Autoplay],
      swiperTextBase
    };
  },
}
</script>

<style scoped>

</style>