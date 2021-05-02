import { db } from "../firebase"

export function getAllUsers() {
    const users = db.collection('users')
        .onSnapshot(querySnapshot => {
            const users = querySnapshot.docs.map(doc => doc.data())
            return users
        })
    
    const usersArray = async () => {
        const a = await users
        return a
    }

    return usersArray();
} 
