import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
    //because maybe there are multiple collections within a website, every collection we try to get, it needs its own error
    const error = ref(null)
    const isPending = ref(false)

    // add a new document
    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true

        try {
            const res = await projectFirestore.collection(collection).add(doc)
            isPending.value = false
            return res
        } catch(err) {
            console.log(err.message)
            error.value = 'could not send the message'
            isPending.value = false
        }
    }

    return { error, addDoc, isPending }
}

export default useCollection