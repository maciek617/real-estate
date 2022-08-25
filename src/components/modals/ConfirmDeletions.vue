<template>
  <Teleport to="#modals">
    <div class="fixed h-vh top-0 left-0 z-50 bg-modal w-full flex items-center justify-center" @click="closeWhenClickOutside">
      <div class="bg-blue-50 mx-4 rounded-2xl p-4 shadow-2xl relative max-w-2xl">
        <slot></slot>
        <div class="flex justify-around mt-4">
          <MainButton class="bg-gray-900 text-white" @click="$emit('deleteCancel')">No, I'll keep it</MainButton>
          <MainButton class="bg-gray-900 text-white" @click="$emit('deleteSuccess')">Yes, im sure</MainButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "ConfirmDeletions",
  components: {MainButton},
  emits: ['deleteCancel', 'deleteSuccess'],
  setup(props, ctx) {
    const closeWhenClickOutside = (e) => {
      if (e.target.classList.contains('fixed')) {
        ctx.emit('deleteCancel');
      }
    }

    window.addEventListener('keyup', (e) => {
      e.key === "Escape" ? ctx.emit('deleteCancel') : null
    });

    return {closeWhenClickOutside}
  }
}
</script>

<style scoped>

</style>