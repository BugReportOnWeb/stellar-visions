import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // TODO: Check later for possible bugs/errors
    build: {
        sourcemap: false
    }
})
