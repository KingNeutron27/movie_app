import Home from "./Pages/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import NavBar from "./Pages/NavBar"
import Favorites from "./Pages/Favorites"
import { MovieProvider } from "./Contexts/MovieContext"

function App() {

  return (
  <MovieProvider>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />  
      </Routes>
    </BrowserRouter>
  </MovieProvider>
  )
}

export default App
