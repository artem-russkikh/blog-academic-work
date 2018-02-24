import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class SignIn extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: '',
        password: '',
      },
    }
  }

  handleChange = (type) => (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [type]: e.target.value
      }
    })
  }

  handleSend(e) {
    if (e) { e.preventDefault(); }

    const data = this.state.data

    console.log(data)
  }

  render() {
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
                  Вход
              </Typography>
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
              </CardContent>
              <CardActions>
                <Button fullWidth type='submit' variant='raised' size="small" color="primary">
                  Войти
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}

export default SignIn;
