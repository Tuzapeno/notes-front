import { Outlet } from "react-router-dom"

const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen pb-50">
      <Outlet />
    </div>
  )
}

export default Auth
