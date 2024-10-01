import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <div>
        <>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<News setProgress={this.setProgress} key='general' pageSize={6} country='us' category='general' />} />
              <Route path="/business" element={<News setProgress={this.setProgress} key='business' pageSize={6} country='us' category='business' />} />
              <Route path="/entertainment" element={<News setProgress={this.setProgress} key='entertainment' pageSize={6} country='us' category='entertainment' />} />
              <Route path="/health" element={<News setProgress={this.setProgress} key='health' pageSize={6} country='us' category='health' />} />
              <Route path="/science" element={<News setProgress={this.setProgress} key='science' pageSize={6} country='us' category='science' />} />
              <Route path="/sports" element={<News setProgress={this.setProgress} key='sports' pageSize={6} country='us' category='sports' />} />
              <Route path="/technology" element={<News setProgress={this.setProgress} key='technology' pageSize={6} country='us' category='technology' />} />
            </Routes>
            <LoadingBar
              height={3}
              color='#f11946'
              progress={this.state.progress}
            />
          </BrowserRouter>
        </>
      </div >
    )
  }
}

