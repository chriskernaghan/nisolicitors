/* =====================================================================
   Structured data (JSON-LD) for Google.
   Site-wide details live here so they only need changing in one place.
   ===================================================================== */

export const SITE_URL = 'https://websitesforsolicitors.co.uk';
export const SITE_NAME = 'Websites for Solicitors';

const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#chris`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/* Add profile links here (e.g. your LinkedIn URL) to help Google
   connect the site to you. Leave empty if you'd rather not. */
const PERSON_SAME_AS: string[] = [];

export const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Chris Kernaghan',
  jobTitle: 'Web designer',
  url: 'https://wpbase.co.uk/',
  worksFor: {
    '@type': 'Organization',
    name: 'WP Base',
    url: 'https://wpbase.co.uk/',
  },
  ...(PERSON_SAME_AS.length ? { sameAs: PERSON_SAME_AS } : {}),
};

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description:
    'Web design, redesigns and ongoing website care for solicitors and law firms in Northern Ireland.',
  email: 'hello@wpbase.co.uk',
  telephone: '+447379334695',
  areaServed: { '@type': 'AdministrativeArea', name: 'Northern Ireland' },
  founder: { '@id': PERSON_ID },
  knowsAbout: [
    'Web design for solicitors',
    'Law firm websites',
    'WordPress maintenance',
    'Local SEO',
  ],
};

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'en-GB',
  publisher: { '@id': ORG_ID },
};

/* Homepage: who runs the site and what it is. */
export function homeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [website, organization, person],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbs(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/* Guides listing page. */
export function guidesIndexSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/blog/#page`,
        name: 'Website guides for Northern Ireland law firms',
        url: `${SITE_URL}/blog/`,
        isPartOf: { '@id': WEBSITE_ID },
        inLanguage: 'en-GB',
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/blog/' },
      ]),
    ],
  };
}

/* Individual guide. */
export function articleSchema(opts: {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tag: string;
}) {
  const url = `${SITE_URL}/blog/${opts.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: opts.title,
        description: opts.description,
        url,
        mainEntityOfPage: url,
        datePublished: opts.pubDate.toISOString(),
        dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
        articleSection: opts.tag,
        inLanguage: 'en-GB',
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORG_ID },
        isPartOf: { '@id': WEBSITE_ID },
      },
      person,
      organization,
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/blog/' },
        { name: opts.title, path: `/blog/${opts.slug}/` },
      ]),
    ],
  };
}
