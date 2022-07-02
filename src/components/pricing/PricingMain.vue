<template>
  <div class="bg-gray-50">
    <PricingHeader/>
    <PricingChangeBilling @billingChanged="(n) => changeBilling = n"/>
    <PricingCards :changeBilling="changeBilling"/>
  </div>
    <PricingOverview/>
</template>

<script>
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingCards from "@/components/pricing/PricingCards";
import PricingChangeBilling from "@/components/pricing/PricingChangeBilling";
import PricingOverview from "@/components/pricing/PricingOverview";
import {ref} from "vue";

export default {
  name: "PricingMain",
  components: {PricingHeader, PricingCards, PricingChangeBilling, PricingOverview},
  setup() {
    const changeBilling = ref(true);
    return {changeBilling}
  }
}
</script>

<style scoped>

</style>