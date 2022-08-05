<template>
  <div v-if="posts.length">
    <div class="residence_wrapper flex justify-around items-center flex-col m-auto mt-6 lg:flex-row max-w-screen-xl sm:flex-wrap">
      <div v-for="post in posts" :key="post.id"
           class="residence -translate-x-20 shadow-md mt-4 max-w-xs w-full lg:max-w-sm">
        <img :src="post.images[0]" alt="residence" class="max-w-sm w-full h-64 object-cover" loading="lazy">
        <span class="block p-4 font-bold"><i class="fa-solid fa-location-dot mr-3"></i>{{
            post.location }}</span>
        <div class="info_box p-4 pt-2 flex justify-around max-w-sm">
          <span class="text-gray-600"><i class="fa-solid fa-bed text-xl mr-2"></i>{{ post.basic_info.rooms }} Bed</span>
          <span class="text-gray-600"><i class="fa-solid fa-bath text-xl mr-2"></i>{{ post.basic_info.bathrooms }} Bath</span>
          <span class="text-gray-600"><i class="fa-solid fa-layer-group mr-2"></i>{{ post.basic_info.surface }}㎡</span>
        </div>
        <div class="price flex items-center justify-between p-4">
          <router-link :to="{name: 'house', params: {title: post.title.replaceAll(' ', '-').toLowerCase(), id: post.id}}">
            <MainButton class="text-white bg-black">Review Now</MainButton>
          </router-link>
          <span class="font-bold">${{ post.price.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import gsap from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {onMounted} from "vue";
import useGetAllPosts from "@/composables/getAllPosts";

export default {
  name: "HeroResidences",
  components: {MainButton},
  setup() {
    gsap.registerPlugin(ScrollTrigger);
    const {posts, getAllPosts} = useGetAllPosts()

    onMounted(async () => {
      await getAllPosts("posts", 'timestamp', 'desc', 3, 'timestamp', '<', new Date())
      gsap.to('.residence', {
        scrollTrigger: '.residence',
        x: 0,
      })
      gsap.to('.residence:nth-child(2)', {
        scrollTrigger: '.residence:nth-child(2)',
        x: 0,
      })
      gsap.to('.residence:nth-child(3)', {
        scrollTrigger: '.residence:nth-child(3)',
        x: 0,
      })



    })
    return {posts}
  }
}
</script>

<style scoped>

</style>