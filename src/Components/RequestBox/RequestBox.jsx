import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db, FieldValue } from '../../firebase'
import './RequestBox.css'

function RequestBox({ request }) {

    const [localUser, setLocalUser] = useState({})
    const { groupId } = useParams();

    useEffect(() => {
        db.collection('users')
            .doc(request)
            .onSnapshot((doc) => {
               setLocalUser(doc.data())
            })
    }, [])

    async function requestAcceptor() {
        try {
            await db.collection('group')
                .doc(groupId)
                .set({
                    members : FieldValue.arrayUnion(localUser.uid)
                }, { merge: true })

            await db.collection('group')
                .doc(groupId)
                .set({
                    request : FieldValue.arrayRemove(localUser.uid)
                },{merge : true})
            
            console.log("Request Accepted")
        } catch (err) {
            console.log("Not able to Accept Request : ", err)
        }
    }

    return (
        <div className="request-box">
            <div className="name">
                {localUser.name}
            </div>
            <div onClick={requestAcceptor} className="allow">
                ALLOW
            </div>
        </div>
    )
}

export default RequestBox
