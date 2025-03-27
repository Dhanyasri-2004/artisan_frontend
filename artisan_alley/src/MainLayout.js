import { useState } from 'react'
import './styles/DashboardAdmin.css'
import './styles/DashboardAdmin1.css'
import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import DashboardAdmin from './pages/DashboardAdmin'


function MainLayout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <DashboardAdmin />
    </div>
  )
}

export default MainLayout;