<template>
  <div class="nav_mobile z-50 relative lg:hidden" @click="changeVisibility">
    <i class="fa-solid fa-bars-staggered hidden text-3xl" :class="!isActive || !isVisible ? 'active' : ''"></i>
    <i class="fa-solid fa-xmark hidden text-3xl" :class="isVisible && isActive  ? ['active', 'white'] : ''"></i>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "NavMobile",
  emits: ['show'],
  props: ['isVisible'],
  setup(props, ctx) {
    const isActive = ref(false);

    const changeVisibility = () => {
      isActive.value = !isActive.value;
      ctx.emit('show', isActive.value)
    }

    return { changeVisibility, isActive}
  }
}
</script>

<style scoped>
.white {
  color: white;
}
.active {
  display: block;
}
</style>