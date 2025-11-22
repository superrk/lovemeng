<template>
  <section id="timeline" class="py-20 px-6 md:px-12 bg-white">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 text-center">我们的时光轴</h2>
      <div class="space-y-12 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#B8860B]">
        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          ref="timelineItemsRefs"
          class="relative group"
        >
          <div class="absolute -left-10 top-1 w-6 h-6 rounded-full bg-[#B8860B] border-4 border-white shadow-md"></div>
          <div class="bg-[#F5E8C7] p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]">
            <h3 class="text-xl font-semibold mb-2">{{ item.date }}</h3>
            <p class="mb-2 text-lg">{{ item.title }}</p>
            <p class="text-gray-700">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timelineItems = ref([
  {
    date: '2025-02',
    title: '初识·软件里的一句"你好？"',
    description: '那个深夜，一条简单的消息开启了我们的故事。'
  },
  {
    date: '2025-03',
    title: '决定·告别北漂， 一路向西',
    description: '为了遇见你，我选择了来到西安。'
  },
  {
    date: '2025-04',
    title: '初见·第一次线下见面，她带我去吃烤肉',
    description: '青涩的感觉，心不自觉地开始跳动。'
  },
  {
    date: '2025-05',
    title: '相熟，争执，差点拉黑',
    description: ''
  },
    {
    date: '2025-07',
    title: '重连，深思',
    description: ''
  },
  {
    date: '2025-09',
    title: '汉中·龙头山云海里第一次想娶她',
    description: '那一瞬间，我知道你就是我要共度一生的人。'
  },
  {
    date: '2025-10',
    title: '见父母·妈妈说希望你有空就来我们家',
    description: '那一刻，我知道我有了成为这个家庭的一员的资格。'
  },
  {
    date: '2025-11',
    title: '双方父母·定亲饭，筷子一碰就是一生',
    description: '两家人围坐一桌，幸福就在这一刻定格。'
  },
  {
    date: '2025-12',
    title: '今天·我把心意写进代码里',
    description: 'if (you.sayYes()) { myLife.foreverWith(you); }'
  }
])

const timelineItemsRefs = ref([])

onMounted(() => {
  timelineItemsRefs.value.forEach((item) => {
    gsap.fromTo(item,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })
})
</script>

<style scoped>
</style>