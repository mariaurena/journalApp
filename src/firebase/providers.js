import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

// --- TAREAS ASINCRONAS ---

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        const { displayName, email, photoURL, uid} = result.user

        return {
            ok: true,
            // user info
            displayName, email, photoURL, uid
        }

    } catch (error){
        
        // const errorCode = error.code
        const errorMessage = error.message

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    try {

        console.log( { email, password, displayName })

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user

        // actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName } )

        return {
            ok: true, 
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        // aqui podriamos hacer validaciones de los códigos de error
        // para mostrar un mensaje personalizado 
        return { ok: false, errorMessage: error.message}
        
    }
}

export const loginUserWithEmailPassword = async({ email, password }) => {
    // await signInWithEmailAndPassword

    try {

        // console.log( { email, password, displayName })

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName } = resp.user

        return {
            ok: true, 
            uid, photoURL, displayName
        }
        
    } catch (error) {
        // aqui podriamos hacer validaciones de los códigos de error
        // para mostrar un mensaje personalizado 
        return { ok: false, errorMessage: error.message}
        
    }
}

export const logoutFirebase = async() => {

    // para cerrar google, firebase y demás 
    return await FirebaseAuth.signOut()
    
}