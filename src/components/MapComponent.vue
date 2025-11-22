<template>
  <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const mapContainer = ref<HTMLDivElement>()
let map: any = null

const AMap_KEY = '65bcdcb4ac214576abc7edea39b999e8'

// 时间轴地点数据 - 按时间顺序
const timelineLocations = [
  {
    title: '西安城墙',
    position: [108.948024, 34.263161]
  },
  {
    title: '熙地港',
    position: [108.9509, 34.2328]
  },
  {
    title: '太奥广场',
    position: [108.895068,34.282626]
  },
  {
    title: '世博园',
    position: [109.061160,34.322669]
  },
  {
    title: '恒大都市广场，我住的地方，嘿嘿',
    position: [108.795321,34.305530],
  },
  {
    title: '龙头山 有空再爬山',
    position: [107.544404,32.515599]
  },
  {
    title: '你家',
    position: [108.8700, 34.2700]
  },
  {
    title: '光雾山巴拉巴拉',
    position: [106.823917,32.680006],
  },
  {
    title: '我家乡',
    position: [113.604488,37.800283],
  },
  {
    title: '大同',
    position: [113.366749,40.097110],
  }
]

onMounted(async () => {
  try {
    // 加载高德地图
    const AMap = await AMapLoader.load({
      key: AMap_KEY,
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.MapType']
    })

    // 创建地图实例 - 调整中心点和缩放级别以显示所有地点
    map = new AMap.Map(mapContainer.value, {
      zoom: 10, // 缩放级别调整以显示更多区域
      center: [108.95, 34.27], // 西安市中心
      viewMode: '2D', // 2D视图
      lang: 'zh_cn' // 中文
    })

    // 添加控件
    map.addControl(new AMap.Scale()) // 比例尺
    map.addControl(new AMap.ToolBar()) // 工具条
    map.addControl(new AMap.MapType()) // 地图类型切换

    // 存储所有标记点
    const markers: any[] = []
    let currentInfoWindow: any = null

    // 添加所有时间轴地点标记点
    timelineLocations.forEach((location, index) => {
      const marker = new AMap.Marker({
        position: location.position,
        title: location.title,
        label: {
          offset: new AMap.Pixel(0, -20)
        },
        extData: { index }
      })

      markers.push(marker)
      map.add(marker)

      // 创建信息窗口
      const infoWindow = new AMap.InfoWindow({
        content: `
          <div class="p-3 max-w-sm">
            <div class="flex items-center mb-2">
              <h4 class="font-bold text-gray-800 text-lg">${location.title}</h4>
            </div>
          </div>
        `,
        offset: new AMap.Pixel(0, -30),
        closeWhenClickMap: true
      })

      // 点击标记显示信息窗口
      marker.on('click', () => {
        if (currentInfoWindow) {
          currentInfoWindow.close()
        }
        infoWindow.open(map, marker.getPosition())
        currentInfoWindow = infoWindow
      })
    })

    console.log('高德地图加载成功，显示', markers.length, '个地点')
  } catch (error) {
    console.error('高德地图加载失败:', error)
  }
})

onUnmounted(() => {
  if (map) {
    map.destroy()
  }
})
</script>

<style scoped>
/* 高德地图样式 */
.amap-container {
  width: 100%;
  height: 100%;
}

/* 自定义信息窗口样式 */
.amap-info-content {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>