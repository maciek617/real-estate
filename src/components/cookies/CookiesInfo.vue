<template>
  <Teleport to='#modals'>
    <div
        class="modal fixed bottom-0 left-0 text-white bg-cookies w-full z-40 lg:flex lg:items-center lg:justify-center">
      <p class="text-center mr-4">We use cookies and similar technologies on our website and process your personal
        data.</p>
      <div class="flex justify-center my-4">
        <MainButton @click="$emit('accepted')" class="text-black bg-white mx-4">Accept</MainButton>
        <MainButton @click="$emit('declined')" class="text-black bg-white mx-4">Decline</MainButton>
      </div>
    </div>
  </Teleport>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "CookiesInfo",
  components: {MainButton},
  emits: ['accepted', 'declined']
}
</script>

<style scoped>

</style>