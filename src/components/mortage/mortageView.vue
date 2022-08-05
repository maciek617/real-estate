<template>
  <div class="pb-5">
    <div class="mt-10">
      <p class="text-3xl font-bold">Calculate mortgage in seconds.</p>
      <p class="text-gray-500 mt-2">Unlimited calculations for our users!</p>
    </div>

    <div class="mt-4 flex flex-col justify-center items-center lg:flex-row lg:items-start lg:justify-around">
      <div class="w-full max-w-lg p-2 rounded shadow-2xl">
        <div class="mt-4 w-full">
          <label class="block mb-2 text-sm font-medium text-blue-500">Purchase price</label>
          <p class="font-bold text-3xl">$ {{ credit }}</p>
          <input type="range" placeholder="price" min="5000" :max="maxCredit" step="1000" v-model="credit"
                 class="mb-2 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700">
          <div class="flex justify-between">
            <p>min. 5000</p>
            <p>max. {{ maxCredit }}</p>
          </div>
        </div>

        <div class="mt-4">
          <label class="block mb-2 text-sm font-medium text-blue-500">Percentage (%)</label>
          <p class="font-bold text-3xl">% {{ percent }}</p>
          <input type="range" placeholder="%" min="1" max="100" step="1" v-model="percent" class="mb-2 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700">
          <div class="flex justify-between">
            <p>min. 1</p>
            <p>max. 100</p>
          </div>
        </div>

        <div class="mt-4 w-full">
          <label class="block mb-2 text-sm font-medium text-blue-500">Repayment period</label>
          <p class="font-bold text-3xl">{{ time }}</p>
          <input type="range" min="1" max="40" placeholder="time" v-model="time" class="mb-2 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700">
          <div class="flex justify-between">
            <p>min. 1</p>
            <p>max. 40</p>
          </div>
        </div>

        <div class="mt-4">
          <label class="block mb-2 text-sm font-medium text-blue-500">Bank provision</label>
          <p class="font-bold text-3xl">% {{ provision }}</p>
          <input type="range" min="1" max="100" step="1" placeholder="provision" v-model="provision"
                 class="mb-2 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700">
          <div class="flex justify-between">
            <p>min. 1</p>
            <p>max. 100</p>
          </div>
        </div>
        <MainButton @click="calculateCredit" class="text-white bg-gray-900 mt-4">Calculate</MainButton>
      </div>

      <div class="mt-10 shadow-2xl p-2 rounded max-w-xl w-full py-5" ref="results">
        <p class="text-center font-bold text-xl">Your monthly payment will be</p>
        <p class="text-center mt-2 text-3xl font-bold text-blue-500">${{ monthlyCreditCost.toFixed(2) }}</p>

        <div class="flex justify-around mt-7">
          <div class="text-center">
            <p class="font-bold">Total credit cost</p>
            <p class="font-bold text-blue-500">${{ fullCreditCost.toFixed(2) }}</p>
          </div>
          <div class="text-center">
            <p class="font-bold">In total</p>
            <p class="font-bold text-blue-500">${{ fullCredit.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {onMounted, ref} from "vue";
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "mortageView",
  components: {MainButton},
  props: ['maxCredit'],
  setup() {
    const credit = ref(50000);
    const percent = ref(7);
    const fullCredit = ref(0);
    const fullCreditCost = ref(0)
    const time = ref(10);
    const provision = ref(8);
    const results = ref()
    const monthlyCreditCost = ref(0)


    onMounted(() => console.log('mounted'))

    const calculateCredit = () => {
      if (percent.value < 1 || provision.value < 1) return;


      const q = 1 + ((percent.value / 100) / 12);
      const q2 = Math.pow(q, time.value * 12)

      monthlyCreditCost.value = credit.value * q2 * ((q - 1) / (q2 - 1));
      fullCredit.value = (monthlyCreditCost.value * (time.value * 12)) + ((provision.value / 100) * credit.value);
      fullCreditCost.value = fullCredit.value - credit.value;

      if (window.innerWidth < 540) {
        results.value.scrollIntoView({block: "end", behavior: "smooth"})
      }
    }


    return {credit, percent, provision, time, calculateCredit, monthlyCreditCost, fullCredit, fullCreditCost, results}
  }
}
</script>

<style scoped>

</style>