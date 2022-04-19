import { useQuery } from "@apollo/client"
import Grid from "@mui/material/Grid"
import React from "react"
import { NOTES } from "../api_calls/Note"
import { NoteProps } from "../types"
import CreateArea from "./CreateArea"
import Footer from "./Footer"
import Header from "./Header"
import Note from "./Note"

function App() {
  const { data } = useQuery(NOTES)

  return (
    <div className="page">
      <Header />

      <div className="note-area">
        <Grid container>
          <CreateArea />
        </Grid>

        <Grid container spacing={0}>
          {data?.notes?.map(({ id, title, content }: NoteProps, index: number) => {
            return (
              <Grid
                container
                item
                key={index}
                xs={12}
                sm={6}
                md={3}
                spacing={0}
              >
                <Note
                  key={index}
                  id={id}
                  title={title}
                  content={content}
                />
              </Grid>
            )
          })}
        </Grid>
      </div>

      <Footer />
    </div>
  )
}

export default App
