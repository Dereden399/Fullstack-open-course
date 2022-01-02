import React from "react"

import { MenuIcon, XIcon } from "@heroicons/react/solid"
import mainIcon from "../icons/Bloggly.svg"
import B from "../icons/B.svg"
import UserHeader from "./UserHeader"

const NavigationBar = ({ toggle, isOpen }) => {
  return (
    <nav className='bg-secondary-500 flex items-center justify-between px-5 h-14'>
      <div className='h-full flex flex-row items-center gap-x-1 shrink'>
        {isOpen ? (
          <XIcon onClick={toggle} className='h-full' />
        ) : (
          <MenuIcon onClick={toggle} className='h-full' />
        )}
        <img src={mainIcon} className='h-full hidden md:block' />
      </div>
      <img src={B} className='h-24 md:hidden' />
      <UserHeader />
    </nav>
  )
}

export default NavigationBar
