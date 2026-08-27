import { Lock, Smartphone } from 'lucide-react'

/**
 * Marks what kind of thing a project is where a favicon would otherwise sit.
 * Public sites have a real favicon, so they render nothing here.
 */
export default function KindIcon({ kind, size = 13 }) {
  if (kind === 'private') return <Lock size={size} />
  if (kind === 'app') return <Smartphone size={size} />
  return null
}
