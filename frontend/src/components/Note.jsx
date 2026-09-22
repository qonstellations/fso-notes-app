const Note = ({ note, toggleImportance }) => {
  return (
    <li className="note">
    {note.content}
    <input type='checkbox' defaultChecked={note.important} onClick={toggleImportance} />
    </li>
  )
}

export default Note