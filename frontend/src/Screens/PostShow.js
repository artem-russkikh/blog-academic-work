import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Link } from 'react-router';

import data from '../data'

class PostShow extends Component {
  render () {
    let content = (
      <Typography variant='alignCenter'>
        Нет такой записи, вернитесь <Link to="/">на главную</Link>
      </Typography>
    );

    const { params } = this.props
    const postId = params && params.id ? params.id : null
    const post = data.find(el => parseInt(el.id) === parseInt(postId))

    if (post) {
      const { image, title, description, body } = post

      let titleMd = ''
      let descriptionMd = ''
      let bodyMd = ''

      if (title) {
        titleMd = `# ${title}`
      }
      if (description) {
        descriptionMd = description.split('\n').map(el => el ? `> ${el}\n` : '').join('')
      }
      if (body) {
        bodyMd = body
      }

      content = (
        <div>
          <div style={{
            background: `url(${image})`,
            height: 300,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top',
          }} />
          <ReactMarkdown
            className='markdown-preview'
            source={titleMd}
            plugins={[breaks]}
          />
          <ReactMarkdown
            className='markdown-preview'
            source={descriptionMd}
            plugins={[breaks]}
          />
          <ReactMarkdown
            className='markdown-preview'
            source={bodyMd}
            plugins={[breaks]}
          />
        </div>
      )
    }

    return (
      <div className="container">
        <Grid container>
          <Grid item xs={12}>
            { content }
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PostShow;
