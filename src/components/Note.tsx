import { useMutation } from "@apollo/client"
import DeleteIcon from "@mui/icons-material/Delete"
import React from "react"
import { DELETE_NOTE, NOTES } from "../api_calls/Note"
import { NoteProps } from "../types"

function Note({ id, title, content }: NoteProps) {
  const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: [NOTES]
  })

  function deleteNote() {
    deleteNoteMutation({
      variables: { id }
    })
  }

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={deleteNote}>
        <DeleteIcon />
      </button>
    </div>
  )
}

export default Note
