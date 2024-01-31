import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";

export const formData = {
  email:'',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth )

  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm( formData )

  // si el status cambia se obtiene un nuevo valor
  const isAuthenticating = useMemo( () => status === 'checking', [status])

  const onSubmit = ( event ) => {
    event.preventDefault()

    // console.log({ email, password })
    dispatch( startLoginWithEmailPassword({ email, password }) )
  }

  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn")
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title = 'Login'>
      <form onSubmit={ onSubmit } className="animate__animated animate__zoomIn animate__faster">
        <Grid container>

          <Grid item xs = { 12 } sx = {{ mt:2 }}>
            <TextField 
              label = "Correo"
              type = "email"
              placeholder = "correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid item xs = { 12 } sx = {{ mt:2 }}>
            <TextField 
              label = "Contraseña"
              type = "password"
              placeholder = "Contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid 
            container 
            display={ !!errorMessage ? '': 'none' }
            sx = {{ mt: 1 }}>

              <Grid 
                item 
                xs = { 12 }>

              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                // estará disabled si el usuario ya está autenticado
                disabled={ isAuthenticating }
                type="submit" 
                variant='contained' 
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                  // estará disabled si el usuario ya está autenticado
                  disabled={ isAuthenticating }
                  variant='contained' 
                  fullWidth
                  onClick={ onGoogleSignIn }>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction = 'row' justifyContent = 'end' sx = {{ mt:2 }}>
            <Link component = { RouterLink } color = 'inherit' to = "/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>


  )
}

