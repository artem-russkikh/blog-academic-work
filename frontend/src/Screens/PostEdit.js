import React, { Component } from 'react';

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'
import { Link } from 'react-router'

import data from '../data'

export default class PostEdit extends Component {
  constructor(props) {
    super(props)

    const { params } = props
    const postId = params && params.id ? params.id : null
    const post = data.find(el => parseInt(el.id, 10) === parseInt(postId, 10))

    this.state = {
      imagePreview: post.image,
      imageFile: null,
      data: {
        title: post.title,
        description: post.description,
        body: post.body,
      },
    }
  }

  handleSend(e) {
    if (e) { e.preventDefault(); }

    const data = this.state.data

    if (this.state.imageFile) {
    }

    console.log(this.state.imageFile)
    console.log(data)
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
            imagePreview: fr.result
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
    let content = (
      <Typography variant='alignCenter'>
        Нет такой записи, вернитесь <Link to="/">на главную</Link>
      </Typography>
    );

    const { params } = this.props
    const postId = params && params.id ? params.id : null
    const post = data.find(el => parseInt(el.id, 10) === parseInt(postId, 10))

    if (post) {
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
            { this.state.imagePreview ? (
              <div
                style={{
                  background: `url(${this.state.imagePreview}) center top / cover no-repeat`,
                  height: 300,
                }}
                onClick={() => { this.fileInput.click() }}
              />
            ) : false }

            <input
              ref={r => { this.fileInput = r ;} }
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

              <Button type='submit' variant="raised" color="primary">
                Отправить
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
