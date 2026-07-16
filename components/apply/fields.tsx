"use client"

/**
 * Questionnaire field primitives.
 *
 * Every control here is built to the existing brand: sharp edges, gold used only
 * to mark a chosen state, no shadows, no gradients. Touch targets are 44px minimum
 * because most talent will fill this in on a phone.
 */

import type { ReactNode } from "react"

export function Field({
  label,
  hint,
  children,
  optional,
}: {
  label: string
  hint?: string
  children: ReactNode
  optional?: boolean
}) {
  return (
    <div className="mb-8">
      <label className="block text-[13px] text-white font-bold tracking-wide mb-1">
        {label}
        {optional && <span className="ml-2 text-[11px] text-mjcc-muted font-medium">Optional</span>}
      </label>
      {hint && <p className="text-[12px] text-mjcc-muted mb-3 leading-relaxed">{hint}</p>}
      {!hint && <div className="mb-3" />}
      {children}
    </div>
  )
}

const inputBase =
  "w-full bg-mjcc-charcoal border border-white/15 text-white px-4 py-3 text-[15px] " +
  "placeholder:text-white/30 focus:border-mjcc-gold focus:outline-none transition-colors min-h-[48px]"

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
}: {
  value?: string | number
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  inputMode?: "text" | "numeric" | "tel" | "email" | "url" | "decimal"
}) {
  return (
    <input
      type={type}
      inputMode={inputMode}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputBase}
    />
  )
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value?: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`${inputBase} resize-y`}
    />
  )
}

/** Multi select chips. This is the workhorse: every text[] column is filled by one. */
export function ChipMulti({
  options,
  selected,
  onToggle,
  columns = 2,
}: {
  options: readonly (string | { value: string; label: string; hint?: string })[]
  selected: string[]
  onToggle: (value: string) => void
  columns?: 1 | 2
}) {
  const norm = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o))
  return (
    <div className={`grid gap-2 ${columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
      {norm.map((o) => {
        const on = selected.includes(o.value)
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(o.value)}
            className={`text-left px-4 py-3 border transition-colors min-h-[48px] ${
              on
                ? "border-mjcc-gold bg-mjcc-gold/10 text-white"
                : "border-white/15 text-mjcc-muted hover:border-white/40 hover:text-white"
            }`}
          >
            <span className="block text-[14px] font-semibold">{o.label}</span>
            {"hint" in o && o.hint && (
              <span className="block text-[11px] text-mjcc-muted mt-0.5 font-medium">{o.hint}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/** Single select, same visual language as ChipMulti so the form reads as one thing. */
export function ChipSingle({
  options,
  value,
  onSelect,
  columns = 2,
}: {
  options: readonly (string | { value: string; label: string; hint?: string })[]
  value?: string
  onSelect: (value: string) => void
  columns?: 1 | 2
}) {
  const norm = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o))
  return (
    <div className={`grid gap-2 ${columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
      {norm.map((o) => {
        const on = value === o.value
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onSelect(o.value)}
            className={`text-left px-4 py-3 border transition-colors min-h-[48px] ${
              on
                ? "border-mjcc-gold bg-mjcc-gold/10 text-white"
                : "border-white/15 text-mjcc-muted hover:border-white/40 hover:text-white"
            }`}
          >
            <span className="block text-[14px] font-semibold">{o.label}</span>
            {"hint" in o && o.hint && (
              <span className="block text-[11px] text-mjcc-muted mt-0.5 font-medium">{o.hint}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export function YesNo({
  value,
  onChange,
  yesLabel = "Yes",
  noLabel = "No",
}: {
  value?: boolean
  onChange: (v: boolean) => void
  yesLabel?: string
  noLabel?: string
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[
        { v: true, label: yesLabel },
        { v: false, label: noLabel },
      ].map((o) => (
        <button
          key={String(o.v)}
          type="button"
          aria-pressed={value === o.v}
          onClick={() => onChange(o.v)}
          className={`px-4 py-3 border text-[14px] font-semibold transition-colors min-h-[48px] ${
            value === o.v
              ? "border-mjcc-gold bg-mjcc-gold/10 text-white"
              : "border-white/15 text-mjcc-muted hover:border-white/40 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Checkbox({
  checked,
  onChange,
  label,
  hint,
}: {
  checked?: boolean
  onChange: (v: boolean) => void
  label: string
  hint?: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={!!checked}
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 text-left w-full py-2 min-h-[44px]"
    >
      <span
        className={`mt-0.5 w-5 h-5 shrink-0 border flex items-center justify-center transition-colors ${
          checked ? "border-mjcc-gold bg-mjcc-gold" : "border-white/30"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 10" className="w-3 h-2.5" aria-hidden="true">
            <path d="M1 5l3.5 3.5L11 1.5" fill="none" stroke="#0A0A0A" strokeWidth="2" />
          </svg>
        )}
      </span>
      <span>
        <span className="block text-[14px] text-white font-semibold leading-snug">{label}</span>
        {hint && <span className="block text-[12px] text-mjcc-muted mt-1 leading-relaxed">{hint}</span>}
      </span>
    </button>
  )
}

/** Two numeric inputs bounding a range. Used for age-plays and age-presents. */
export function RangeInput({
  min,
  max,
  onMin,
  onMax,
  unit,
}: {
  min?: number
  max?: number
  onMin: (v: number | undefined) => void
  onMax: (v: number | undefined) => void
  unit?: string
}) {
  const parse = (v: string) => (v === "" ? undefined : Number(v))
  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        inputMode="numeric"
        value={min ?? ""}
        onChange={(e) => onMin(parse(e.target.value))}
        placeholder="From"
        className={`${inputBase} flex-1`}
      />
      <span className="text-mjcc-muted text-sm shrink-0">to</span>
      <input
        type="number"
        inputMode="numeric"
        value={max ?? ""}
        onChange={(e) => onMax(parse(e.target.value))}
        placeholder="To"
        className={`${inputBase} flex-1`}
      />
      {unit && <span className="text-mjcc-muted text-sm shrink-0">{unit}</span>}
    </div>
  )
}
