<template>
  <Teleport to='#modals'>
    <Transition name="slide-fade">
      <div class="fixed z-40 top-24 right-1 text-white p-2 rounded-t-2xl shadow-2xl w-full max-w-filterVw pb-7 lg:max-w-sm" :class="failed ? 'bg-red-500' : 'bg-success'" v-if="store.state.showToastModal">
        <i class="fa-regular fa-comments text-5xl absolute -top-4 -left-2 shadow-black text-blue-600"></i>
        <i class="fa-solid fa-xmark absolute top-3 right-5 text-2xl cursor-pointer text-blue-600 hover:rotate-90 transition" @click="closeModal"></i>
        <div class="py-2 px-1 mt-5">
          <slot></slot>
        </div>
        <div class="bg-gray-50 h-3 w-full absolute left-0 bottom-0" :class="store.state.showToastModal ? 'animate' : ''"></div>
      </div>
    </Transition>
  </Teleport>
</template>
<script>
import {useStore} from 'vuex'
import {watch} from 'vue'
import {useRoute} from "vue-router";

export default {
  name: "ToastModal",
  props: ['failed'],
  setup() {
    const store = useStore();
    const route = useRoute();

    watch(
        () => route.path,
        () => {
          store.commit('stopTimer');
        }
    )
    return {
      closeModal: () => {
        store.commit('stopTimer');
      }, store
    }
  }
}
</script>

<style scoped>
.animate {
  animation: animate 10s;
}

@keyframes animate {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>