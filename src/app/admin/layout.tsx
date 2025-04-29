// src/app/admin/layout.tsx
'use client'

import { ReactNode } from 'react'
import { TinaCloudProvider } from 'tinacms'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <TinaCloudProvider
      apiURL={
        process.env.NODE_ENV === 'development'
          ? '/api/graphql'
          : process.env.TINA_GRAPHQL_URL!
      }
      token={process.env.TINA_TOKEN!}
      cmsCallback={(cms) => {
        // You can enable Tina flags or middleware here if needed:
        // cms.flags.set('branch-switcher', true)
        return cms
      }}
    >
      {children}
    </TinaCloudProvider>
  )
}
