import { useLocation } from 'react-router-dom'

export function isActive(path: 'ikeas'): boolean {
  const { pathname } = useLocation()
  return pathname?.startsWith(`/${path}`)
}

export function isPrideMonth(): boolean {
  // June is pride month
  return new Date().getMonth() === 5
}
