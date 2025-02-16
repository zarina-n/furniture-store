import { UserProvider } from './UserProvider'
import { getCurrentUser } from '@/firebase/firebaseAdmin'

export default async function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const user = JSON.parse(JSON.stringify(await getCurrentUser()))
  return <UserProvider user={user}>{children}</UserProvider>
}
