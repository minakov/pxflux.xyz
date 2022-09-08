import { createApp } from './app';

export async function render(pageContext) {
  createApp(pageContext).mount('#app');
}
