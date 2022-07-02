<template>
  <table class=" w-full max-w-6xl m-auto mt-20 mb-10">
    <tr>
      <th  class="text-left pb-7 text-sm sm:text-lg">Overview</th>
      <th class="text-right pb-7 pr-4 text-sm sm:text-lg">Lite</th>
      <th class="text-right pr-4 pb-7 text-sm sm:text-lg">Pro</th>
      <th class="pb-7 text-sm sm:text-lg">Ultimate</th>
    </tr>
    <tr v-for="tr in overviewBaseTd" :key="tr" class="odd:bg-gray-50">
      <td v-for="td in tr.tr" :key="td" :class="td.css_class" class="pl-2 sm:pl-4">
        {{ td.title }}
        <i v-if="td.icon" :class="td.icon"></i>
      </td>
    </tr>
  </table>
</template>

<script>
import {ref} from "vue";

export default {
  name: "PricingOverview",
  setup() {
    const overviewBaseTd = ref([
      {
        tr: [{
          title: 'CMS integration',
          css_class: 'py-4'
        },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: 'Email & SMS reminders',
          css_class: 'py-4'
        },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: 'Customer Support 24/7',
          css_class: 'py-4'
        },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: 'Advanced analitics',
          css_class: 'py-4'
        },
          {
            css_class: 'py-4 text-right'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: '100+ integrations',
          css_class: 'py-4'
        },
          {
            css_class: 'py-4 text-right'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: 'Chat widget',
          css_class: 'py-4'
        },
          {
            css_class: 'py-4 text-right'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: 'Templates library',
          css_class: 'py-4'
        },
          {
            css_class: 'py-4 text-right'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: 'Daily performances reports',
          css_class: 'py-4'
        },
          {
            css_class: 'py-4 text-right'
          },
          {
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: 'Dedicated assistant',
          css_class: 'py-4'
        },
          {
            css_class: 'py-4 text-right'
          },
          {
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: 'Artificial intelligence (beta)',
          css_class: 'py-4'
        },
          {
            css_class: 'py-4 text-right'
          },
          {
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
      {
        tr: [{
          title: 'Marketing tools & automations',
          css_class: 'py-4'
        },
          {
            css_class: 'py-4 text-right'
          },
          {
            css_class: 'py-4 text-right pr-4'
          },
          {
            icon: 'fa-solid fa-check text-blue-600 mr-1',
            css_class: 'py-4 text-center'
          }
        ]
      },
    ])
    return { overviewBaseTd}
  }
}
</script>

<style scoped>
</style>