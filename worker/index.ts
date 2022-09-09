import { createPageRenderer } from 'vite-plugin-ssr';
import '../dist/server/importBuild.cjs';

const renderPage = createPageRenderer({ isProduction: true });

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    try {
      return handleFetchEvent(request, env);
    } catch (e) {
      console.log(e);
      return new Response('Internal Error', { status: 500 });
    }
  },
};

async function handleFetchEvent(request: Request, env: any): Promise<Response> {
  if (!isAssetUrl(request.url)) {
    const response = await handleSsr(request.url);
    if (response !== null) {
      return response;
    }
  }
  return env.ASSETS.fetch(request);
}

function isAssetUrl(url: string) {
  const { pathname } = new URL(url);
  return pathname.startsWith('/assets/');
}

async function handleSsr(url: string) {
  const { httpResponse } = await renderPage({ url });
  if (httpResponse) {
    const { readable, writable } = new TransformStream();
    httpResponse.pipeToWebWritable(writable);
    return new Response(readable);
  }
  return null;
}
