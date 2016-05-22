import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AppBar from 'components/AppBar'

import GrantedAppsTab from 'views/ProfileView/GrantedAppsTab/GrantedAppsTab'
import BookmarkletTab from 'views/ProfileView/BookmarkletTab/BookmarkletTab'

import moment from 'moment'

export default class ProfileView extends React.Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  componentDidMount () {
    const $el = this.refs.menu
    window.$($el).find('.item').tab()
  }

  get header () {
    return (
      <AppBar title='Profile' />
    )
  }

  get userHeader () {
    const { isFetching, current } = this.props.profile
    if (isFetching) {
      return (
        <div className='ui active inverted dimmer'>
          <div className='ui large text loader'>Loading</div>
        </div>
      )
    } else if (current) {
      const since = moment(current.date).fromNow()
      return (
        <h2 className='ui header'>
          <img
            className='ui circular image'
            src={`http://www.gravatar.com/avatar/${current.hash}`}
          />
          <div className='content'>
            {current.username}
            <div className='sub header'>Member since {since}</div>
          </div>
        </h2>
      )
    }
  }

  get profile () {
    return (
      <div>
        {this.userHeader}
        <div className='ui pointing secondary menu' ref='menu'>
          <a className='item active' data-tab='apps'>Granted Apps</a>
          <a className='item' data-tab='bookmarklet'>Bookmarklet</a>
        </div>
        <div className='ui bottom attached tab active' data-tab='apps'>
          <GrantedAppsTab active />
        </div>
        <div className='ui bottom attached tab' data-tab='bookmarklet'>
          <BookmarkletTab />
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='view'>
        {this.header}
        <div className='ui main'>
          {this.profile}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps)(ProfileView)