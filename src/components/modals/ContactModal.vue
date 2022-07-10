<template>
  <Teleport to="body">
    <div class="fixed h-vh top-0 left-0 z-50 bg-modal w-full flex items-center justify-center">
      <div class="bg-blue-50 mx-4 rounded-2xl p-4 shadow-2xl relative max-w-2xl">
        <i class="fa-solid fa-paper-plane text-center w-full text-6xl text-blue-500"></i>
        <h1 class="text-2xl text-center mt-4">Thanks, <span class="font-bold">{{name}}</span></h1>
        <p class="text-center mt-4">Your message has been sent. We are super excited to start working with you soon.
          Expect a reply
          within the
          next 24 hours.</p>
        <p class="text-center mt-5 italic">~ FindState Team</p>
        <i class="fa-solid fa-xmark absolute right-5 top-5 text-4xl cursor-pointer" @click="$emit('closeModal')"></i>
      </div>
      {{name}}
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "ContactModal",
  props: ['name'],
  emits: ['closeModal']
}
</script>

<style scoped>

</style>