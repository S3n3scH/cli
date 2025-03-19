import type { NetlifyAPI } from 'netlify'

import { type APIError, error } from './command-helpers.js'

export const getSiteByName = async (api: NetlifyAPI, siteName: string) => {
  try {
    const sites = await api.listSites({ name: siteName, filter: 'all' })
    const siteFoundByName = sites.find((filteredSite) => filteredSite.name === siteName)

    if (!siteFoundByName) {
      throw Error
    }

    return siteFoundByName
  } catch (error_) {
    if ((error_ as APIError).status === 401) {
      error(`${(error_ as APIError).message}: could not retrieve site`)
    } else {
      error('Site not found. Please rerun "netlify link"')
    }
  }
}
