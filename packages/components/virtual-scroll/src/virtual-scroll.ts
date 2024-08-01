export type VirtualScrollItem<T> = {
  data: T,
  $width: number,
  $height: number
  [key: string]: number | T
}