<template>
  <button
      class="outline-0 border-0 bg-black color text-white px-3.5 py-2 cursor-pointer hover:bg-gray-600 transition-all delay-50 ease-in-out">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MainButton"
}
</script>