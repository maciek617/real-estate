<template>
<div class="pt-20 bg-gray-50 relative min-h-vh pb-10">
  <EventsText/>
  <EventDetails/>
  <EventCompanies/>
</div>
</template>

<script>
import EventsText from "@/components/events-page/EventsText";
import EventDetails from "@/components/events-page/EventDetails";
import EventCompanies from "@/components/events-page/EventCompanies";
export default {
  name: "EventsMain",
  components: {EventsText, EventDetails, EventCompanies}
}
</script>

<style scoped>

</style>