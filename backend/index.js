import express from 'express'
import cors from 'cors'

const app = express()

// middlewares
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

let notes = [
  {
      id: 1,
      content: 'note 1',
      important: true
  },
  {
      id: 2,
      content: 'note 2',
      important: false
  },
  {
      id: 3,
      content: 'note 3',
      important: false
  }
]

// routes
app.get('/api/health', (req, res) => {
  return res.json({
		status: 'ok'
	})
})

app.get('/api/notes', (req, res) => {
  return res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)

  if(note){
    return res.json(note)
  }
  else{
    return res.status(404).end()
  }
})

app.post('/api/notes', (req, res) => {
  const { content, important } = req.body

  if(!content){
    return res.status(400).json({
      'error': 'content is missing!'
    })
  }

  const newNote = {
      id: Math.max(...notes.map(note => note.id), 0) + 1,
      content: content,
      important: important || false
  }
  notes.push(newNote)

  return res.json(newNote)
})

app.put('/api/notes/:id', (req, res) => {
  const note = notes.find(note => note.id === Number(req.params.id))

  if(note){
    note.content = req.body.content
    note.important = req.body.important
    
    return res.json(note)
  }
  else{
    return res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	const note = notes.find(note => note.id === id)

	if(note){
		notes = notes.filter(note => note.id !== id)
		return res.status(204).end()
	}
	else{
		return res.status(404).end()
	}
})

// middleware for unknown endpoints
const unknownEndpoint = (req, res) => {
	res.status(404).json({
	error: 'unknown endpoint'
	})
}
app.use(unknownEndpoint)

const PORT =process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})
