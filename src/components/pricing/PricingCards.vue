<template>
  <div class="flex flex-wrap justify-center">
    <div v-for="card in cardBase" :key="card.title"
         class="drop-shadow mt-10 mx-4 p-4 rounded-t-2xl bg-white w-full max-w-xs lg:mx-10">
      <p class="pt-2 text-3xl"><i :class="card.icon" class="text-blue-600 mr-3 text-2xl"></i>{{ card.title }}</p>
      <p class="text-gray-500">{{ card.sub_title }}</p>
      <p class="text-6xl my-5"><span class="text-gray-500 text-6xl">$</span>{{ changeBilling ? card.price  :
          (card.price * 0.8).toFixed(0) }}<span
            class="text-sm ml-1 text-gray-500">per
      seat/month</span>
      </p>
      <MainButton class="text-white bg-gray-900 w-full rounded mb-5">Get Started</MainButton>
      <p class="font-bold py-4">{{ card.type }}</p>
      <p v-for="benefit in card.benefits" :key="benefit" class="text-gray-500 py-2">
        <i class="fa-solid fa-check text-blue-600 mr-1"></i>
        {{ benefit }}
      </p>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "PricingCards",
  components: {MainButton},
  props: ['changeBilling'],
  setup() {
    const cardBase = ref([
      {
        title: 'Lite',
        icon: 'fa-solid fa-leaf',
        sub_title: 'Perfect to get started',
        price: 0,
        type: 'Lite includes:',
        benefits: ['CMS integration', 'Email & SMS reminders', 'Customer support 24/7']
      },
      {
        title: 'Pro',
        icon: 'fa-solid fa-robot',
        sub_title: 'Best for professionals',
        price: 19,
        type: 'Everything in Lite, plus:',
        benefits: ['Advanced analytics', '100+ integrations', 'Chat widget', 'Templates library']
      },
      {
        title: 'Ultimate',
        icon: 'fa-solid fa-bolt-lightning',
        sub_title: 'Toolset for hard players',
        price: 39,
        type: 'Everything in Pro, plus:',
        benefits: ['Daily performance reports', 'Dedicated assistant', 'Artificial intelligence',
          'Marketing tools & automations']
      },
    ]);
    return {cardBase}
  }
}
</script>

<style scoped>

</style>