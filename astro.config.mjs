// @ts-check
import { defineConfig } from 'astro/config';

// While on the temporary *.pages.dev URL, keep `site` pointing at the
// pages.dev address. When the real domain is attached, swap this to
// 'https://nisolicitorwebsites.co.uk' (or whichever domain you register)
// and the sitemap / canonical URLs will update automatically.
export default defineConfig({
  site: 'https://ni-solicitor-websites.pages.dev',
});
