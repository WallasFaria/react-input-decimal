import * as React from "react"
import { maskDecimal, Separator, toDecimal } from "./masks"

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onChangeValue?: (value: number, maskedValue: string, event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number | null
  decimalSeparator?: Separator
  useThousandSeparator?: boolean
  precision?: number
  align?: 'left' | 'right'
}

export function InputDecimal (props: Props) {
  const {
    value,
    onChangeValue,
    type,
    style,
    decimalSeparator = '.',
    useThousandSeparator = true,
    precision = 2,
    align = 'right',
    ...rest
  } = props

  const styles: React.CSSProperties = { textAlign: align, ...(style ?? {}) }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue) {
      const maskedValue = maskDecimal(e.target.value, { decimalSeparator, useThousandSeparator, precision })
      const floatValue = toDecimal(maskedValue, decimalSeparator)
      onChangeValue(floatValue, maskedValue, e)
    }
  }

  const movesCursorToEnd = (e: any) => {
    e.stopPropagation()
    setTimeout(() => {
      e.target.selectionStart = e.target.selectionEnd = e.target.value.length
    }, 1)
  }

  return (
    <input
      { ...rest }
      type="text"
      value={maskDecimal(value, { decimalSeparator, useThousandSeparator, precision })}
      onChange={handleChange}
      onClickCapture={movesCursorToEnd}
      style={styles}
    />
  )
}
