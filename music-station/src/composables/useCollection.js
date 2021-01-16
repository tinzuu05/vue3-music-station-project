import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
    //because maybe there are multiple collections within a website, every collection we try to get, it needs its own error
    const error = ref(null)

    // add a new document
    const addDoc = async (doc) => {
        error.value = null

        try {
            await projectFirestore.collection(collection).add(doc)
        } catch(err) {
            console.log(err.message)
            error.value = 'could not send the message'
        }
    }

    return { error, addDoc}
}

export default useCollection