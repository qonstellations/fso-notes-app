import { useState, useEffect } from 'react'

import Footer from './components/Footer'
import Notification from './components/Notification'
import Note from './components/Note'

import noteService from './services/notes'

const App = () => {
  const [ notes, setNotes ] = useState(null)
  const [ newNote, setNewNote ] = useState('')
  const [ isImportant, setIsImportant ] = useState(false)
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(allNotes => {
        setNotes(allNotes)
      })
  }, [])

  const filteredNotes = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: isImportant
    }
    noteService.create(noteObject)
      .then(createdNote => {
        setNotes([...notes, createdNote])
        setNewNote('')
        setIsImportant(false)
      })
  }

  const toggleImportance = (id) => {
    const note = notes.find(note => note.id === id)
    const modifiedNote = {...note, important: !note.important} 
    noteService.update(id, modifiedNote)
      .then(updatedNote => {
        setNotes(notes.map(note => note.id === id ? updatedNote : note))
      })
  }

  const handleNoteChange = (event) => setNewNote(event.target.value)
  const handleImportanceChange = (event) => setIsImportant(event.target.checked)
  
  if(notes === null) return null

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'imp only' : 'all'}
        </button>
      </div>

      <ul>
        {filteredNotes.map(note => 
          <Note key={note.id} 
          note={note} 
          toggleImportance={() => toggleImportance(note.id)} 
          />)}
      </ul>

      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <input type="checkbox" checked={isImportant} onChange={handleImportanceChange} />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App