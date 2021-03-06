import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import css from '../style/style.css';

import Youtube from 'youtube-api-search';

import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';

console.log("Application is started");
console.log("Youtube data API", process.env.YOUTUBE_DATA_API);

class App extends Component {
  constructor(props) {
    super(props);

    this.searchVideo("Scientism")

    this.state = { 
      videos: [],
      selectedVideo: null
    };
  }

  searchVideo(term) {
    try {
      console.log("Starting search");
      Youtube({key: process.env.YOUTUBE_DATA_API, term: term}, (videos) => {
        console.log(videos);
        this.setState({ videos });
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={(term) => this.searchVideo(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));