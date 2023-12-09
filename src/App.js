import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 10;
  state = {
    progress: 0,
    apikey: process.env.REACT_APP_NEWS_API
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        height={4}
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
      />
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<News apikey={this.state.apikey} setProgress={this.setProgress}  pageSize={this.pageSize} country={'in'} category={'general'}/>}></Route>
            <Route exact path='/business' element={<News apikey={this.state.apikey} setProgress={this.setProgress}  key={'business'}  pageSize={this.pageSize} country={'in'} category={'business'}/>}></Route>
            <Route exact path='/entertainment' element={<News apikey={this.state.apikey} setProgress={this.setProgress}  key={'entertainment'} pageSize={this.pageSize} country={'in'} category={'entertainment'}/>}></Route>
            <Route exact path='/health' element={<News apikey={this.state.apikey} setProgress={this.setProgress}  key={'health'} pageSize={this.pageSize} country={'in'} category={'health'}/>}></Route>
            <Route exact path='/science' element={<News apikey={this.state.apikey} setProgress={this.setProgress}  key={'science'} pageSize={this.pageSize} country={'in'} category={'science'}/>}></Route>
            <Route exact path='/sports' element={<News apikey={this.state.apikey} setProgress={this.setProgress}  key={'sports'} pageSize={this.pageSize} country={'in'} category={'sports'}/>}></Route>
            <Route exact path='/technology' element={<News apikey={this.state.apikey} setProgress={this.setProgress}  key={'technology'} pageSize={this.pageSize} country={'in'} category={'technology'}/>}></Route>
            <Route exact path='/general' element={<News apikey={this.state.apikey} setProgress={this.setProgress}  key={'general'} pageSize={this.pageSize} country={'in'} category={'general'}/>}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

