<template>
  <div class="flex items-center justify-center mt-10">
    <p class="pr-5 text-2xl" :class="active ? 'text-gray-500' : 'text-black' ">Monthly</p>
    <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" value="" id="default-toggle" class="sr-only peer" v-model="active"
             @click="$emit('billingChanged', active)">
      <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:bg- rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
    <p class="pl-5 text-2xl relative" :class="active ? 'text-black' : 'text-gray-500'">Yearly <span
        class="bg-cyan-200 text-sm px-2 rounded-2xl absolute top-full right-0 mt-1">-20%</span></p>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "PricingChangeBilling",
  emits: ['billingChanged'],
  setup() {
    const active = ref(null)

    return {active}
  }
}
</script>

<style scoped>

</style>