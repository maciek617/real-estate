<template>
  <div class="mt-8 bg-white shadow rounded-2xl p-4   max-w-lg w-full">
    <p class="text-3xl font-bold mb-2">Contact Info</p>
    <p class="text-xl pt-3"><i class="fa-solid fa-user w-8"></i>{{ data.contact_details.name }}</p>
    <p class="text-xl pt-3"><i class="fa-solid fa-envelope w-8"></i><a :href="'mailto:' + data.contact_details.email">{{ data.contact_details.email }}</a></p>
    <p class="text-xl pt-3"><i class="fa-solid fa-phone w-8"></i><a :href="'tel:' + data.contact_details.phone"> {{
        data.contact_details.phone.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
            " ") }}</a></p>
    <router-link :to="{name: 'profile', params: {user: data.author.id}}"></router-link>
  </div>
</template>

<script>
export default {
  name: "ContactInfo",
  props: ['data']
}
</script>

<style scoped>

</style>