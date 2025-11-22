<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div class="min-h-screen w-full bg-[#F5E8C7] text-[#2F2F2F] font-sans overflow-x-hidden">
    <!-- Loading Screen -->
    <div v-if="loading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div class="text-center">
        <!-- Lottie 动画代替心跳爱心 -->
        <div class="relative mb-8">
          <LottieAnimation :animationData="heartAnimationData" class="mx-auto" />
        </div>

        <!-- 加载进度条 -->
        <div class="relative w-80 h-3 bg-white rounded-full mb-6 shadow-inner overflow-hidden">
          <div
            class="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${loadProgress}%` }"></div>
          <div
            class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse">
          </div>
        </div>

        <!-- 加载文字 -->
        <div class="mb-4">
          <p class="text-2xl font-bold text-gray-700 mb-2 animate-fade-in">猜猜会有些什么...</p>
          <p class="text-lg text-gray-500 animate-pulse">{{ loadProgress }}%</p>
        </div>

        <!-- 加载提示 -->
        <div class="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <i class="fas fa-magic animate-spin"></i>
          <span>只需片刻...</span>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 lg:pb-0">
      <img src="https://ai-public.mastergo.com/ai/img_res/9e1b8d7c4fa890279340df0482e3ac32.jpg" alt="Xi'an City Wall"
        class="absolute inset-0 w-full h-full object-cover object-center lg:object-top transition-all duration-1000">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>

      <!-- 浮动装饰元素 - 移动端优化位置 -->
      <div class="absolute top-16 left-8 lg:top-20 lg:left-20 opacity-30">
        <div class="w-3 h-3 lg:w-4 lg:h-4 bg-pink-400 rounded-full animate-ping"></div>
      </div>
      <div class="absolute top-24 right-12 lg:top-40 lg:right-32 opacity-20">
        <div class="w-4 h-4 lg:w-6 lg:h-6 bg-purple-400 rounded-full animate-pulse"></div>
      </div>
      <div class="absolute bottom-24 left-1/3 lg:bottom-32 lg:left-1/4 opacity-25">
        <div class="w-2 h-2 lg:w-3 lg:h-3 bg-indigo-400 rounded-full animate-bounce"></div>
      </div>

      <div
        class="relative z-10 text-center px-4 lg:px-8 py-8 lg:py-12 bg-white/90 lg:bg-white/80 backdrop-blur-md max-w-4xl mx-4 lg:mx-auto rounded-2xl shadow-2xl animate-scale-in">
        <div class="mb-4 lg:mb-6">
          <i class="fas fa-heart text-red-400 text-3xl lg:text-4xl animate-pulse"></i>
        </div>
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold mb-6 lg:mb-8 leading-tight tracking-wide text-gray-800 animate-fade-in px-2">
          <span class="text-pink-600 block lg:inline">若非天地有情</span><br>
          <span class="text-purple-600 block lg:inline">怎能相逢长安</span><br>
          <span class="text-indigo-600 block lg:inline">三千繁华落尽</span><br>
          <span class="text-gray-700">只为一人守心</span><br>
          <span class="text-red-500">余生共婵娟</span>
        </h1>
        <p class="text-lg lg:text-xl xl:text-2xl italic text-gray-600 mb-6 lg:mb-8 animate-slide-up px-2">— 与子成说，执子之手
        </p>

        <!-- 滚动提示 - 移动端优化 -->
        <div class="scroll-hint text-gray-500 lg:mt-0">
          <i class="fas fa-chevron-down text-xl lg:text-2xl mb-1 lg:mb-2 block animate-bounce"></i>
          <span class="text-xs lg:text-sm">向下滚动开始我们的故事</span>
        </div>
      </div>
    </section>

    <!-- Desktop Navigation Sidebar -->
    <aside class="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-40 hidden lg:block">
      <div v-for="(nav, index) in navigation" :key="index" class="group relative">
        <a :href="nav.id"
          class="block w-3 h-3 rounded-full bg-[#B8860B] hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 transition-all duration-300 hover:scale-125 hover:shadow-lg"
          @mouseenter="showNavTooltip(nav.name)" @mouseleave="hideNavTooltip"></a>
        <!-- 导航提示 -->
        <div v-show="activeNavTooltip === nav.name"
          class="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {{ nav.name }}
          <div class="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black">
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 lg:hidden z-40">
      <div class="flex justify-around items-center py-2 px-4">
        <a v-for="(nav, index) in navigation.slice(0, 5)" :key="index" :href="nav.id"
          class="flex flex-col items-center p-2 text-xs text-gray-600 hover:text-pink-500 transition-colors">
          <i :class="nav.icon" class="text-lg mb-1"></i>
          <span>{{ nav.mobileName }}</span>
        </a>
      </div>
    </nav>

    <!-- Timeline Section -->
    <Timeline />

    <!-- Map Section - 移动端优化 -->
    <section id="map"
      class="py-16 lg:py-20 px-4 lg:px-6 xl:px-12 bg-gradient-to-br from-[#F5E8C7] to-[#FFE4B5] relative overflow-hidden">
      <!-- 背景装饰 - 移动端优化 -->
      <div
        class="absolute top-8 left-8 lg:top-10 lg:left-10 w-16 h-16 lg:w-20 lg:h-20 bg-pink-200 rounded-full opacity-20 animate-pulse">
      </div>
      <div
        class="absolute bottom-16 right-16 lg:bottom-20 lg:right-20 w-24 h-24 lg:w-32 lg:h-32 bg-purple-200 rounded-full opacity-15 animate-bounce">
      </div>

      <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-12 lg:mb-16 animate-fade-in px-4">
          <h2 class="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">🗺️ 城南烟柳，城北烟花</h2>
          <p class="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
            长安十二时辰，我们于此相遇；古都三千岁，我们在此相守。每一条街道，都镌刻着我们的誓言</p>
        </div>

        <div
          class="bg-white rounded-2xl shadow-2xl overflow-hidden h-[400px] lg:h-[500px] relative card-hover group mx-2 lg:mx-0">
          <!-- 高德地图组件 -->
          <MapComponent />

          <!-- 地图覆盖层 - 移动端触摸友好 -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 lg:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div class="absolute bottom-3 left-3 right-3 lg:bottom-4 lg:left-4 lg:right-4">
              <p class="text-white text-center font-semibold text-sm lg:text-base px-2">
                💕 点击查看我们一起走过的每一个地方，每一个角落都充满了我们的回忆
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <Gallery />

    <!-- Love Letter Section - 移动端优化 -->
    <section id="love-letter"
      class="py-16 lg:py-20 px-4 lg:px-6 xl:px-12 bg-gradient-to-br from-[#FFE4E1] to-[#FFF0F5] relative overflow-hidden">
      <!-- 背景装饰爱心 - 移动端优化 -->
      <div class="absolute top-8 right-8 lg:top-10 lg:right-10 text-pink-200 text-4xl lg:text-6xl animate-pulse">
        <i class="fas fa-heart"></i>
      </div>
      <div class="absolute bottom-8 left-8 lg:bottom-10 lg:left-10 text-red-200 text-3xl lg:text-4xl animate-bounce">
        <i class="fas fa-heart"></i>
      </div>

      <div class="max-w-4xl mx-auto relative z-10">
        <div class="text-center mb-12 lg:mb-16 animate-fade-in px-4">
          <h2 class="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">💌 云中谁寄锦书来</h2>
          <p class="text-base lg:text-lg text-gray-600 leading-relaxed italic">花开堪折直须折，莫待无花空折枝。每一字，每一句，都是我对你的深情告白</p>
        </div>

        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 xl:p-12 card-hover mx-2 lg:mx-0">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center">
              <i class="fas fa-envelope-heart text-red-400 mr-2 lg:mr-3 text-xl lg:text-2xl"></i>
              致最爱的你
            </h3>
            <button @click="readLoveLetter" :disabled="isReading"
              class="btn-hover bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full hover:shadow-lg transition-all duration-300 text-sm lg:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
              <i class="fas fa-volume-up mr-2" :class="{ 'animate-pulse': isReading }"></i>
              {{ isReading ? '朗读中...' : '朗读给我听' }}
            </button>
          </div>

          <div class="prose max-w-none text-gray-700 leading-relaxed">
            <p class="mb-4 lg:mb-6 text-fade-in text-base lg:text-base">在傍晚的风里，我把所有温柔攒成一句低语，悄悄递到你的耳畔</p>

            <p class="mb-4 lg:mb-6 text-fade-in text-base lg:text-base" style="animation-delay: 0.2s">
              从第一缕晨光吻上你睫毛，到最后一朵暮色落在你肩头，我愿做你掌心里那枚不会融化的雪，做你夜路上那盏不肯熄灭的灯
            </p>

            <p class="mb-4 lg:mb-6 text-fade-in italic text-gray-600 text-sm lg:text-base"
              style="animation-delay: 0.4s">
              愿得一心人，白首不相离。无论是春花秋月，还是夏雨冬雪，都愿与你携手同行，共赏这人间的四季轮回。
            </p>

            <div class="text-right mt-8 lg:mt-12 text-fade-in" style="animation-delay: 0.8s">
              <p class="text-base lg:text-lg font-semibold text-gray-800 italic">此生此世，唯你而已。</p>
              <div class="mt-3 lg:mt-4 flex justify-end">
                <div class="flex space-x-1 lg:space-x-2">
                  <span class="text-red-400 text-lg lg:text-xl">❦</span>
                  <span class="text-pink-400 text-lg lg:text-xl">❦</span>
                  <span class="text-purple-400 text-lg lg:text-xl">❦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Future Plan Section - 移动端优化 -->
    <section id="future"
      class="py-16 lg:py-20 px-4 lg:px-6 xl:px-12 bg-gradient-to-br from-white via-pink-50 to-purple-50 relative overflow-hidden">
      <!-- 背景装饰 - 移动端优化 -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div
          class="absolute top-16 left-8 lg:top-20 lg:left-20 w-12 h-12 lg:w-16 lg:h-16 bg-yellow-200 rounded-full opacity-20 animate-ping">
        </div>
        <div
          class="absolute bottom-16 right-8 lg:bottom-20 lg:right-20 w-16 h-16 lg:w-24 lg:h-24 bg-blue-200 rounded-full opacity-15 animate-pulse">
        </div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 lg:w-32 lg:h-32 bg-green-200 rounded-full opacity-10 animate-bounce">
        </div>
      </div>

      <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-12 lg:mb-16 animate-fade-in px-4">
          <h2 class="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">🌈 明日何其多，良辰美景奈何天</h2>
          <p class="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
            共赏春花秋月，同享夏雨冬雪。愿每一个明天，都是我们携手创造的诗篇</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="space-y-6 lg:space-y-8">
            <div v-for="(plan, index) in futurePlans" :key="index"
              class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg card-hover text-fade-in mx-2 lg:mx-0"
              :style="{ animationDelay: `${index * 0.2}s` }">
              <div class="flex items-start">
                <div class="mr-3 lg:mr-4 mt-1 text-2xl lg:text-3xl animate-bounce">
                  {{ plan.emoji }}
                </div>
                <div class="flex-1">
                  <h3 class="text-xl lg:text-2xl font-bold mb-2 text-gray-800">{{ plan.year }}</h3>
                  <p class="text-base lg:text-lg font-semibold text-gray-700 mb-2 lg:mb-3">{{ plan.event }}</p>
                  <p class="text-sm lg:text-base text-gray-600 leading-relaxed">{{ plan.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-2xl p-6 lg:p-8 h-80 lg:h-96 flex items-center justify-center card-hover group relative overflow-hidden mx-2 lg:mx-0">
            <img src="https://ai-public.mastergo.com/ai/img_res/34220825707f77f7e2204d458141a2a9.jpg"
              alt="Future Wedding"
              class="rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500 w-full h-full object-cover">

            <!-- 悬停覆盖层 - 移动端触摸友好 -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 lg:pb-6">
              <p class="text-white text-center font-semibold text-sm lg:text-base px-2">
                💍 我们的幸福时刻<br>
                <span class="text-xs lg:text-sm opacity-90">期待与你共度每一个重要时刻</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Proposal Section -->
    <Proposal />
    <audio ref="audioPlayer" :src="aixia" preload="auto"></audio>
    <!-- Footer -->
    <footer class="py-16 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 text-pink-300 text-6xl animate-pulse">
          <i class="fas fa-heart"></i>
        </div>
        <div class="absolute bottom-10 right-10 text-purple-300 text-4xl animate-bounce">
          <i class="fas fa-star"></i>
        </div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 text-8xl opacity-5 animate-spin"
          style="animation-duration: 20s;">
          <i class="fas fa-ring"></i>
        </div>
      </div>

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="mb-8 animate-fade-in">
          <h3 class="text-2xl font-bold mb-4 italic">🎉 此情不渝，永浴爱河</h3>
          <p class="text-lg text-gray-300 leading-relaxed italic">
            人生若只如初见，最美人间四月天。感谢你与我相遇，愿我们的爱情如诗如画，永不褪色。
          </p>
        </div>

        <div class="border-t border-gray-700 pt-8 mt-8">
          <p class="text-xl font-semibold mb-4 animate-slide-up italic">
            © 2025 <span class="text-pink-400">执子之手，与子偕老</span> · 我萌终将幸福
          </p>
          <p class="text-gray-400 mb-6 animate-slide-up italic" style="animation-delay: 0.2s">
            Crafted with <span class="text-red-400 animate-pulse">❦</span> for eternity
          </p>
        </div>

        <!-- 底部装饰 -->
        <div class="mt-8 flex justify-center space-x-4 text-gray-500 text-sm">
          <span class="animate-pulse">✨</span>
          <span class="animate-pulse" style="animation-delay: 0.5s">💫</span>
          <span class="animate-pulse" style="animation-delay: 1s">🌟</span>
        </div>
      </div>
    </footer>
  </div>
</template>


<script setup lang="ts" name="MainPage">
import { ref, onMounted, onUnmounted } from 'vue'
import confetti from 'canvas-confetti'
// Import components
import Timeline from './Timeline.vue'
import Gallery from './Gallery.vue'
import Proposal from './Proposal.vue'
import LottieAnimation from './LottieAnimation.vue'
import MapComponent from './MapComponent.vue'
import aixia from '@/assets/爱夏.mp3'
import letter from '@/assets/letter.mp3'
import '../styles/main.css'

const heartAnimationData = {
  "v": "5.5.7",
  "fr": 29.9700012207031,
  "ip": 0,
  "op": 60.0000024438501,
  "w": 500,
  "h": 500,
  "nm": "心跳",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "心形",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [250, 250, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": {
          "a": 1,
          "k": [
            { "i": { "x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833] }, "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] }, "t": 0, "s": [100, 100, 100] },
            { "i": { "x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833] }, "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] }, "t": 15, "s": [120, 120, 100] },
            { "i": { "x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833] }, "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] }, "t": 30, "s": [100, 100, 100] },
            { "t": 60.0000024438501, "s": [100, 100, 100] }
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ind": 0,
              "ty": "sh",
              "ix": 1,
              "ks": {
                "a": 0,
                "k": {
                  "i": [[0, -50], [50, 0], [0, 50], [-50, 0]],
                  "o": [[50, 0], [0, 50], [-50, 0], [0, -50]],
                  "v": [[0, -100], [100, 0], [0, 100], [-100, 0]],
                  "c": true
                }
              },
              "nm": "爱心路径"
            },
            {
              "ty": "fl",
              "c": { "a": 0, "k": [1, 0.2, 0.4, 1] },
              "o": { "a": 0, "k": 100 },
              "r": 1,
              "bm": 0,
              "nm": "填充 1"
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0], "ix": 2 },
              "a": { "a": 0, "k": [0, 0], "ix": 1 },
              "s": { "a": 0, "k": [100, 100], "ix": 3 },
              "r": { "a": 0, "k": 0, "ix": 6 },
              "o": { "a": 0, "k": 100, "ix": 7 },
              "sk": { "a": 0, "k": 0, "ix": 4 },
              "sa": { "a": 0, "k": 0, "ix": 5 },
              "nm": "变换"
            }
          ],
          "nm": "爱心",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 1,
          "mn": "ADBE Vector Group",
          "hd": false
        }
      ],
      "ip": 0,
      "op": 60.0000024438501,
      "st": 0,
      "bm": 0
    }
  ],
  "markers": []
}

