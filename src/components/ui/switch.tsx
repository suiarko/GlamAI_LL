'use client'

import React from 'react'

type SwitchProps = {
  id?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Switch({
  id,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
}: SwitchProps) {
  return (
    <label htmlFor={id} className={`relative inline-flex items-center ${className ?? ''}`}>
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        disabled={disabled}
      />
      <div
        className="h-6 w-11 rounded-full bg-slate-700 peer-checked:bg-accent transition-colors duration-200 ease-in-out relative
                   after:content-[''] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white
                   after:transition-transform after:duration-200 after:ease-in-out peer-checked:after:translate-x-5
                   peer-disabled:opacity-50"
        aria-hidden="true"
      />
    </label>
  )
}

export default Switch





