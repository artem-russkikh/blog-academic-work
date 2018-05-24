import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import badPasswords from '../badPasswords'
import axios from 'axios'

import { browserHistory } from 'react-router'

export default class SignUp extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
      },
      error: null,
    }
  }

  handleChange = (type) => (e) => {
    let newState = {
      data: {
        ...this.state.data,
        [type]: e.target.value
      },
      error: null,
    }

    const { email, password, passwordRepeat } = newState.data

    if (type === 'password' || type === 'passwordRepeat') {
      const passwordRegexp = /(^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$)/

      if (password !== passwordRepeat) {
        newState.error = 'Пароли не совпадают'
      }

      if (badPasswords.indexOf(password) !== -1) {
        newState.error = 'Пароль слишком простой'
      }

      if (!password.match(passwordRegexp)) {
        newState.error = 'Пароль должен быть не менее 8 символов; содержать буквы, цифры и специальные символы'
      }
    }

    if (type === 'email') {
      const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

      if (!email.match(emailRegexp)) {
        newState.error = 'Email некорректный'
      }
    }

    if (!password && !passwordRepeat && !email) {
      newState.error = undefined
    }

    this.setState(newState)
  }

  handleSend(e) {
    if (e) { e.preventDefault(); }

    if (this.state.error) {
      return
    }

    const data = this.state.data

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('password2', data.passwordRepeat)

    axios.post(`http://127.0.0.1:5000/signup.json`, formData).then(res => {
      const data = res.data['result'];
      window.localStorage.setItem('user', JSON.stringify(data))
      browserHistory.push(`/`)
    }).catch(err => {
      if (err.message === 'Network Error' || err.status === 500) {
        alert('Ошибка на сервере')
      } else {
        alert('Некорректный пароль или email')
      }
    });
  }

  render() {
    const { error } = this.state

    return (
      <div style={{
        display: 'flex',
        flex: 1,
        height: '100%'
      }}>
        <div style={{
          display: 'flex',
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          <Card style={{
            marginTop: 40,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
            paddingTop: 20,
            maxWidth: 500
          }}>
            <form onSubmit={(e) => this.handleSend(e)}>
              <CardContent style={{ minHeight: 92 }}>
                <Typography variant="headline" component="h2">
                  Регистрация
                </Typography>

                { error ? (
                  <Typography gutterBottom style={{color: 'red'}}>
                    {error}
                  </Typography>
                ) : false }

                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Имя"
                  type="current-name"
                  margin="normal"
                  value={this.state.data.name}
                  onChange={this.handleChange('name')}
                />
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Адрес эл. почты"
                  type="email"
                  margin="normal"
                  value={this.state.data.email}
                  onChange={this.handleChange('email')}
                />
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Пароль"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  value={this.state.data.password}
                  onChange={this.handleChange('password')}
                />
                <TextField
                  required
                  fullWidth
                  id="passwordRepeat"
                  label="Подтвердите пароль"
                  type="password"
                  margin="normal"
                  value={this.state.data.passwordRepeat}
                  onChange={this.handleChange('passwordRepeat')}
                />
              </CardContent>
              <CardActions>
                <Button disabled={!!error} fullWidth type='submit' variant='raised' size="small" color="primary">
                  Зарегистрироваться
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}