// Loading state
const loading = ref(true)
const loadProgress = ref(0)
const activeNavTooltip = ref('')
const isReading = ref(false)

// Auto scroll state
const isAutoScrolling = ref(false)
const scrollInterval = ref<number | null>(null)
const pressedKeys = ref<Set<string>>(new Set())
const audioPlayer = ref<HTMLAudioElement>()

// Navigation data
const navigation = [
  { id: '#timeline', name: '时光轴', mobileName: '时光', icon: 'fas fa-clock' },
  { id: '#map', name: '足迹地图', mobileName: '足迹', icon: 'fas fa-map-marker-alt' },
  { id: '#gallery', name: '相册时光', mobileName: '相册', icon: 'fas fa-images' },
  { id: '#love-letter', name: '情书时光', mobileName: '情书', icon: 'fas fa-envelope' },
  { id: '#future', name: '未来规划', mobileName: '未来', icon: 'fas fa-heart' },
  { id: '#proposal', name: '求婚时光', mobileName: '求婚', icon: 'fas fa-ring' }
]

// Future plans with enhanced content
const futurePlans = [
  {
    year: '2025',
    event: '结发为夫妻，白首偕老',
    emoji: '💍',
    description: '烛影摇红，愿与君共度一生。以温柔相待岁月，以平静守护长年。'
  },
  {
    year: '2026',
    event: '有爱满家',
    emoji: '🐾',
    description: '共筑归巢，相伴相依。晨昏有笑语，平常日子也自成诗。'
  },
  {
    year: '2027',
    event: '家有小语，庭满欢声',
    emoji: '👶',
    description: '与子有诗，家有故事。'
  },
  {
    year: '2027',
    event: '携手远行，观山阅水',
    emoji: '🏞️',
    description: '踏遍青山，共看云卷云舒。千里之外，仍是你我心安之处。'
  }
]

