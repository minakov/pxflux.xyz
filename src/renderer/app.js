import { createSSRApp, h } from 'vue';

export function createApp({ Page, pageProps }) {
  return createSSRApp({
    render: () => h(Page, pageProps),
  });
}
