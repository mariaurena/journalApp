import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({})

    // cada vez que formState cambia (cambio en nombre, email ...) 
    // se llamará a createValidators()
    useEffect( () => {
        createValidators()
    }, [ formState ])


    // cada vez que cambia el formulario inicial
    useEffect( () => {
        setFormState( initialForm )
    }, [ initialForm ])

    // isFormValid será true si todos los campos valen null,
    // si alguno tiene un mensaje de error entonces el formulario no es válido
    const isFormValid = useMemo( () => {

        // recorremos cada objeto de formValidation
        for (const formValue of Object.keys( formValidation )) {
            // comprobamos si alguno es null
            if ( formValidation[ formValue ]!== null ) return false
        }

        return true

    }, [ formValidation ])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {} 

        // recorremos los arreglos de validación de cada campo:
        // email, password, displayName
        for (const formField of Object.keys( formValidations )) {
            
            // obtenemos la función que queremos evaluar y el mensaje de error
            // de cada uno de los campos
            const [ fn, errorMessage ] = formValidations[formField]

            // null si está bien o texto de error si hay un error 
            formCheckedValues[`${ formField }Valid`] = fn( formState[ formField ]) ? null : errorMessage
        }

        setFormValidation( formCheckedValues )
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}