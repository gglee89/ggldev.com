import TopMenu from './TopMenu'
import MenuGeneric from './MenuGeneric'

import './sideMenu.css'

const SideMenuGeneric = () => {
    return (
        <div className="side-menu-container">
            <TopMenu />
            <MenuGeneric />
        </div>
    )
}

export default SideMenuGeneric
