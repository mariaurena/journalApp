import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({

    name: 'journal',

    initialState: {
       isSaving: false,
       messageSaved: '',
       notes: [],
       activeNote: null,
    //    activeNote: {
    //         id: 'ABC123',
    //         title: '',
    //         body: '',
    //         date: 1234567,
    //         imageUrls: []
    //    }
    },

    reducers: {

        // si isSaving está en true el botón tiene que estar deshabilitado
        savingNewNote: (state) => {
            state.isSaving = true
        },

        // añadir nueva nota inicial vacía
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload )
            state.isSaving = false
        },

        // establecer la nota activa en el journal
        setActiveNote: (state, action) => {
            state.activeNote = action.payload
            state.messageSaved = ''
        },

        // cargar las notas
        setNotes: (state, action) => {
            state.notes = action.payload
        },

        // guardar una nota
        setSaving: (state, action) => {
            state.isSaving = true
            state.messageSaved = ''
        },

        // actualizar una nota
        updateNote: (state, action) => { // payload: note
            state.isSaving = false
            state.notes = 
            state.notes.map( note => {

                // actualizamos la nota que obtenemos del payload
                // la buscamos por su id
                if ( note.id === action.payload.id ){
                    return action.payload
                }

                return note
            })
            
            state.messageSaved = `${ action.payload.title }, actualizada correctamente`
        },

        // añadimos las imageUrls a la nota activa
        setPhotosToActiveNote: (state, action ) => {
            state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...action.payload]
            state.isSaving = false
        },

        // al hacer logout limpiamos las notas
        clearNotesLogout: (state) => {
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.activeNote = null
        },

        // eliminar una nota
        deleteNoteById: (state, action) => { // payload: id de la nota a eliminar
            state.active = null
            // eliminar o filtrar la nota cuyo id coincide con el payload
            state.notes = state.notes.filter( note => note.id !== action.payload )
        },
    }

});


// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById
} = journalSlice.actions;