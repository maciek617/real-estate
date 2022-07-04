<template>
  <div
      class="bg-white-scroll w-60 pb-4 flex flex-col items-center justify-center relative -mt-20 z-40 m-auto shadow-2xl rounded-3xl sm:flex-row sm:w-full sm:max-w-screen-sm sm:justify-evenly lg:-mt-72 lg:max-w-screen-lg">
    <div v-for="eventInfo in eventInfoBase" :key="eventInfo.title"
         class="border-b-2 py-5 sm:border-2 sm:flex sm:justify-between sm:flex-col sm:mx-2 sm:items-center sm:mt-3 sm:px-2 lg:px-8">
              <div class="flex items-center justify-center">
                <i :class="eventInfo.icon" class="mr-3"></i>
                <p class="font-bold">{{eventInfo.title}}</p>
              </div>
      <p class="text-center pt-2 text-gray-500">{{eventInfo.sub_title}}</p>
    </div>
    <MainButton class="bg-gray-900 text-white mt-4">Join in!</MainButton>
  </div>
</template>

<script>
import {ref} from "vue";
import MainButton from "@/components/buttons/MainButton";
export default {
  name: "EventDetails",
  components: {MainButton},
  setup() {
    const eventInfoBase = ref([
      {
        title: 'Location',
        sub_title: 'Warsaw',
        icon: 'fa-solid fa-location-dot'
      },
      {
        title: 'Price',
        sub_title: '$11,99',
        icon: 'fa-solid fa-money-bill-1'
      },
      {
        title: 'Date',
        sub_title: '18/11/2022',
        icon: 'fa-solid fa-calendar-days'
      }, {
        title: 'Type',
        sub_title: 'Commercial event',
        icon: 'fa-brands fa-typo3'
      },

    ])
    return {eventInfoBase}
  }
}
</script>

<style scoped>

</style>