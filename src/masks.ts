export type Separator = '.' | ','
type Value = string | number | null | undefined

type Options = {
  precision?: number
  decimalSeparator?: Separator
  useThousandSeparator?: boolean
}

export const numberToString = (value: Value, precision: number) => {
  if (typeof value === 'number') {
    value = value.toFixed(precision)
  }

  const num = (value ?? 0)
    .toString()
    .replace(/[\D]/g, '')

  return Number(num).toString()
}

export const maskDecimal = (value: Value, { precision = 2, decimalSeparator = '.', useThousandSeparator = true }: Options = {}) => {
  let thousandSeparator = ''

  if (useThousandSeparator) {
    thousandSeparator = decimalSeparator === '.' ? ',' : '.'
  }

  return numberToString(value, precision)
    .padStart(precision + 1, '0')
    .replace(new RegExp(`([\\d]{${precision}})$`), `${decimalSeparator}$1`)
    .replace(/([\d]+)([\d]{3})/, `$1${thousandSeparator}$2`)
    .replace(/([\d]+)([\d]{3})/, `$1${thousandSeparator}$2`)
    .replace(/([\d]+)([\d]{3})/, `$1${thousandSeparator}$2`)
}

export const toDecimal = (value: string, decimalSeparator: Separator = '.'): number => {
  const firstPattern = decimalSeparator === '.' ? ',' : /\./
  const secondPattern = decimalSeparator === '.' ? /\./ : ','
  return Number(
    value
      .replace(new RegExp(firstPattern, 'g'), '')
      .replace(new RegExp(secondPattern, 'g'), '.')
  )
}
