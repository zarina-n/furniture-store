import { toast } from 'sonner'

export const showToast = (result: { success: boolean; message: string }) => {
  if (result.success) {
    toast.success(result.message)
  } else {
    toast.error(result.message)
  }
}
