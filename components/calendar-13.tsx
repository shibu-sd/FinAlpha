"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

interface Calendar13Props {
  selected?: Date | undefined
  onSelect: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  initialFocus?: boolean
}

export default function Calendar13({ selected, onSelect, disabled, initialFocus }: Calendar13Props) {
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      disabled={disabled}
      initialFocus={initialFocus}
      captionLayout="dropdown"
      className="rounded-lg border shadow-sm"
    />
  )
}
