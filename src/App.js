import React from 'react'
import Sidebar from './Sidebar';
import Editor from './Editor';
import Split from 'react-split'
import { nanoid } from 'nanoid'
import './App.css';

function App() {
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || [])
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ''
  )

  React.useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])
  console.log(notes, currentNoteId)


    function addNewNote() {
      let newNote = {
        id: nanoid(),
        body: "# This is a new note"
      }
      setNotes(oldNotes => [newNote, ...oldNotes])
      setCurrentNoteId(newNote.id)
    }

    function deleteNote(event, noteId) {
      event.stopPropagation()
      setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
      if (noteId === currentNoteId){
        setCurrentNoteId(notes[0].id)
      }
    }

    function findCurrentNote() {
      return notes.find(note => {
          return note.id === currentNoteId
      }) || notes[0]
  }

    function updateBody(text) {
      setNotes(oldNote => 
        oldNote.map(note => 
          note.id === currentNoteId ?
           {...note, body: text} : note
        )
      )}

  return (
    <main className="App">
      {
        notes.length > 0 ? 
        <Split 
          sizes={[20, 80]}
          direction="horizontal"
          className="split"
        >
          <Sidebar 
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={addNewNote}
            deleteNote={deleteNote}
          />
          <Editor 
            currentNote={findCurrentNote()}
            updateBody={updateBody}
          />
        </Split>
        :
        <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={addNewNote}
                >
                    Create one now
                </button>
            </div>
      }
    </main>
  );
}

export default App;
