// One-off: extract the 7 base64 JPEGs from docs/preview.html into public/images/.
// Usage: node scripts/extract-preview-images.mjs
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'docs', 'preview.html')
const outDir = join(root, 'public', 'images')

// Prototype key → target file (requirement §2.3)
const mapping = {
  hero: 'portrait-headshot.jpg',
  formal: 'portrait-formal.jpg',
  seated: 'portrait-seated.jpg',
  team: 'team.jpg',
  writing: 'legal-writing.jpg',
  exterior: 'office-exterior.jpg',
  interior: 'office-interior.jpg',
}

// Crop-only cleanup (no resampling or retouching): two Google Maps screenshots
// include Maps UI and a sliver of the neighbouring team photo. [x, y, w, h]
const crops = {
  'office-exterior.jpg': [155, 216, 520, 414],
  'office-interior.jpg': [20, 140, 640, 490],
}

function crop(path, [x, y, w, h]) {
  try {
    execFileSync('sips', [
      '-c', String(h), String(w),
      '--cropOffset', String(y), String(x),
      '-s', 'formatOptions', 'best',
      path,
    ], { stdio: 'ignore' })
    return true
  } catch {
    console.warn(`Could not crop ${path} (macOS sips required); left uncropped`)
    return false
  }
}

const html = readFileSync(source, 'utf8')
const block = html.match(/const images = \{([\s\S]*?)\};/)
if (!block) {
  console.error('Could not find `const images = {…}` in docs/preview.html')
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

const entry = /(\w+):\s*'data:image\/jpeg;base64,([A-Za-z0-9+/=]+)'/g
const found = new Set()
for (const [, key, data] of block[1].matchAll(entry)) {
  const file = mapping[key]
  if (!file) {
    console.warn(`Skipping unmapped key: ${key}`)
    continue
  }
  const bytes = Buffer.from(data, 'base64')
  const path = join(outDir, file)
  writeFileSync(path, bytes)
  found.add(key)
  const cropped = crops[file] && crop(path, crops[file])
  console.log(`${file}\t${bytes.length} bytes${cropped ? `\tcropped to ${crops[file][2]}×${crops[file][3]}` : ''}`)
}

const missing = Object.keys(mapping).filter((key) => !found.has(key))
if (missing.length > 0) {
  console.error(`Missing keys: ${missing.join(', ')}`)
  process.exit(1)
}
