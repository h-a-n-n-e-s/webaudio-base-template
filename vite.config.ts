import { defineConfig } from 'vite';

export default defineConfig({

  build: {
    
    rollupOptions: {
      
      input: {
        app: 'index.html',
        'processor': 'src/processor.ts'
      },
      
      output: {
        entryFileNames: assetInfo => {
          return assetInfo.name === 'processor'
             ? 'src/[name].js'
             : 'assets/[name]-[hash].js'
        }
      }
    }
  }
});