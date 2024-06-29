import './App.css'
import Room from './Pages/Room'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import PrivateRoutes from './components/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import RegisterPage from './Pages/RegisterPage'

function App() {
  

  return (
    <Router>
      <AuthProvider>
      <Routes> 
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route element={<PrivateRoutes/>}>
        <Route path='/' element={<Room/>}/>
        </Route>
      </Routes>
      </AuthProvider>
   
    </Router>
  )
}

export default App
