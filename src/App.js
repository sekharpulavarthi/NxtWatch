import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import LoginForm from './components/LoginForm'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import SavedVideosContext from './context/SavedVideosContext'
import SavedVideos from './components/SavedVideos'
import './App.css'

// Replace your code here
class App extends Component {
  state = {savedVideosList: [], darkTheme: false}

  addVideoItem = videoDetails => {
    // console.log(videoDetails)
    const {savedVideosList} = this.state
    const checkVideo = savedVideosList.find(
      eachVideo => eachVideo.id === videoDetails.id,
    )
    if (checkVideo === undefined) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, videoDetails],
      }))
    } else {
      const filteredVideos = savedVideosList.filter(
        eachVid => eachVid.id !== videoDetails.id,
      )
      this.setState({savedVideosList: filteredVideos})
    }
  }

  onChangeTheme = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  render() {
    const {savedVideosList, darkTheme} = this.state
    return (
      <SavedVideosContext.Provider
        value={{
          savedVideosList,
          addVideoItem: this.addVideoItem,
          darkTheme,
          onChangeTheme: this.onChangeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SavedVideosContext.Provider>
    )
  }
}

export default App
