<template>
  <Teleport to="body">
    <div class="fixed h-vh top-0 left-0 z-50 bg-modal w-full flex items-center justify-center">
      <div class="bg-blue-50 mx-4 rounded-2xl p-4 shadow-2xl relative max-w-2xl">
        <h1 class="text-xl text-center mt-4">Are you sure that you want to <span class="font-bold">delete</span> your account?</h1>
        <p class="text-center mt-4">If you clicked yes, your <strong>account, posts and data</strong> would be deleted, but if you click cancel nothing happened.</p>
        <div class="text-center mt-2">
          <MainButton class="bg-gray-900 text-white mx-2" @click="deleteUser">Yes, i do</MainButton>
          <MainButton class="bg-gray-900 text-white mx-2" @click="$emit('cancelDelete')">Cancel</MainButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import useDeleteUserAccount from "@/composables/deleteUser"
import {useRouter} from "vue-router";
export default {
  name: "ConfirmDeleteUser",
  components: {MainButton},
  emits: ['cancelDelete'],
  setup(prop, ctx) {
    const {deleteUserAccount, isPending} = useDeleteUserAccount()
    const router = useRouter()

    const deleteUser = () => {
      deleteUserAccount();
      ctx.emit('cancelDelete')
      if(!isPending.value) {
        router.push({name: 'home'})
      }
    }


    return {deleteUser}
  }
}
</script>

<style scoped>

</style>