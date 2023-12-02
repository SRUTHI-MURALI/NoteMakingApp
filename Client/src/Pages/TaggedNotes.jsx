import React from 'react'
import Header from '../Components/UserHome/Header'
import TagNotes from '../Components/TaggedNotes/TagNotes'


function TaggedNotes() {

    const tags="tags"
  return (
    <div>
      <Header page={tags}/>
      <TagNotes/>
    </div>
  )
}

export default TaggedNotes
