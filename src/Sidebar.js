import React from 'react'
import { MdDeleteForever } from 'react-icons/md'

export default function Sidebar(props) {
    //console.log(props)
    const noteElements = props.notes.map((note, index) => {
        return (
            <div 
                key={note.id} 
                className={`sidebar-noteElements ${
                    note.id === props.currentNote.id ? "selected" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <p>Note {index+1}</p>
                <MdDeleteForever id="delete-button" onClick={(event)=>props.deleteNote(event, note.id)}/>
            </div>
        )
    })
    return (
        <div className="sidebar-container">
            <div id="sidebar-header">
                <h1 id="sidebar-header-title">Notes</h1>
                <button id="sidebar-header-button" onClick={props.newNote}><h3>+</h3></button>
            </div>
            <div>
                {noteElements}
            </div>
        </div>
    )
}