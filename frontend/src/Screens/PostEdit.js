import React, { Component } from 'react';

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'
import { Link } from 'react-router'
import axios from 'axios'
import { browserHistory } from 'react-router';

export default class PostEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      default: false,
      post_id: 0,
      author_id: '',
      data: {
        title: '',
        description: '',
        body: ''
      },
      image: '',
      imageFile: null,
    }

    //this.state = {
    //  image: post.image,
    //  imageFile: null,
    //  data: {
    //    title: post.title,
    //    description: post.description,
    //    body: post.body,
    //  },
    //}
  }

  componentDidMount() {
    const { params } = this.props
    const postId = (params && params.id) ? params.id : null

    if (postId == null) {
      this.show_default('Ошибка');
      return;
    }

    axios.get(`http://127.0.0.1:5000/posts/${postId}.json`)
      .then(res => {
        const errCode = res.data['error']['code'];

        if (errCode !== 0) {
          this.show_default(errCode === 404 ? 'Пост удален или еще не был создан' : 'Ошибка сервера');
          return;
        }

        const post_data = res.data['result'];

        this.setState({
          default: false,
          post_id: postId,
          author_id: post_data.author_id,
          data: {
            title: post_data.title,
            description: post_data.description,
            body: post_data.body
          },
          image: post_data.image
        });
      })
      .catch(err => {
        this.show_default('Ошибка');
      });
  }

  show_default(text) {
    alert(text);
  }

  handleSend(e) {
    if (e) { e.preventDefault(); }

    this.setState({ inTimeout: true })

    const data = this.state.data

    let form_data = new FormData()

    form_data.append('post_data', JSON.stringify(this.state.data))

    if (this.state.imageFile)
      form_data.append('image', this.state.imageFile)

    console.log(form_data.get('image'))
    console.log(form_data.get('data'))

    var config = {
      headers:
        {
          //FIXME: pls put token here
          'Authorization': 'test'
        }
    };


    axios.put(`http://127.0.0.1:5000/posts/${this.state.post_id}.json`, form_data, config)
      .then(res => {
        const errCode = res.data['error']['code'];

        if (errCode !== 0) {
          this.show_default('Ошибка сервера');
          return;
        }

        //wait, then redirect to updated post
        setTimeout(() => browserHistory.push(`/posts/${this.state.post_id}`), 500)

      })
      .catch(err => {
        this.show_default('Ошибка обновления поста');
      });
  }

  delete_post() {

    var config = {
      headers:
        {
          //FIXME: pls put token here
          'Authorization': 'test'
        }
    };

    axios.delete(`http://127.0.0.1:5000/posts/${this.state.post_id}.json`, config)
      .then(res => {
        const errCode = res.data['error']['code'];

        if (errCode !== 0) {
          this.show_default('Ошибка сервера');
          return;
        }

        browserHistory.push(`/`)

      })
      .catch(err => {
        this.show_default('Ошибка удаления поста');
      });
  }

  handleChange = (type) => (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [type]: e.target.value
      }
    })
  }

  handleImage = (event) => {
    let value = null
    const target = event.target || window.event.srcElement;
    const files = target.files;

    if (files && files.length) {
      value = files[0]
    }

    // FileReader support
    if (FileReader && files && files.length) {
      let fr = new FileReader();
      fr.onload = () => {
        this.setState({
          image: fr.result
        })
      }
      fr.readAsDataURL(files[0]);
    } else {
      // fallback -- perhaps submit the input to an iframe and temporarily store
      // them on the server until the user's session ends.
    }

    this.setState({
      imageFile: value
    })
  }

  render() {
    let content = '';

    if (this.state.default) {
      content = (
        <div>
          <Typography variant='alignCenter'>
            {this.state.title}
          </Typography>
        </div>
      );

    } else {

      let titleMd = ''
      let descriptionMd = ''
      let bodyMd = ''

      const { title, description, body } = this.state.data

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
          <Typography variant="headline" gutterBottom>
            Редактировать запись
          </Typography>

          <form onSubmit={(e) => this.handleSend(e)}>
            {this.state.image ? (
              <div
                style={{
                  background: `url(${this.state.image}) center top / cover no-repeat`,
                  height: 300,
                }}
                onClick={() => { this.fileInput.click() }}
              />
            ) : false}

            <input
              ref={r => { this.fileInput = r; }}
              onChange={(e) => this.handleImage(e)}
              style={{ display: 'none' }}
              accept="image/*"
              type="file"
            />

            <TextField
              required
              fullWidth
              id="title"
              label="Заголовок"
              value={this.state.data.title}
              onChange={this.handleChange('title')}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              label="Описание"
              value={this.state.data.description}
              onChange={this.handleChange('description')}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              multiline
              rows={16}
              style={{
                marginBottom: 40,
              }}
              id="body"
              label="Содержимое"
              value={this.state.data.body}
              onChange={this.handleChange('body')}
              margin="normal"
            />
            <Paper style={{
              padding: '5px 20px',
              marginBottom: 40,
            }}>
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
            </Paper>
            <div>
              <Button style={{ marginRight: 10 }} color="primary" onClick={() => { this.fileInput.click() }}>
                Прикрепить изображение
              </Button>
              <Button type='submit' disabled={this.state.inTimeout} variant="raised" color="primary" style={{ marginRight: 10 }}>
                Отправить
              </Button>
              <Button onClick={ () => { if(window.confirm('Действительно удалить пост?')) this.delete_post(); }} disabled={this.state.inTimeout} variant="raised" color="primary" style={{ backgroundColor: "#8B0000" }}>
                Удалить
              </Button>
            </div>
          </form>
        </div>
      )
    }

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
