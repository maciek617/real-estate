<template>
  <div class="fixed top-0 left-0 z-50 bg-modal w-full h-full" @click="closeWhenClickOutside">
    <swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        navigation
        :pagination="{ clickable: true }"
        class="max-w-7xl relative swiper"
    >
      <MainButton class="swiper bg-white text-black absolute top-12 right-2 rounded z-50" @click="$emit('closeGallery')">Close</MainButton>
      <swiper-slide v-for="image in images" :key="image" class="pt-10 mb-20">
        <img :src="image" alt="photo house" class="swiper max-w-7xl m-auto h-tablet lg:h-desktop h-full object-cover cursor-grab w-full">
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>

import {Swiper, SwiperSlide} from 'swiper/vue';
import {Pagination, Navigation} from "swiper";
import MainButton from "@/components/buttons/MainButton";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide,
    MainButton
  },
  props: ['images'],
  emits: ['closeGallery'],
  setup(props, ctx) {

    const closeWhenClickOutside = (e) => {
      if (e.target.classList.contains('fixed') || e.key === "Escape") {
        ctx.emit('closeGallery');
      }
    }

    window.addEventListener('keyup', (e) => {
      e.key === "Escape" ? ctx.emit('closeGallery') : null
    });

    return {
      modules: [Pagination, Navigation], closeWhenClickOutside
    };
  },
};
</script>