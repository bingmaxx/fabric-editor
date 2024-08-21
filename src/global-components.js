import { defineAsyncComponent } from 'vue'

export default function registerGlobalComponents(app) {
  const components = import.meta.glob('@/components/*.vue')

  for (const path in components) {
    const componentName = path.split('/').pop().replace('.vue', '')
    app.component(componentName, defineAsyncComponent(components[path]))
  }
}
