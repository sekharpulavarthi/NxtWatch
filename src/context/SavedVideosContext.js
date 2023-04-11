import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideosList: [],
  addVideoItem: () => {},
  darkTheme: false,
  onChangeTheme: () => {},
})

export default SavedVideosContext
