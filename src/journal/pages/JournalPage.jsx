import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { NoteView } from "../views/NoteView"

export const JournalPage = () => {

  // si isSaving está en true el botón tiene que estar deshabilitado
  const { isSaving, activeNote } = useSelector( state => state.journal )

  const dispatch = useDispatch()

  const onClickNewNote = () => {

    dispatch( startNewNote() )

  }

  return (
    <JournalLayout>

      {
        // doble negación para convertir null a false o true 
        (!!activeNote) 
          ? <NoteView />             // Mostramos esto si hay notas activas
          : <NothingSelectedView />  // Mostramos esto si no hay notas activas

      }

      <IconButton
        disabled = { isSaving }
        onClick = { onClickNewNote }
        size = 'large'
        sx = {{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >

        <AddOutlined sx = {{ fontSize: 30 }} />

      </IconButton>


    </JournalLayout>
  )
}
  
  