import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TweetEmbed from 'react-tweet-embed'
import './TweetViewer.css';

class TweetViewer extends Component {
  constructor() {
    super()
    let postsToShow = 12

    this.state = {
      postsToShow,
    }
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (distanceToBottom < 150) {
      this.setState({ postsToShow: this.state.postsToShow + 12 })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  render() {
    const tweets = this.props.tweetIds
    return (<div className="App">
      <div>{
        tweets.slice(0, this.state.postsToShow).map((t, i) => {
          return (<TweetEmbed
            key={`t${i}`}
            id={t}
            options={{cards: 'hidden'}} />)
        })
      }</div>
    </div>)
  }
}

TweetViewer.propTypes = {
  tweetIds: PropTypes.array.isRequired
}

export default TweetViewer;
