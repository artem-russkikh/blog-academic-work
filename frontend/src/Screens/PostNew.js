import React, { Component } from 'react';

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'


class PostNew extends Component {
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
    let previewSource = ''

    const { title, description, body } = this.state.data

    if (title) {
      previewSource = `# ${title}\n`
    }
    if (description) {
      previewSource = `${previewSource}> ${description}\n\n`
    }
    if (body) {
      previewSource = `${previewSource}${body}`
    }

    return (
      <div className="container">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="headline" gutterBottom>
              Новая запись
            </Typography>

            <form onSubmit={(e) => this.handleSend(e)}>
              { this.state.imagePreview ? (
                <img
                  style={{
                    height: 200
                  }}
                  alt='Изображение'
                  src={this.state.imagePreview}
                  onClick={() => { this.fileInput.click() }}
                />
              ) : false }

              <input
                ref={r => { this.fileInput = r ;} }
                onChange={(e) => this.handleImage(e)}
                style={{ display: 'none' }}
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
                rows={2}
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
                  source={previewSource}
                  plugins={[breaks]}
                />
              </Paper>

              <Button color="primary" onClick={() => { this.fileInput.click() }}>
                Прикрепить изображение
              </Button>

              <Button type='submit' variant="raised" color="primary">
                Отправить
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = {
}

export default PostNew;
