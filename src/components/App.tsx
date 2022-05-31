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
  // const [userId, setUserId] = useState(window.localStorage.getItem("userId"))

  // window.addEventListener('storage', () => {
  //   setUserId(window.localStorage.getItem("userId"))
  // })

  // if (userId) {
  const { data } = useQuery(NOTES)
  // const data = { notes: [{ id: "1", title: "yes", content: "no" }] }

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
  // } else {
  //   return <Login />
  // }
}

export default App
