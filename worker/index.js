/**
 * Static Cloudflare Worker entry for the Sites deployment.
 * Vite builds the application assets; this worker serves them and makes the
 * SPA fallback resolve to index.html for any client-side route.
 */
export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)

    if (response.status !== 404) return response

    const url = new URL(request.url)
    url.pathname = '/index.html'
    return env.ASSETS.fetch(new Request(url, request))
  },
}
