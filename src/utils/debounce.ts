export const debounce = (
  callback: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>, // todo: make type more generic
  delay: number,
) => {
  let timeoutId: NodeJS.Timeout | number

  return function () {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(callback, delay)
  }
}
