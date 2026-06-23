export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface AppToastState {
  variant: ToastVariant
  message: string
}

export function orderSuccessToastMessage(): string {
  return '下单成功'
}
