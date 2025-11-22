<template>
  <div ref="lottieContainer" class="w-full h-64"></div>
</template>

<script setup lang="ts" name="LottieAnimation">
import { ref, onMounted, onUnmounted } from 'vue'
import lottie from 'lottie-web'

interface Props {
  animationData?: any
  path?: string
}

const props = withDefaults(defineProps<Props>(), {
  animationData: undefined,
  path: ''
})

const lottieContainer = ref<HTMLDivElement>()
let animation: any

onMounted(() => {
  if (!lottieContainer.value) return

  const options = props.animationData
    ? {
        container: lottieContainer.value,
        renderer: 'svg' as const,
        loop: true,
        autoplay: true,
        animationData: props.animationData
      }
    : {
        container: lottieContainer.value,
        renderer: 'svg' as const,
        loop: true,
        autoplay: true,
        path: props.path
      }

  animation = lottie.loadAnimation(options)
})

onUnmounted(() => {
  if (animation) {
    animation.destroy()
  }
})
</script>

<style scoped>
</style>