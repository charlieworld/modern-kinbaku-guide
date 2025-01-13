export const DEFAULT_TITLE = 'BDSM 行事曆';
export const WEBSITE = 'https://todo.smertw.com/';
export const META_DESC = ''
export const META_IMAGE = `${WEBSITE}/assets/images/meta-image.jpg`

export const SMER_TOKEN = 'SMER_TOKEN';

export const IMAGE_RATIO = {
  BANNER: '3/2',
  PROFILE: '1/1',
  PROMO: '3/1',
}

export const CACHE_STRATEGY = {
  AGGRESSIVE: 'public, max-age=3600, s-maxage=3600',
  MEDIUM: 'public, max-age=600, s-maxage=600',
  CONSERVATIVE: 'public, max-age=300, s-maxage=300',
  NONE: 'public, max-age=0, s-maxage=0',
};

export const ROOT_META = {
  charset: 'utf-8',
  title: DEFAULT_TITLE,
  description: META_DESC,
  viewport: 'width=device-width,initial-scale=1',
  version: '1.0.0',
  'og:type': 'website',
  'og:url': WEBSITE,
};

export const VIEW_TYPE = {
  CARD: 'card',
  LIST: 'list',
};

export const BANNER_HEIGHT = 'h-64';