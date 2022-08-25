<template>
  <Teleport to="body">
    <div class="fixed h-vh top-0 left-0 z-50 bg-modal w-full flex items-center justify-center">
      <div class="bg-blue-50 mx-4 rounded-2xl p-4 shadow-2xl relative max-w-2xl">
        <h1 class="text-xl text-center mt-4">Are you sure that you want to <span class="font-bold">delete</span> your account?</h1>
        <p class="text-center mt-4">If you clicked yes, your <strong>account, posts and data</strong> would be deleted, but if you click cancel nothing happened. Before deleting u will be asked
          <span>to</span>login again (our system detect if u were logged in using email and password or u were using Google Oauth, in email case you have to provide password in popup and in case
          of Google you have to login on account that you want to delete.)</p>
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
import {useRouter} from "vue-router";
import reAuth from "@/composables/reAuthUser";
import reAuthGoogle from "@/composables/reAuthGoogle";
import getUser from "@/composables/getUser";
export default {
  name: "ConfirmDeleteUser",
  components: {MainButton},
  emits: ['cancelDelete'],
  setup(prop, ctx) {
    const router = useRouter();
    const {user} = getUser()
    const deleteUser = async () => {
      if(user.value.providerData[0].providerId === 'google.com') {
        await reAuthGoogle();
        ctx.emit('cancelDelete');
        await router.push('/')
      } else {
        await reAuth()
        ctx.emit('cancelDelete');
        await router.push('/')
      }
    }

    return {deleteUser}
  }
}
</script>

<style scoped>

</style>