// Navigation tooltip functions
const showNavTooltip = (name: string) => {
  activeNavTooltip.value = name
}

const hideNavTooltip = () => {
  activeNavTooltip.value = ''
}

// Read love letter function
const readLoveLetter = () => {
  if (isReading.value) return

  isReading.value = true

  const audio = new Audio(letter)
  audio.volume = 0.8

  audio.onended = () => {
    isReading.value = false
  }

  audio.onerror = () => {
    isReading.value = false
  }

  audio.play().catch(() => {
    isReading.value = false
  })
}

// Auto scroll functions
const startAutoScroll = () => {
  if (isAutoScrolling.value) return
  audioPlayer.value?.play().catch(console.error)
  isAutoScrolling.value = true
  scrollInterval.value = setInterval(() => {
    window.scrollBy(0, 5) // Scroll down by 5 pixels every 50ms for faster scrolling
  }, 50)
}

const stopAutoScroll = () => {
  if (!isAutoScrolling.value) return
  isAutoScrolling.value = false
  audioPlayer.value?.pause()
  if (scrollInterval.value) {
    clearInterval(scrollInterval.value)
    scrollInterval.value = null
  }
}

// Keyboard event handlers
const handleKeyDown = (event: KeyboardEvent) => {
  // Convert to lowercase for case-insensitive matching
  const key = event.key.toLowerCase()
  pressedKeys.value.add(key)

  // Check for L+M combination to start scrolling
  if (pressedKeys.value.has('l') && pressedKeys.value.has('m')) {
    event.preventDefault()
    startAutoScroll()
    return
  }

  // Check for R+K combination to stop scrolling
  if (pressedKeys.value.has('r') && pressedKeys.value.has('k')) {
    event.preventDefault()
    stopAutoScroll()
    return
  }
}

