import {Component} from 'react'
import SavedVideoItem from '../SavedVideoItem'
import SavedVideosContext from '../../context/SavedVideosContext'
import Header from '../Header'
import Sidebar from '../SideBar'
import {SavedVideosContainer, SavedVideosSubContainer} from './styledComponents'

class SavedVideos extends Component {
  render() {
    return (
      <>
        <Header />
        <SavedVideosContainer>
          <Sidebar />
          <SavedVideosContext.Consumer>
            {value => {
              const {savedVideosList, darkTheme} = value
              console.log(savedVideosList)
              return (
                <SavedVideosSubContainer darkTheme={darkTheme}>
                  {savedVideosList.map(savedVideoItem => (
                    <SavedVideoItem
                      savedVideoItemDetails={savedVideoItem}
                      key={savedVideoItem.id}
                    />
                  ))}
                </SavedVideosSubContainer>
              )
            }}
          </SavedVideosContext.Consumer>
        </SavedVideosContainer>
      </>
    )
  }
}

export default SavedVideos
