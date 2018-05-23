import React, { Component } from 'react';

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'
import axios from 'axios';
import { browserHistory } from 'react-router';


export default class PostNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imagePreview: null,
      imageFile: null,
      data: {
        title: '',
        description: '',
        body: '',
      },
    }
  }

  show_default(text) {
    alert(text);
  }

  handleSend(e) {
    if (e) { e.preventDefault(); }

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

    axios.post(`http://127.0.0.1:5000/posts.json`, form_data, config)
      .then(res => {
        const errCode = res.data['error']['code'];

        if (errCode !== 0) {
          this.show_default('Ошибка сервера');
          return;
        }

        const post_id = res.data['result'];

        //wait, then redirect to updated post
        setTimeout(() => browserHistory.push(`/posts/${post_id}`), 500)

      })
      .catch(err => {
        this.show_default('Ошибка создания поста');
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

    return (
      <div className="container">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="headline" gutterBottom>
              Новая запись
            </Typography>

            <form onSubmit={(e) => this.handleSend(e)}>
              {this.state.imagePreview ? (
                <div
                  style={{
                    background: `url(${this.state.imagePreview}) center top / cover no-repeat`,
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

                <Button type='submit' variant="raised" color="primary">
                  Отправить
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}
