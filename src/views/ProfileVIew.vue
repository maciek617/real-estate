<template>
<h1>Profile view</h1>
  <button @click="singOutUser" class="mt-20">test</button>
</template>

<script>
import useSignout from "@/composables/useSignout";
import {useRouter} from "vue-router";

export default {
  name: "ProfileVIew",
  setup() {
    const {signout} = useSignout()
    const router = useRouter()
    const singOutUser = async () => {
      await signout()
      await router.push({name: 'home'})
    }

    return {singOutUser}
  }
}
</script>

<style scoped>

</style>