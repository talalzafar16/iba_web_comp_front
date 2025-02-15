import React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
        </div>
  )
}

export default Layout