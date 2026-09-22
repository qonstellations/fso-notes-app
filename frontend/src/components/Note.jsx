const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "set to not imp" : "set to imp"

  return (
    <li className="note">
    {note.content}
    <input type='checkbox' defaultChecked={note.important} onClick={toggleImportance} />
    </li>
  )
}

export default Note