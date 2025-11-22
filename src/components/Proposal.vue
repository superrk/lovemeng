<template>
  <section id="proposal" class="py-16 lg:py-20 px-4 lg:px-6 xl:px-12 bg-gradient-to-br from-[#FFE4E1] via-[#FFF0F5] to-[#F0E68C] relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0">
      <div class="absolute top-10 left-10 text-pink-300 text-6xl animate-bounce">
        <i class="fas fa-heart"></i>
      </div>
      <div class="absolute top-20 right-20 text-purple-300 text-4xl animate-pulse">
        <i class="fas fa-ring"></i>
      </div>
      <div class="absolute bottom-20 left-1/4 text-red-300 text-5xl animate-ping">
        <i class="fas fa-gem"></i>
      </div>
      <div class="absolute bottom-10 right-10 text-yellow-300 text-3xl animate-spin">
        <i class="fas fa-star"></i>
      </div>
    </div>

    <div class="max-w-4xl mx-auto text-center relative z-10 px-4">
      <!-- 标题区域 - 移动端优化 -->
      <div class="mb-8 lg:mb-12 animate-fade-in">
        <div class="mb-4 lg:mb-6">
          <i class="fas fa-heart text-red-400 text-4xl lg:text-6xl animate-pulse"></i>
        </div>
        <h2 class="text-3xl lg:text-5xl xl:text-6xl font-bold mb-3 lg:mb-4 text-gray-800 animate-slide-up italic">
          💍 执子之手，与子偕老
        </h2>
        <p class="text-base lg:text-xl text-gray-600 animate-slide-up leading-relaxed px-2 italic" style="animation-delay: 0.2s">
          两情若是久长时，又岂在朝朝暮暮。
        </p>
      </div>

      <!-- 求婚戒指展示 - 移动端优化 -->
      <div class="mb-8 lg:mb-12 animate-scale-in">
        <div class="relative inline-block">
          <div class="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-3 lg:mb-4 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
            <div class="absolute inset-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div>
            <i class="fas fa-ring absolute inset-0 text-white text-2xl lg:text-3xl flex items-center justify-center animate-spin" style="animation-duration: 3s;"></i>
          </div>
          <div class="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-4 h-4 lg:w-6 lg:h-6 bg-pink-400 rounded-full animate-ping"></div>
        </div>
        <p class="text-sm lg:text-lg text-gray-500 italic">为你准备的婚戒，代表着永恒的承诺</p>
      </div>

      <!-- 按钮区域 - 移动端优化 -->
      <div class="flex flex-col justify-center items-center space-y-3 lg:space-y-0 lg:flex-row lg:space-x-6 animate-slide-up px-4" style="animation-delay: 0.4s">
        <button
          @click="handleProposal(true)"
          class="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden w-full max-w-xs"
        >
          <span class="relative z-10 flex items-center justify-center text-sm lg:text-base">
            <i class="fas fa-heart mr-2 group-hover:animate-pulse"></i>
            嫁！
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <button
          @click="handleProposal(true)"
          class="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden w-full max-w-xs"
        >
          <span class="relative z-10 flex items-center justify-center text-sm lg:text-base">
            <i class="fas fa-ring mr-2 group-hover:animate-spin"></i>
            当然义无反顾
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <button
          @click="handleProposal(true)"
          class="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden w-full max-w-xs"
        >
          <span class="relative z-10 flex items-center justify-center text-sm lg:text-base">
            <i class="fas fa-calendar-check mr-2 group-hover:animate-bounce"></i>
            去领证
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      <!-- 额外提示 - 移动端优化 -->
      <div class="mt-6 lg:mt-8 text-gray-500 animate-fade-in px-4" style="animation-delay: 0.6s">
        <p class="text-xs lg:text-sm leading-relaxed">💕 点击任何一个按钮，都代表你愿意和我共度余生 💕</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'
import html2canvas from 'html2canvas'

const handleProposal = async (accepted: boolean) => {
  if (accepted) {
    // 多重烟花效果
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    })

    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    })

    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    })

    // 彩色心形粒子
    setTimeout(() => {
      confetti({
        particleCount: 50,
        shapes: ['heart'],
        colors: ['#ff69b4', '#ff1493', '#dc143c', '#ff0000'],
        origin: { y: 0.4 }
      })
    }, 500)

    // 生成海报
    setTimeout(() => {
      generatePoster()
    }, 2000)

    // 显示成功消息
    showSuccessMessage()
  }
}

// 显示成功消息
const showSuccessMessage = () => {
  const message = document.createElement('div')
  message.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-2xl p-8 text-center max-w-md mx-4 animate-scale-in">
        <div class="text-6xl mb-4 animate-bounce">🎉</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">太棒了！你答应了！</h3>
        <p class="text-gray-600 mb-6">我们的幸福之旅即将开始，让我们一起创造属于我们的美好未来！</p>
        <div class="flex justify-center space-x-2 text-2xl">
          <span class="animate-pulse">💕</span>
          <span class="animate-pulse" style="animation-delay: 0.2s">💍</span>
          <span class="animate-pulse" style="animation-delay: 0.4s">👰‍♀️</span>
          <span class="animate-pulse" style="animation-delay: 0.6s">🤵‍♂️</span>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(message)

  // 3秒后自动移除
  setTimeout(() => {
    message.remove()
  }, 4000)
}

const generatePoster = async () => {
  const element = document.body
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#F5E8C7'
  })

  const link = document.createElement('a')
  link.download = 'wedding-proposal.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}

onMounted(() => {
  // Three.js 简单场景
  initThreeScene()
})

const initThreeScene = () => {
  // 这里可以添加 Three.js 场景
  console.log('Three.js scene initialized')
}
</script>

<style scoped>
</style>