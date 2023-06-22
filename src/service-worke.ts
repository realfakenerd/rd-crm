import { clientsClaim } from 'workbox-core';
import { pageCache, imageCache, staticResourceCache, googleFontsCache } from 'workbox-recipes';
self.__WB_DISABLE_DEV_LOGS = true;
clientsClaim();

imageCache();

pageCache();

staticResourceCache();

googleFontsCache();