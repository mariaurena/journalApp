import { Grid, Typography } from "@mui/material"

// contiene todo lo que queremos reutilizar del auth
export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid 
      container
      spacing = { 0 }
      direction = "column"
      alignItems = "center"
      justifyContent = "center"
      // sx coge primary.main de nuestro purpleTheme
      sx = {{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >

      <Grid item
        className='box-shadow'
        // en pantallas pequeñas va a tener 3 posiciones
        // también hay md, xl ...
        xs = { 3 }
        // estilo
        sx = {{ 
            width: { sm: 450 },
            backgroundColor: 'white', 
            padding: 3, 
            borderRadius: 2 
        }}>
          
          <Typography variant= 'h5' sx = {{ mb: 1 }}>{ title }</Typography>

        { children }

      </Grid>
    </Grid>
  )
}
