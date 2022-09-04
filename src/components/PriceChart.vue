<template>
  <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
  />
</template>

<script>
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip,  BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

export default {
  name: "PriceChart",
  components: {Bar},
  props: ['data'],
  setup(props) {
    const chartData = {
      labels: props.data.priceHistory.date,
      datasets: [
        {
          data: props.data.priceHistory.price,
          backgroundColor: '#3B72f6',
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
      }}

    }
    return {chartData, chartOptions}
  }
}
</script>

<style scoped>

</style>