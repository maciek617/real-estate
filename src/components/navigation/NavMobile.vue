<template>
  <div class="nav_mobile relative lg:hidden" @click="store.state.navOpen = !store.state.navOpen">
    <i class="fa-solid fa-bars-staggered hidden text-3xl" :class="!store.state.navOpen ? 'active' : ''"></i>
    <i class="fa-solid fa-xmark hidden text-3xl" :class="store.state.navOpen  ? ['active', 'white'] : ''"></i>
  </div>
</template>

<script>
import {useStore} from "vuex";

export default {
  name: "NavMobile",
  setup() {
    const store = useStore();
    return {store}
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