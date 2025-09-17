import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatTime(ms: number) {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPG, PNG, or WebP image' }
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be smaller than 5MB' }
  }
  
  return { valid: true }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1]) // Remove data:image/...;base64, prefix
    }
    reader.onerror = error => reject(error)
  })
}

export function downloadImage(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}


// Password strength utilities
export type PasswordStrength = {
  score: number // 0-4
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong'
  feedback: string[]
}

/**
 * Returns a strength score for a password using simple heuristics:
 * length, character variety, and common pattern penalties.
 */
export function evaluatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = []

  if (!password) {
    return { score: 0, label: 'Very Weak', feedback: ['Password is empty'] }
  }

  let score = 0

  // Length
  if (password.length >= 12) score += 2
  else if (password.length >= 10) score += 1
  else feedback.push('Use at least 12 characters')

  // Character sets
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasDigit = /\d/.test(password)
  const hasSymbol = /[^A-Za-z0-9]/.test(password)
  const varietyCount = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length

  if (varietyCount >= 4) score += 2
  else if (varietyCount === 3) score += 1

  if (!hasUpper) feedback.push('Add uppercase letters')
  if (!hasLower) feedback.push('Add lowercase letters')
  if (!hasDigit) feedback.push('Add numbers')
  if (!hasSymbol) feedback.push('Add symbols')

  // Penalties for common patterns
  const commonPatterns = [/password/i, /qwerty/i, /12345/, /abcdef/i, /letmein/i]
  if (commonPatterns.some((re) => re.test(password))) {
    score = Math.max(0, score - 2)
    feedback.push('Avoid common patterns and sequences')
  }

  // Repeated characters
  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 1)
    feedback.push('Avoid repeating the same character')
  }

  // Map score 0-4
  const bounded = Math.max(0, Math.min(4, score))
  const labelMap: PasswordStrength['label'][] = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong']

  return { score: bounded, label: labelMap[bounded], feedback }
}

/**
 * Simple policy check used for gating signup form submission.
 * Enforces: length >= 12 and includes upper, lower, digit, symbol.
 */
export function isPasswordStrong(password: string): boolean {
  if (password.length < 12) return false
  if (!/[a-z]/.test(password)) return false
  if (!/[A-Z]/.test(password)) return false
  if (!/\d/.test(password)) return false
  if (!/[^A-Za-z0-9]/.test(password)) return false
  return true
}

