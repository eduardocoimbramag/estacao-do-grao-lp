const STORAGE_KEY = "estacao_form_last_submission"
const LIMIT_HOURS = 24

export function isFormBlockedNow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const last = Number(raw)
    if (!Number.isFinite(last)) return false
    const limitMs = LIMIT_HOURS * 60 * 60 * 1000
    return Date.now() - last < limitMs
  } catch {
    return false
  }
}

export function markFormSubmittedNow(): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    // ignore
  }
}

export function getRemainingHours(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 0
    const last = Number(raw)
    if (!Number.isFinite(last)) return 0
    const limitMs = LIMIT_HOURS * 60 * 60 * 1000
    const remaining = limitMs - (Date.now() - last)
    if (remaining <= 0) return 0
    return Math.ceil(remaining / (60 * 60 * 1000))
  } catch {
    return 0
  }
}


