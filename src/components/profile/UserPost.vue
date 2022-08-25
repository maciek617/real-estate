<template>
  <div class="w-full max-w-6xl px-4 py-4 bg-white rounded-2xl shadow-2xl mt-4">
    <p class="text-3xl font-bold">User's posts</p>
    <div v-if="posts.length" class="flex flex-wrap justify-around">
      <div v-for="post in posts" :key="post.id">
        <div class="bg-white relative shadow-md mt-4 max-w-xs w-96 lg:max-w-sm">
          <img :src="post.main_photo" alt="residence" class="max-w-sm w-full h-64 object-cover" loading="lazy">
          <span class="block p-4 font-bold"><i class="fa-solid fa-location-dot mr-3"></i>{{ post.location }}</span>
          <div class="info_box p-4 pt-2 flex justify-around max-w-sm">
            <span class="text-gray-600"><i class="fa-solid fa-bed text-xl mr-2"></i>{{ post.basic_info.rooms }} Bed</span>
            <span class="text-gray-600"><i class="fa-solid fa-bath text-xl mr-2"></i>{{ post.basic_info.bathrooms }} Bath</span>
            <span class="text-gray-600"><i class="fa-solid fa-layer-group mr-2"></i>{{ post.basic_info.surface }}㎡</span>
          </div>
          <div class="absolute right-2 rounded top-2 bg-white py-2 px-4 shadow-2xl cursor-default">{{ post.category.toString().replace('All', '') }}</div>
          <div class="price flex items-center justify-between p-4">
            <router-link :to="{name: 'house', params: {title: post.title.replaceAll(' ', '-').toLowerCase(), id: post.id}}">
              <MainButton class="text-white bg-black">Review Now</MainButton>
            </router-link>
            <span class="font-bold">${{ post.price.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="font-bold text-blue-500 text-center py-2">User doesn't create any posts yet.</p>
    </div>
  </div>
</template>

<script>
import useGetAllPosts from "@/composables/getAllPosts";
import {onMounted} from "vue";
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "UserPost",
  props: ['user'],
  components: {MainButton},
  setup(props) {
    const {getAllPosts, isPending, posts} = useGetAllPosts();

    onMounted(() => {
      getAllPosts("posts", "timestamp", "desc", 6, "author.id", "==", props.user)
    })


    return {isPending, posts}
  }
}
</script>

<style scoped>

</style>