import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import Button from 'material-ui/Button';
import { Link } from 'react-router';

//import data from '../data'
import axios from 'axios'

export default class PostShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      noContent: false,
      post_id: 0,
    }
  }

  set_default(text) {
    this.setState({ noContent: true, strub: text })
  }

  componentDidMount() {
    const { params } = this.props
    const postId = (params && params.id) ? params.id : null

    if (postId == null) {
      this.set_default('Ошибка: нет такого поста');
      return;
    }

    axios.get(`http://127.0.0.1:5000/posts/${postId}.json`)
      .then(res => {
        const errCode = res.data['error']['code'];

        if (errCode !== 0) {
          this.set_default('Ошибка сервера');
          return;
        }

        const post_data = res.data['result'];
        this.setState({
          noContent: false,
          post_id: postId,
          ...post_data,
        });
      })
      .catch(err => {
        if (err.request && err.request.status === 404)
          this.set_default('Пост удален или еще не был создан.');
        else
          this.set_default('Ошибка');
      });
  }

  render() {
    //const post = data.find(el => parseInt(el.id, 10) === parseInt(postId, 10))
    let content = this.state.noContent ?
      (
        <div>
          <Typography variant='alignCenter'>
            {this.state.strub}
          </Typography>
        </div>
      )
      :
      (
        <div>
          <div style={{
            background: `url(${this.state.image}) center top / cover no-repeat`,
            height: 300,
            backgroundPosition: 'center top',
          }} />
          <ReactMarkdown
            className='markdown-preview'
            source={this.state.title}
            plugins={[breaks]}
          />
          <ReactMarkdown
            className='markdown-preview'
            source={this.state.description}
            plugins={[breaks]}
          />
          <ReactMarkdown
            className='markdown-preview'
            source={this.state.body}
            plugins={[breaks]}
          />
          <Button
            color="inherit"
            variant="raised"
            component={Link}
            to={`/posts/edit/${this.state.post_id}`}
          >
            Редактировать запись
          </Button>
        </div>
      );

    return (
      <div className="container">
        <Grid container>
          <Grid item xs={12}>
            {content}
          </Grid>
        </Grid>
      </div>
    );
  }
}
