import './App.css'
import './Theme.css'

import NotFound from './pages/NotFound'

// Router
import { Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
