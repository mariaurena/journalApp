import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"

export const NoteView = () => {

    const dispatch = useDispatch()

    const { activeNote, messageSaved, isSaving } = useSelector( state => state.journal )

    const { body, title, date, onInputChange, formState } = useForm( activeNote )

    const dateString = useMemo( () => {

        const newDate = new Date( date )

        return newDate.toUTCString()

    }, [ date])

    // lo usaremos para que al hacer click en el boton de 'UploadOutlined'
    // se comporte como 
    const fileInputRef = useRef()

    // actualizamos los valores de la nota activa sobre la que estamos 
    // escribiendo
    useEffect( () => {

        dispatch( setActiveNote(formState) )

    }, [formState])  // cada vez que cambia el estado del formulario

    // dispara un mensaje de sweetalert diciendo que se ha guardado
    // la imagen correctamente
    useEffect( () => {

        if ( messageSaved.length > 0 ){
            // npm install sweetalert2
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }

    }, [messageSaved])  // cada vez que el mensaje cambia

    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }

    const onFileInputChange = ({ target }) => {
        
        // console.log( target.files ) // archivos seleccionados que queremos subir
        if ( target.files === 0) return // abrió selector y canceló

        dispatch( startUploadingFiles( target.files ))
    }

    const onDelete = () => {
        // no hace falta enviar ninguna nota porque ya sabemos que queremos
        // eliminar la nota activa
        dispatch( startDeletingNote() )
    }

    return (
        // diferencia entre <Box /> y <Grid />:
        // Box actua como un div y Grid permite tener containers con
        // items dentro
        <Grid 
            container 
            direction = 'row' 
            justifyContent = 'space-between' 
            alignItems = 'center' 
            sx = {{ mb:1 }}
            className="animate__animated animate__fadeIn">
            
            <Grid item>
                <Typography fontSize = { 39 } fontWeight = 'light'>{ dateString }</Typography>
            </Grid>

            <Grid item>

                <input
                    type = "file"
                    multiple 
                    onChange = { onFileInputChange }
                    style = {{ display: 'none' }}
                    ref = { fileInputRef }
                />
                
                <IconButton
                    color = "primary"
                    disabled = { isSaving }
                    onClick={ () => fileInputRef.current.click() }>
                    <UploadOutlined />
                </IconButton>
                
                <Button
                    disabled = { isSaving } 
                    onClick = { onSaveNote }
                    color = "primary" 
                    sx = {{ padding: 2 }}>
                    <SaveOutlined sx = {{ fontSize: 30, mr: 1}}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type = "text"
                    variant = "filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label = "Titulo"
                    sx = {{ border: 'none', mb: 1 }}
                    name = "title"
                    value = { title }
                    onChange={ onInputChange }>
                </TextField>

                <TextField
                    type = "text"
                    variant = "filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué pasó hoy?"
                    minRows={ 5 }
                    name = "body"
                    value = { body }
                    onChange={ onInputChange }>
                </TextField>
            </Grid>

            <Grid container justifyContent='end'>
                <Button 
                    onClick={ onDelete } 
                    sx = {{ mt: 2}}
                    color = "error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery
                images = { activeNote.imageUrls } />

        </Grid>

    )
}
