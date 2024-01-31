import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

// title, body e id lo desestructturamos de note
export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {

    // para que el titulo no ocupe más de una linea
    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title
    }, [ title ])

    const dispatch = useDispatch()

    // activar la nota al hacer click
    const onClickNote = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) )
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onClickNote }>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>

                <Grid container>
                    <ListItemText primary = { newTitle } />
                    <ListItemText secondary = { body } />
                </Grid>
            </ListItemButton>
      </ListItem>
    )
}