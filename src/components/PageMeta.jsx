import { useEffect } from 'react'

/**
 * PageMeta — sets document.title and meta description per route.
 * Since this is a client-side React SPA, Googlebot (which runs JS)
 * will see these values on each page crawl.
 */
export default function PageMeta({ title, description, canonical }) {
  useEffect(() => {
    // Set page title
    if (title) {
      document.title = title.length > 60
        ? title.slice(0, 57) + '...'
        : title
    }

    // Set meta description
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl && description) {
      descEl.setAttribute('content', description)
    }

    // Set OG title
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle && title) ogTitle.setAttribute('content', title)

    // Set OG description
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc && description) ogDesc.setAttribute('content', description)

    // Set OG url / canonical
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl && canonical) ogUrl.setAttribute('content', canonical)

    let canonEl = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      if (!canonEl) {
        canonEl = document.createElement('link')
        canonEl.rel = 'canonical'
        document.head.appendChild(canonEl)
      }
      canonEl.href = canonical
    }

    // Cleanup: restore homepage defaults on unmount
    return () => {
      document.title = 'UK Funding Hub — Grants, Benefits & Loans'
      if (descEl) {
        descEl.setAttribute('content',
          'Search thousands of UK government grants, startup funding, business grants, energy & housing schemes. Free real-time database updated hourly.')
      }
      if (canonEl) canonEl.href = 'https://ukgrants.online/'
    }
  }, [title, description, canonical])

  return null
}
