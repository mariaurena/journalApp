import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from "../../helpers/fileUpload"

// --- FUNCIONES ASÍNCRONAS ---

// al hacer click en el botón de + se llamará a esta función
export const startNewNote = () => {

    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() )

        // console.log( getState() )
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        // usamos el uid del usuario autenticado para llegar a:
        // uid-user/journal/notes
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )

        // SetDoc para insertar la nueva nota:
        // primer  arg -> referencia al documento donde queremos insertarlo
        // segundo arg -> objeto que queremos grabar
        // const setDocResp = 
        await setDoc( newDoc, newNote )
        // console.log( { newDoc, setDocResp } )

        newNote.id = newDoc.id
        
        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )

        // dispatch( activarNote )
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        if (!uid) throw new Error('El UID del usuario no existe')

        const notes = await loadNotes( uid )

        dispatch( setNotes( notes ) )
        
    }
}

// al hacer click en guardar se guardará la nota activa que ya está actualizada
export const startSaveNote = () => {

    return async( dispatch, getState ) => {

        // bloquear todo y poner app en estado de carga
        dispatch( setSaving() )

        const { uid } = getState().auth
        const { activeNote } = getState().journal

        // nota que enviaremos a Firestore para guardar
        const noteToFireStore = {...activeNote}

        // eliminamos el id porque ya tenemos el uid que es el mismo
        delete noteToFireStore.id
        //console.log(noteToFireStore)

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`)

        // merge: true => mantener los campos anteriores que no mando nuevos
        await setDoc( docRef, noteToFireStore, { merge: true })

        // enviamos la nota actualizada con el id
        dispatch( updateNote( activeNote ) )

    } 
}

// subir las imagenes a Cloudinary
export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {

        // bloquear todo y poner app en estado de carga
        dispatch( setSaving() )

        // si solo quisiesemos subir la primera images
        // await fileUpload( files[0] )

        // para subir todas las imagenes de forma simultánea:
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        // regresa todas las promesas
        const photosUrls = await Promise.all( fileUploadPromises )
        // console.log( photosUrls )

        dispatch( setPhotosToActiveNote( photosUrls ) )

    }
}

// eliminar la nota activa (obtenemos nota activa gracias a getState)
export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        // uid del usuario que quiere borrar la nota
        const { uid } = getState().auth

        // nota activa a eliminar
        const { activeNote } = getState().journal

        // console.log({ uid, activeNote })

        // construimos la referencia al documento para llegar a la nota
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`)

        // eliminamos la nota
        await deleteDoc( docRef )

        dispatch( deleteNoteById(activeNote.id) )

    }
}