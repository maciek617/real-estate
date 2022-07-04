<template>
  <div class="w-full max-w-screen-2xl mt-14 m-auto px-4 lg:flex lg:justify-between">
    <div>
      <p class="text-cyan-400 font-bold uppercase">Experience more</p>
      <h1 class="text-3xl font-bold max-w-2xl sm:text-4xl lg:text-5xl xl:text-6xl">The cheapest tickets on the internet,
        period.</h1>
      <p class="mt-4 text-sm sm:text-lg max-w-xl">Zero hidden service fees, price match guarantee, group discount and
        more. Because it <span class="font-bold italic">should</span> be this easy.</p>
    </div>
    <img :src="require('../../assets/random/event.jpg')" alt="event img"
         class="block h-mobile m-auto mt-4  sm:h-tablet lg:w-1/2 lg:h-desktop object-cover rounded-t-full shadow-2xl">
  </div>
</template>

<script>
export default {
  name: "EventsText"
}
</script>

<style scoped>

</style>