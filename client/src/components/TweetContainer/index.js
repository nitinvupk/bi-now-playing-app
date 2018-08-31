import React from 'react';
import './styles.css';

const tweetContainer = prop =>
    <div id="tweet">
      {console.log(prop.extended_entities)}
      <div className="tweet-container pb">
        <div className="user pr">
          <img src={prop.user.profile_image_url} alt="user" />
          <div className="username">
            <div className="name">{prop.user.name}</div>
            <div className="handle">{`@${prop.user.screen_name}`}</div>
          </div>
        </div>
        <div className="tweet-content pt">{prop.text}</div>
        <div className="date pt pb">{prop.created_at} from <a>{prop.user.location || 'WorldWide'}</a></div>

        <div className="rl">
          <div className="retweets"><b>{prop.retweet_count}</b> Retweets</div>
          <div className="likes"><b>{prop.favorite_count}</b> Likes</div>
        </div>
      </div>
      <div className="icons">
        <div className="ico"><i className="material-icons">reply</i></div>
        <div className="ico"><i className="material-icons">repeat</i></div>
        <div className="ico"><i className="material-icons">favorite</i></div>
        <div className="ico"><i className="material-icons">message</i></div>

      </div>
    </div>;

export default tweetContainer;
