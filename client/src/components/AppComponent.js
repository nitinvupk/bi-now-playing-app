import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

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
                {tweet.text}
              </div>
              <div className="tweet-body">
                <div>
                  Image
                </div>
                <div>
                  Content
                </div>
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
