import { createApp } from 'vue'
import App from './App.vue'

// Import Tailwind (and other global styles) so PostCSS processes the @tailwind directives
import './styles/main.css'

createApp(App).mount('#app')
