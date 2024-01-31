import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

// valores por defecto
const formData = {
  email: '',
  password: '',
  displayName: ''
}

// validaciones de los campos de registro:
// objeto con arreglos que tienen la función a evaluar y el mensaje de error
const formValidations = {
  // comprobamos que email contiene @
  email:       [(value) => value.includes('@'), 'El correo debe de tener una @'],
  // comprobamos que password tenga más de 6 caracteres
  password:    [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
  // comprobamos que name tenga más de 1 caracter
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const [ formSubmitted, setFormSubmitted ] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth)

  const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

  const { 
    formState,   displayName,      email,      password,    onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid

  } = useForm( formData, formValidations )

  const onSubmit = ( event ) => {
    event.preventDefault()

    setFormSubmitted(true)

    if ( !isFormValid ) return
    
    dispatch(startCreatingUserWithEmailPassword( formState ))
  }

  return (
    <AuthLayout title = 'Register'>
      <form onSubmit={ onSubmit } className="animate__animated animate__zoomIn animate__faster">
        <Grid container>

        <Grid item xs = { 12 } sx = {{ mt:2 }}>
            <TextField 
              label = "Nombre completo"
              type = "text"
              placeholder = "Tu nombre"
              fullWidth
              name = "displayName"
              value = { displayName }
              onChange ={ onInputChange }
              // se mostrará el error si el nombre no es válido
              // doble negación convierte el valor en un booleano
              error = { !!displayNameValid && formSubmitted }
              helperText = { displayNameValid }
            />
          </Grid>

          <Grid item xs = { 12 } sx = {{ mt:2 }}>
            <TextField 
              label = "Correo"
              type = "email"
              placeholder = "correo@google.com"
              fullWidth
              name = "email"
              value = { email }
              onChange ={ onInputChange }
              error = { !!emailValid && formSubmitted}
              helperText = { emailValid }
            />
          </Grid>

          <Grid item xs = { 12 } sx = {{ mt:2 }}>
            <TextField 
              label = "Contraseña"
              type = "password"
              placeholder = "Contraseña"
              fullWidth
              name = "password"
              value = { password }
              onChange ={ onInputChange }
              error = { !!passwordValid && formSubmitted }
              helperText = { passwordValid }
            />
          </Grid>

          <Grid container spacing = { 2 } sx = {{ mb:2, mt:1 }}>

            <Grid 
              item 
              xs = { 12 }
              display={ !!errorMessage ? '': 'none' }>
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>

            <Grid item xs = { 12 }>
              <Button 
                disabled = { isCheckingAuthentication }
                type = "submit"
                variant = 'contained' 
                fullWidth>
                Crear cuenta
              </Button>
            </Grid>

            <Grid container direction = 'row' justifyContent = 'end' sx = {{ mt:2 }}>
              <Typography sx = {{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component = { RouterLink } color = 'inherit' to = "/auth/login">
                Ingresar
              </Link>
            </Grid>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>


  )
}

