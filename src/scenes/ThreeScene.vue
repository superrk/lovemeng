<template>
  <div ref="threeContainer" class="absolute inset-0 -z-10"></div>
</template>

<script setup lang="ts" name="ThreeScene">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const threeContainer = ref<HTMLDivElement>()
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationId: number

onMounted(() => {
  if (!threeContainer.value) return

  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5e8c7)

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  threeContainer.value.appendChild(renderer.domElement)

  // Add some basic geometry
  const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100)
  const material = new THREE.MeshBasicMaterial({ color: 0xb8860b, wireframe: true })
  const torus = new THREE.Mesh(geometry, material)
  scene.add(torus)

  // Add particles
  createParticles()

  // Animation
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    torus.rotation.x += 0.01
    torus.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()

  // Handle resize
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', handleResize)
})

const createParticles = () => {
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 1000
  const positions = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xb8860b,
    size: 0.02,
    transparent: true,
    opacity: 0.6
  })

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)
}

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
</style>