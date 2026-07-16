"use client"

/**
 * Save and resume for the questionnaire.
 *
 * Persists to localStorage today. The DB is not provisioned yet, and a talent who
 * fills in twenty fields and closes the tab must not lose them in the meantime.
 * The async signatures are deliberate: when talent_profiles.draft_data goes live,
 * only the two functions below change and no caller does.
 */

import { emptyDraft, type QuestionnaireDraft } from "./types"

const KEY = "booktalent.questionnaire.v1"

export async function loadDraft(): Promise<QuestionnaireDraft> {
  if (typeof window === "undefined") return emptyDraft()
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return emptyDraft()
    const parsed = JSON.parse(raw) as Partial<QuestionnaireDraft>
    // Merge onto a fresh draft so a stored blob from an older shape cannot leave
    // a section key undefined and crash a step that assumes its object exists.
    return { ...emptyDraft(), ...parsed }
  } catch {
    return emptyDraft()
  }
}

export async function saveDraft(draft: QuestionnaireDraft): Promise<void> {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ ...draft, updatedAt: new Date().toISOString() }),
    )
  } catch {
    // Private mode or a full quota. Losing autosave is survivable; the talent can
    // still complete and submit in this session, so never surface this as an error.
  }
}

export async function clearDraft(): Promise<void> {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* no-op */
  }
}

export function hasDraft(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem(KEY) !== null
  } catch {
    return false
  }
}
