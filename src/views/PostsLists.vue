<template>
  <div class="mt-20 px-4 min-h-70vh pt-10">
    <input type="text"
           v-model="searchOwnPost"
           placeholder="Search by title"
           class="border-blue-500 border-2 rounded w-full max-w-xs m-auto block p-3">

    <div v-for="post in posts"
         :key="post.id"
         v-show="post.title.includes(searchOwnPost)"
         class="flex items-center my-10 p-2 bg-blue-50 rounded-2xl shadow max-w-xl m-auto relative"
    >
      <img :src="post.main_photo"
           alt="main photo"
           class="w-32 object-cover rounded-xl"
      >
      <div class="ml-2 sm: ml-8">
        <p class="font-bold">{{ post.title }}</p>
        <p class="text-sm">{{ post.timestamp.toDate().toDateString() }}</p>
        <h3>id: {{ post.id }}</h3>
        <MainButton class="text-white bg-gray-900 mt-2 ml-2" @click="deleteSpecificPost('posts', post.id)">Delete</MainButton>
        <EditPostPass :user="user" :data="post" :dateToUpdate="new Date(post.nextUpdate * 1000)" :notToUpdate="true" :timeToUpdate="new Date(post.nextUpdate * 1000) - new Date()"/>
      </div>
    </div>
  </div>
</template>

<script>
import useGetAllPosts from "@/composables/getAllPosts";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import MainButton from "@/components/buttons/MainButton";
import getUser from "@/composables/getUser";
import deletePost from "@/composables/deletePost";
import EditPostPass from "@/components/EditPostPass";

export default {
  name: "PostsLists",
  components: {MainButton, EditPostPass},
  setup() {
    const {getAllPosts, isPending, posts} = useGetAllPosts();
    const route = useRoute();
    const router = useRouter()
    const searchOwnPost = ref('')
    const {user} = getUser();

    onMounted(() => {
      if (route.params.id !== user.value.uid) {
        router.push({name: 'find-house'})
      }
      getAllPosts("posts", "timestamp", "desc", 999, "author.id", "==", route.params.id)
    })

    const deleteSpecificPost = async (path, e) => {
      await deletePost(path, e)
      window.location.reload();
    };


    return {isPending, posts, searchOwnPost, deletePost, deleteSpecificPost, user}
  }
}
</script>

<style scoped>

</style>