// Router
import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import UiInternals from 'pages/UiInternals'

import './App.css'
import './Theme.css'
import NotFound from './pages/NotFound'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ui-internals" element={<UiInternals />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
