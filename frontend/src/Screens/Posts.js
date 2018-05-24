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
      my_id: 1,
      onlyMyPosts: false,
      data: null,
      stub: 'Пока что записей нет.'
    }
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:5000/posts.json`, {params: { limit: 20, offset: 0 }})
      .then(res => {
        const errCode = res.data['error']['code'];

        if (errCode !== 0) {
          this.setState({stub:'Ошибка сервера'});
          return;
        }

        const post_data = res.data['result'];

        if(post_data.length != 0)
          this.setState({data: post_data});
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
    return this.state.data == null ?
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
          <Grid container spacing={24}>
            {this.state.data.map((post, idx) => {
              {if(this.state.onlyMyPosts && post.author_id != this.state.my_id) return; }
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
        </div>
      );
  }
}
