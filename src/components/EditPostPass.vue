<template>
  <div class="flex absolute -top-5 left-5 text-gray-500" v-if="showTime && !isNaN(timeToUpdate)">
    <p>{{Math.floor(timeToUpdate / 1000 / 60 / 60 % 24)}}:</p>
    <p>{{Math.floor(timeToUpdate / 1000 / 60 % 60)}}:</p>
    <p>{{Math.floor(timeToUpdate / 1000 % 60)}}</p>
  </div>
  <MainButton v-if="data.author.id === user.uid" class="bg-gray-900 text-white m-2 disabled:cursor-not-allowed" :disabled="showTime"   @click="checkIfUserCanUpdatePost"><i
      class="fa-solid fa-pen-to-square mr-2"></i>Edit</MainButton>
  <ToastModal :failed="temp_notToUpdate">
    <h1 class="text-2xl font-bold drop-shadow">{{temp_notToUpdate  ?  'Ohh, no' : 'Success!' }}</h1>
    <p class="pr-4 sm:text-xl">{{temp_notToUpdate  ? "You can't update your post more than once in 24 hours." : 'Link has been copied. Now you can share with others.' }}</p>
  </ToastModal>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import ToastModal from "@/components/modals/ToastModal";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {ref, watch} from "vue";
export default {
  name: "EditPostPass",
  components: {MainButton, ToastModal},
  props: ['timeToUpdate', 'notToUpdate', 'data', 'user', 'dateToUpdate'],
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const temp_notToUpdate = ref(props.notToUpdate);
    const showTime = ref(false);

    const checkIfUserCanUpdatePost = () => {
      const nowTime = new Date();

      console.log(props.dateToUpdate)
      console.log(nowTime)

      if (props.dateToUpdate > nowTime) {
        store.commit('setTimer');
        temp_notToUpdate.value = true;
        showTime.value = true
        return;
      }
      router.push({name: 'edit-post', params: {id: props.data.id}});
    }

    watch(() => props.notToUpdate, () => {
      temp_notToUpdate.value = false;
    })
    return {checkIfUserCanUpdatePost, temp_notToUpdate, showTime}
  }
}
</script>

<style scoped>

</style>