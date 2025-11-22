<template>
  <section id="gallery" ref="gallerySection" class="py-20 px-6 md:px-12 bg-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 text-center">我们的回忆</h2>
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <div
          v-for="(photo, index) in galleryPhotos"
          :key="index"
          ref="photoItems"
          class="break-inside-avoid"
        >
          <img
            :src="photo.url"
            :alt="photo.caption"
            loading="lazy"
            class="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
          <p class="mt-2 text-center text-sm">{{ photo.caption }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import photo1 from '@/assets/wall.png'
import photo2 from '@/assets/hotpot.png'
import photo3 from '@/assets/3.jpg'
import photo4 from '@/assets/4.jpg'

gsap.registerPlugin(ScrollTrigger)

const galleryPhotos = ref([
  {
    url: photo1,
    caption: '城墙下的晃悠'
  },
  {
    url: photo2,
    caption: '第一次一起吃火锅'
  },
  {
    url: photo3,
    caption: '侧漏的霸气'
  },
  {
    url: photo4,
    caption: '漫步在云海'
  }
])

const photoItems = ref([])
const gallerySection = ref<HTMLElement>()

onMounted(() => {
  photoItems.value.forEach((item: any, index: number) => {
    gsap.fromTo(item,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })
})
</script>

<style scoped>
</style>