const handleKeyUp = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase()
  pressedKeys.value.delete(key)
}

// Simulate loading progress with enhanced animation
onMounted(() => {
  const interval = setInterval(() => {
    if (loadProgress.value < 100) {
      loadProgress.value += Math.random() * 15 + 5; // Random progress for more natural feel
      loadProgress.value = parseFloat(loadProgress.value.toFixed(2)); // Keep only 2 decimal places
      if (loadProgress.value > 100) loadProgress.value = 100;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        loading.value = false;
        // Trigger confetti when loading completes
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 800);
    }
  }, 150);

  // Add keyboard event listeners for auto scroll
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
})

// Cleanup on component unmount
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
  stopAutoScroll();
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

body {
  font-family: 'Noto Serif SC', serif;
}

h1, h2, h3, h4 {
  font-family: 'Zhi Mang Xing', cursive;
}

.rounded-button {
  border-radius: 50px !important;
}

/* 加载动画样式 */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.5s ease-out;
}

/* 滚动提示 */
.scroll-hint {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* 按钮悬停效果 - 移动端触摸优化 */
.btn-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.btn-hover:hover,
.btn-hover:active {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 移动端触摸反馈 */
@media (hover: none) and (pointer: coarse) {
  .btn-hover:active {
    transform: scale(0.95);
    transition-duration: 0.1s;
  }
}

/* 卡片悬停效果 - 移动端触摸优化 */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover,
.card-hover:active {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* 移动端触摸反馈 */
@media (hover: none) and (pointer: coarse) {
  .card-hover:active {
    transform: scale(0.98);
    transition-duration: 0.1s;
  }
}

/* 文本渐现效果 */
.text-fade-in {
  animation: fade-in 0.8s ease-out both;
}
</style>