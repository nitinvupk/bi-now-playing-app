import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import TweetContainer from './TweetContainer';

const AppComponent = (props) => {
  return (
    <div>
      <div>
        <h3>#nowplaying in San Francisco</h3>
        <p>This page shows #nowplaying tweets in San Francisco that contain a youtube link. it also allows you to post a #nowplaying tweet with a YouTube link.</p>
      </div>
      <div className="tweet-form">
        <Form onSubmit={props.createNewTweet} inline>
          <FormGroup controlId="formInlineUrl">
            <ControlLabel>Video URL:</ControlLabel>{' '}
            <FormControl
              type="text"
              placeholder="http://youtube.com"
              name="url"
              onChange={e => props.handleChange(e.target.name, e.target.value)}
            />
          </FormGroup>{' '}
          <FormGroup controlId="formInlineComment">
            <ControlLabel>Comment:</ControlLabel>{' '}
            <FormControl
              type="text"
              name="comment"
              onChange={e => props.handleChange(e.target.name, e.target.value)}
            />
          </FormGroup>{' '}
          <Button bsStyle="info" type="submit">Tweet to #nowplaying</Button>
        </Form>
      </div>
      <div className="tweet-container">
        { props.tweets.map((tweet, i) => {
          return (
            <div className="tweet-box" key={tweet.id}>
              <div className="tweet-header">
                <div className="media">
                  {tweet.extended_entities && tweet.extended_entities.media[0].type === "photo" && (
                    <img
                      style={{width: '80%', height: 'auto'}}
                      src={tweet.extended_entities.media["0"].media_url}
                      alt="user tweet image" />)
                  }
                  {tweet.extended_entities && (tweet.extended_entities.media[0].type === "animated_gif"
                  || tweet.extended_entities.media[0].type === "video") && (
                    <video width="100%" height="250px" name="media" controls>
                      <source src={tweet.extended_entities.media["0"].video_info.variants[0].url} type="video/mp4" />
                    </video>)
                  }
                </div>
                <TweetContainer {...tweet}/>
              </div>
            </div>
          )
        })}
      </div>
      <div>

      </div>
    </div>
  );
};

export default AppComponent;
