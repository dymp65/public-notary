import { lazy, Suspense, useState } from 'react'
import App from './App.tsx'
import { DesignSwitch } from './components/DesignSwitch.tsx'
import { site } from './config/site.ts'
import type { Design } from './types/site.ts'

// Review variants are separate chunks, fetched only when someone switches to them.
const designApps = {
  v1: lazy(() => import('./v1/App.tsx')),
  v2: App,
  v3: lazy(() => import('./v3/App.tsx')),
}

// `?design=v1` / `?design=v3` keeps the choice across reloads and in shared review links.
function readDesign(): Design {
  if (!site.flags.showDesignSwitch) return 'v2'
  const param = new URLSearchParams(window.location.search).get('design')
  return param === 'v1' || param === 'v3' ? param : 'v2'
}

function Root() {
  const [design, setDesignState] = useState<Design>(readDesign)

  const setDesign = (next: Design) => {
    if (next === design) return
    const url = new URL(window.location.href)
    if (next === 'v2') url.searchParams.delete('design')
    else url.searchParams.set('design', next)
    url.hash = ''
    window.history.replaceState(null, '', url)
    setDesignState(next)
    // The designs have different section heights, so start the comparison at the top.
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (!site.flags.showDesignSwitch) return <App />

  const DesignApp = designApps[design]
  return (
    <>
      <Suspense fallback={null}>
        <DesignApp />
      </Suspense>
      <DesignSwitch design={design} onChange={setDesign} />
    </>
  )
}

export default Root
