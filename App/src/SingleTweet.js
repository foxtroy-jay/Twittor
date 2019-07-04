import React from 'react';
import { Drizzle } from 'drizzle';
import options from './drizzleOptions';
import ReplyForm from './ReplyForm';
import ReplyTweet from './ReplyTweet';
import { ContractData } from 'drizzle-react-components';

const drizzle = new Drizzle(options);

export default class SingleTweet extends React.Component {
  constructor(props) {
    super();

    this.state = { displayReply: false };
  }
  async componentDidMount() {
    // call the func here
    const tweetData = await this.getData(this.props.address, this.props.index);
    this.setState(tweetData);
  }

  getData = async (address, index) => {
    const result = await drizzle.contracts.Twittor.methods
      .getEverythingTweetStruct(address, index)
      .call();
    return result;
  };

  render() {
    // console.log(this.props, 'single tweet');

    let length = 0;
    const getNumReplyFirstKey = Object.keys(
      this.props.props.Twittor.getNumReplies
    )[0];

    console.log(this.props.props.Twittor.getNumReplies, 'IERNO');
    if (this.props.props.Twittor.getNumReplies[getNumReplyFirstKey]) {
      length = this.props.props.Twittor.getNumReplies[getNumReplyFirstKey]
        .value;
    }
    let mapArray = [];
    if (length) {
      // console.log(length > +this.state[3]);
      // console.log(this.state, length);
      // this.setState({ '3': length });
      mapArray.length = this.state[3];
      mapArray.fill(1);
    }
    return (
      <div>
        <h1>Single</h1>
        <p>Address: {this.props.address}</p>
        <p>Block Num: {this.state[2]}</p>
        <div>
          Replies: {this.state[3]}
          <div>
            <button
              onClick={() =>
                this.setState({ displayReply: !this.state.displayReply })
              }
            >
              Reply
            </button>
            {this.state.displayReply ? (
              <div>
                {length ? (
                  mapArray
                    .map((tweet, idx) => {
                      return (
                        <ReplyTweet
                          address={this.props.address}
                          index={this.props.index}
                          replyIndex={idx}
                          key={idx}
                        />
                      );
                    })
                    .reverse()
                ) : (
                  <h2>Length is false</h2>
                )}
                <ReplyForm
                  contract="Twittor"
                  method="addReply"
                  address={this.props.address}
                  index={this.props.index}
                />
              </div>
            ) : (
              <h1>False</h1>
            )}
          </div>
        </div>

        <p>Tweet: {this.state[0]}</p>
        {/* <div className="hide"> */}
        <ContractData
          contract="Twittor"
          method="getNumReplies"
          methodArgs={[this.props.address, this.props.index]}
        />
        {/* <p>{length}</p> */}
        {/* </div> */}
      </div>
    );
  }
}
