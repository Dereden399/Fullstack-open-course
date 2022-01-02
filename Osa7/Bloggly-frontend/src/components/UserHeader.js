import React from "react"
import { useNavigate } from "react-router"
import { logout } from "../reducers/userReducer"
import { connect } from "react-redux"
import { LoginIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline"

const UserLoginLogout = props => {
  const nav = useNavigate()
  const handleLogout = () => {
    props.logout()
    nav("/")
  }
  const handleClick = event => {
    event.preventDefault()
    if (!props.user.username) {
      nav("/login")
    } else {
      handleLogout()
    }
  }
  return (
    <div className='flex flex-row items-center gap-x-2'>
      {props.user.username && (
        <div>
          <b className='text-primaryWhite'>{props.user.username}</b>
        </div>
      )}
      <div className='flex flex-row md:flex-col gap-x-2 gap-y-1'>
        {props.user.username && (
          <div>
            <button
              onClick={() => nav(`/users/${props.user.userId}`)}
              className='btn-navbar'
            >
              <p className='hidden md:block'>Your profile</p>
              <UserIcon className='w-10 h-10 md:hidden' />
            </button>
          </div>
        )}
        <div>
          <button
            onClick={handleClick}
            className='btn-navbar grid place-items-center'
          >
            {!props.user.username ? (
              <p className='hidden md:block'>Log in</p>
            ) : (
              <p className='hidden md:block'>Log out</p>
            )}
            {!props.user.username ? (
              <LoginIcon className='w-10 h-10 md:hidden' />
            ) : (
              <LogoutIcon className='w-10 h-10 md:hidden' />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, { logout })(UserLoginLogout)
