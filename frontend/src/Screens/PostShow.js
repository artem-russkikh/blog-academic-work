import React, { Component } from 'react';

class PostShow extends Component {
  render() {
    const { params } = this.props
    return (
      <div>
        {params.id}
      </div>
    );
  }
}

export default PostShow;