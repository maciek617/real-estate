<template>
<div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="toggleActive"
    class="w-full h-52 flex flex-col items-center gap-3 border-2 border-dashed border-blue-500 mt-5 transition-all"
    :class="{'active-dropzone': active}"
>
  <span class="mt-10 text-xl">Drop files here</span>
  <span class="text-blue-500">OR</span>
  <label
      for="dropzoneFile"
      class="py-2 px-3 text-white bg-blue-500 rounded cursor-pointer transition-all hover:bg-blue-400"
      >
      Select File
  </label>
  <input type="file" id="dropzoneFile" multiple accept=".jpg, .jpeg, .png" class="dropzoneFile hidden">
  <p>Accepted formats: .jpg .jpeg .png</p>
</div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "DropZone",
  setup() {
    const active = ref(false)

    const toggleActive = () => {
      active.value = !active.value
    }

    return {active, toggleActive}
  }
}
</script>

<style scoped lang="scss">

.active-dropzone {
  color: #fff;
  border-color: cornflowerblue;
  background-color: lightskyblue;

  label {
    background-color: #fff;
    color: black;
  }
}
</style>