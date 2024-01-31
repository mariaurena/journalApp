import { Navigate, Route, Routes } from "react-router"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/components/CheckingAuth"
import { useCheckAuth } from "../hooks/useCheckAuth"

export const AppRouter = () => {

  const { status } = useCheckAuth()

  if ( status === 'checking' ){
    // mostramos componente que muestra un CircularProgress
    return <CheckingAuth />
  }

  return (
    <Routes>

      { 
        (status === 'authenticated')
        // esta ruta solo existe si el usuario SI está autenticado
        ? <Route path = "/*" element = { <JournalRoutes />} /> // Login y registro 
        // esta ruta solo existe si el usuario NO está autenticado
        : <Route path = "/auth/*" element = { <AuthRoutes />} /> // JournalApp
      }

      {/* Por si no estás autenticado e intentas acceder a cualquier ruta */}
      <Route path = '/*' element= {<Navigate to = '/auth/login' />} />

    </Routes>
  )
}

