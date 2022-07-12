<template>
  <Transition>
    <div v-if="show"
         @click="scrollToTop"
         class="bg-blue-500 h-10 w-10 flex items-center justify-center rounded-xl text-white fixed bottom-5 right-5 cursor-pointer lg:w-14 lg:h-14 lg:right-10 lg:bottom-10 hover:bg-blue-600">
      <i class="fa-solid fa-angle-up"></i>
    </div>
  </Transition>
</template>

<script>
import {ref} from "vue";
import scrollToTop from "@/composables/scrollTop";
export default {
  name: "ScrollTopButon",
  setup() {
    const show = ref(false);

    window.addEventListener("scroll", () => {
      window.scrollY > 600 ? show.value = true : show.value = false;
    })

    return {show, scrollToTop}
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>