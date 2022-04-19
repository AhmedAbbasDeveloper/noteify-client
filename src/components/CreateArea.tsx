import { useMutation } from "@apollo/client"
import AddIcon from "@mui/icons-material/Add"
import Fab from "@mui/material/Fab"
import Zoom from "@mui/material/Zoom"
import React, { useState } from "react"
import { CREATE_NOTE, NOTES } from "../api_calls/Note"


function CreateArea() {
  const [createNoteMutation] = useMutation(CREATE_NOTE, {
    refetchQueries: [NOTES]
  })

  const [isExpanded, setExpanded] = useState(false)

  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  function handleChange(event: any) {
    const { name, value } = event.target
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  function createNote(event: any) {
    event.preventDefault()
    if (note.title) {
      createNoteMutation({
        variables: {
          title: note.title,
          content: note.content
        }
      })
      setNote({
        title: "",
        content: ""
      })
    }
  }

  return (
    <form className="create-note" onSubmit={createNote}>
      <div className="create-note-input">
        {isExpanded && (
          <input
            name="title"
            type="text"
            value={note.title}
            placeholder="Title"
            autoFocus
            onChange={handleChange}
          />
        )}

        <textarea
          name="content"
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          onChange={handleChange}
          onClick={() => setExpanded(true)}
        />
      </div>

      <Zoom in={isExpanded}>
        <Fab onClick={createNote}>
          <AddIcon />
        </Fab>
      </Zoom>
    </form>
  )
}

export default CreateArea
