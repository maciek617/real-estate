<template>
    <div class="flex justify-around w-full flex-col sm:flex-row">
      <div class="mt-8 bg-white shadow rounded-2xl p-4 max-w-lg w-full">
        <p class="text-3xl font-bold mb-4">Additional information</p>
        <p class="text-xl italic"><i class="fa-solid fa-house-chimney-window w-8"></i>Balcony:
          <span class="not-italic font-bold ml-2 underline">{{ !data.additional_info.balcony ? 'No' : 'Yes' }}</span></p>
        <p class="text-xl italic"><i class="fa-solid fa-building-wheat w-8"></i>Garden: <span class="not-italic font-bold ml-2 underline">{{ !data.additional_info.garden ? 'No' : 'Yes' }}</span></p>
        <p class="text-xl italic"><i class="fa-solid fa-square-parking w-8"></i>Parking space: <span class="not-italic font-bold ml-2 underline">{{ !data.additional_info.parking ? 'No' : 'Yes'
          }}</span></p>
        <p class="text-xl italic"><i class="fa-solid fa-house-lock w-8"></i>State: <span class="not-italic font-bold ml-2 underline">{{ data.quality }}</span></p>
      </div>
    </div>
</template>

<script>
export default {
  name: "AdditionalInfo",
  props: ['data']
}
</script>

<style scoped>

</style>