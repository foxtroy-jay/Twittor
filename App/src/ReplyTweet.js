import React from 'react';
import { Drizzle } from 'drizzle';
import options from './drizzleOptions';
import ReplyForm from './ReplyForm';

const drizzle = new Drizzle(options);

export default class SingleTweet extends React.Component {
  constructor(props) {
    super();
    this.state = { tweetData: '' };
  }
  async componentDidMount() {
    // call the func here
    const tweetData = await this.getData(
      this.props.address,
      this.props.index,
      this.props.replyIndex
    );
    this.setState({ tweetData });
    console.log(this.state);
  }

  getData = async (address, index, replyIndex) => {
    const result = await drizzle.contracts.Twittor.methods
      .getReply(address, index, replyIndex)
      .call();

    // console.log(result, 'GETDATA RESULT');
    return result;
  };

  render() {
    // console.log(this.state.tweetData, 'REPLY TWEET STATE');
    return (
      <div>
        <h1>Reply</h1>
        <p>Reply:{this.state.tweetData}</p>
      </div>
    );
  }
}
