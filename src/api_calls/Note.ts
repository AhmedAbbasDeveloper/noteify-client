import { gql } from "@apollo/client"

export const NOTES = gql`
  query GetNote {
    notes {
      id 
      title
      content
    }
  }
`

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $content: String!) {
    createNote(title: $title, content: $content) {
      id
      title
      content
    }
  }
`

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id)
  }
`