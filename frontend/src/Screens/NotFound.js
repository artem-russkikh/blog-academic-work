import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        height: '100%',
      }}>
        <div style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: -100,
        }}>
          <img className="responsive-img" src="https://i.imgur.com/f0yZgd2.png" />
        </div>
      </div>
    )
  }
}

export default NotFound