// src/app/admin/[[...tina]]/page.tsx (Pass config prop)
'use client'

import dynamic from 'next/dynamic'
import React from 'react'
// ---> 1. IMPORT your Tina config <---
// Adjust this relative path if your tina folder or admin folder are different!
import config from '../../../../tina/config'

// Optional: Define or import a simple loading component
const Loading = () => (
  <div style={{ padding: '4rem', textAlign: 'center' }}>Loading CMS...</div>
);

// Dynamically import TinaAdmin directly from the 'tinacms' package
const TinaAdmin = dynamic(() => import('tinacms').then((m) => m.TinaAdmin), {
  ssr: false,
  loading: () => <Loading />,
});

const AdminPage = () => {
  // ---> 2. PASS the imported config as a prop <---
  return <TinaAdmin config={config} />;
}

export default AdminPage;