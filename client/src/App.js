import React, { Component } from 'react';
import './App.css';
import AppComponent from './components/AppComponent';
import axios from 'axios';

class App extends Component {
  state = {
    tweets: [],
    url: null,
    comment: null
  };

  componentDidMount() {
    this.getTweets();
  }

  handleChange = (key, value) => {
    console.log(key, value);
    this.setState({ ...this.state, [key]: value });
  }

  getTweets = () => {
    axios.get(`http://localhost:5000/api/tweets`)
      .then(res => {
        this.setState({tweets: res.data.tweets.statuses})
      });
  }

  createNewTweet = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/tweet', {
      url: this.state.url,
      comment: this.state.comment
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res);
    });
  }

  render() {
    console.log(this.state)
    return (
      <AppComponent {...this.state}
        createNewTweet={this.createNewTweet}
        handleChange={this.handleChange}
      />
    );
  }
}

export default App;
