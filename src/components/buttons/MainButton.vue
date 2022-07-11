<template>
  <button
      class="outline-0 px-3.5 py-2 cursor-pointer hover:bg-gray-600 hover:text-white transition-all delay-50 ease-in-out">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MainButton"
}
</script>