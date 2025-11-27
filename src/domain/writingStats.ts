import type { WritingStats } from './types'

/**
 * Calculate word count from text
 */
export function countWords(text: string): number {
  if (!text.trim()) return 0
  return text.trim().split(/\s+/).length
}

/**
 * Calculate writing stats from previous stats and new text
 */
export function calculateWritingStats(
  previousStats: WritingStats,
  newText: string,
  currentTimestamp: number
): WritingStats {
  const wordCount = countWords(newText)
  const previousWordCount = previousStats.sessionWords
  
  // Only add timestamp if word count increased (user is actively typing)
  const newTimestamps = [...previousStats.typingTimestamps]
  if (wordCount > previousWordCount) {
    newTimestamps.push(currentTimestamp)
    // Keep only last 100 timestamps to avoid memory issues
    if (newTimestamps.length > 100) {
      newTimestamps.shift()
    }
  }

  return {
    totalWordsToday: previousStats.totalWordsToday + Math.max(0, wordCount - previousWordCount),
    sessionWords: wordCount,
    typingTimestamps: newTimestamps,
    lastActivityAt: currentTimestamp,
  }
}

/**
 * Calculate typing pace in words per minute
 * Uses timestamps from the last N seconds (default 60)
 */
export function calculatePace(
  writingStats: WritingStats,
  now: number,
  windowSeconds: number = 60
): number {
  const cutoffTime = now - windowSeconds * 1000
  const recentTimestamps = writingStats.typingTimestamps.filter((ts) => ts >= cutoffTime)

  if (recentTimestamps.length < 2) return 0

  const timeSpan = (recentTimestamps[recentTimestamps.length - 1] - recentTimestamps[0]) / 1000 // seconds
  if (timeSpan <= 0) return 0

  // Estimate words from keystrokes (rough approximation: 5 chars per word)
  const keystrokes = recentTimestamps.length
  const estimatedWords = keystrokes / 5
  const wordsPerMinute = (estimatedWords / timeSpan) * 60

  return Math.max(0, wordsPerMinute)
}

/**
 * Calculate idle fraction (0-1) based on last activity time
 * Returns 0 if recently active, 1 if very idle
 */
export function calculateIdleFraction(
  lastActivityAt: number,
  now: number,
  maxIdleSeconds: number = 300 // 5 minutes
): number {
  const idleSeconds = (now - lastActivityAt) / 1000
  if (idleSeconds <= 0) return 0
  if (idleSeconds >= maxIdleSeconds) return 1
  return Math.min(1, idleSeconds / maxIdleSeconds)
}

