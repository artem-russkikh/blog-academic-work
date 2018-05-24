import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import moment from 'moment';
import { Link } from 'react-router';
import axios from 'axios';

const formattedDescription = (description) => {
  return description && description.length > 120 ?
    `${description.substring(0, 120)}...` :
    description
}

const formattedCreatedAt = (createdAt) => {
  return moment.utc(createdAt).fromNow()
}

export default class Posts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 20,
      offset: 0,
      allFetched: false,
      onlyMyPosts: false,
      data: [],
      stub: 'Пока что записей нет.'
    }
  }

  componentDidMount() {
    this._fetch()
  }

  _fetch = () => {
    axios.get(`http://127.0.0.1:5000/posts.json`, {params: { limit: this.state.limit, offset: this.state.offset }})
      .then(res => {
        const errCode = res.data['error']['code'];

        if (errCode !== 0) {
          this.setState({stub:'Ошибка сервера'});
          return;
        }

        const post_data = res.data['result'];

        let allFetched = false
        if (post_data.length < this.state.limit) {
          allFetched = true
        }

        this.setState((state) => ({
          data: [...state.data, ...post_data],
          offset: state.offset + 20,
          allFetched,
        }));
      })
      .catch(err => {
          this.setState({stub:'Ошибка ' + err});
      });
  }

  toggleSwitch = (_e) => {
    this.setState({
      onlyMyPosts: !this.state.onlyMyPosts
    })
  }

  render() {
    const user = JSON.parse(window.localStorage.getItem('user'))

    return this.state.data === null ?
      (
        <div className="container">
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='headline'>
                {this.state.stub}
                </Typography>
            </Grid>
          </Grid>
        </div>
      )
      :
      (
        <div className="container">
          { user && (
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.onlyMyPosts}
                  onChange={this.toggleSwitch}
                  value="onlyMyPosts"
                  color="primary"
                />
              }
              label="Показывать только мои записи"
            />
          ) }
          <Grid container spacing={24}>
            {this.state.data.map((post, idx) => {
              {if(user && this.state.onlyMyPosts && post.author_id !== user.id) return; }
              return (
                <Grid item xs={12} sm={6} key={idx}>
                  <Card style={{ maxWidth: 450 }}>
                    <CardMedia
                      style={{
                        height: 300,
                        backgroundPosition: 'center top',
                      }}
                      image={post.image}
                    />
                    <CardContent style={{ minHeight: 92 }}>
                      <Typography variant="headline" component="h2">
                        {post.title}
                      </Typography>
                      <Typography component="p">
                        {formattedDescription(post.description)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        component={Link}
                        to={`/posts/${post.id}`}
                      >
                        Подробнее
                    </Button>
                      <Typography title={moment(post.created_at).format('lll')} style={{ marginLeft: 'auto' }}>
                        {formattedCreatedAt(post.created_at)}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          { !this.state.allFetched && (
              <div style={{
                textAlign: 'center',
                marginTop: 20,
              }}>
                <Button
                  variant='raised'
                  color="primary"
                  onClick={this._fetch}
                >
                  Еще
                </Button>
              </div>
            ) }
        </div>
      );
  }
}
