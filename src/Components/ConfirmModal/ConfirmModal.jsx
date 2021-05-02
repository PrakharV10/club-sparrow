import React from 'react'
import { useParams } from 'react-router'
import { db } from '../../firebase'
import './ConfirmModal.css'

function ConfirmModal({ confirmModal, setConfirmModal }) {

    const { groupId } = useParams();
    
    async function archiveGroupHandler() {
        await db.collection('group')
            .doc(groupId)
            .set({
                active : 0
            }, { merge: true })
        console.log("successfully deleted");
        setConfirmModal(false)
    }

    return (
        <div
            onClick={() => setConfirmModal(false)}
            className={confirmModal ? "modal-bg" : "modal-bg hide"}
        >
            <div
                onClick={e => e.stopPropagation()}
                className="modal">
                <div className="modal-text">
                    Confirm Delete
                </div>
                <div className="modal-subtext">
                    Are you sure you want to proceed?
                </div>
                <div className="bottom-button">
                    <div onClick={archiveGroupHandler} className="delete-btn">
                        DELETE
                    </div>
                    <div onClick = {() => setConfirmModal(false)} className="cancel-btn">
                        CANCEL
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
