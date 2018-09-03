import React, { Component } from 'react';
import './App.css';
import AppComponent from './components/AppComponent';
import axios from 'axios';
import socketIOClient from "socket.io-client";

class App extends Component {
  state = {
    tweets: [],
    url: null,
    comment: null,
    geolocation: {},
  };

  getTweetswithCoords = ({ coords }) => {
    this.setState(prevProps =>
      ({ ...prevProps,
        geolocation: { latitude: coords.latitude, longitude: coords.longitude },
      }));
    this.getTweets();
    const { geolocation } = this.state;
    const socket = socketIOClient(`http://localhost:5000?lat=${geolocation.latitude}&lon=${geolocation.longitude}`);
    socket.on("getRecentTweets", res => this.setState(prevProps => ({ ...prevProps, tweets: res.tweets.statuses })));
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getTweetswithCoords);
  }

  handleChange = (key, value) => {
    this.setState({ ...this.state, [key]: value });
  }

  getTweets = () => {
    const { geolocation } = this.state;
    axios.get(`http://localhost:5000/api/tweets?lat=${geolocation.latitude}&lon=${geolocation.longitude}`)
      .then(res => {
        this.setState({tweets: res.data.tweets.statuses})
    });
  }

  concatTweets = async () => {
    const { geolocation, tweets } = this.state;
    if (!tweets[0]) return;
    const moreTweets = await axios.get(`http://localhost:5000/api/tweets?lat=${geolocation.latitude}&lon=${geolocation.longitude}&maxId=${tweets[tweets.length - 1].id_str}`);
    this.setState(prevProps => ({...prevProps, tweets: [...prevProps.tweets, ...moreTweets.data.tweets.statuses]}));
  }

  createNewTweet = async (event) => {
    event.preventDefault();
    const { url, comment, geolocation } = this.state;
    await axios.post('http://localhost:5000/api/tweet',
    {
      url, comment,
      lat: geolocation.latitude,
      lon: geolocation.longitude,
    }, { headers: { 'Content-Type': 'application/json' }});
    this.getTweets();
  }

  render() {
    return (
      <AppComponent {...this.state}
        concatTweets={this.concatTweets}
        createNewTweet={this.createNewTweet}
        handleChange={this.handleChange}
      />
    );
  }
}

export default App;
