import './topMenu.css'
import { useNewsStore } from '..'

const TopMenu = () => {
    const { limit } = useNewsStore()

    return (
        <div className="top-menu-container">
            <div>Score</div>
            <div>Name ({limit})</div>
        </div>
    )
}

export default TopMenu
