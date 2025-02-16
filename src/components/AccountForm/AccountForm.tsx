import ChangeUserName from '../ChangeUser/ChangeUserName'
import ChangeUserEmail from '../ChangeUser/ChangeUserEmail'
import ChangeUserPassword from '../ChangeUser/ChangeUserPassword'

export default function AccountForm() {
  return (
    <>
      <ChangeUserName />
      <ChangeUserEmail />
      <ChangeUserPassword />
    </>
  )
}
