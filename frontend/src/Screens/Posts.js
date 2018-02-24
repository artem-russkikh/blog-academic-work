import React from 'react';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import moment from 'moment';
import {Link} from 'react-router';
import data from '../data'

const formattedDescription = (description) => {
  return description && description.length > 120 ?
           `${description.substring(0, 120)}...` :
           description
}

const formattedCreatedAt = (createdAt) => {
  return moment(createdAt).fromNow()
}

export default class Posts extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      onlyMyPosts: false
    }
  }

  toggleSwitch = (_e) => {
    this.setState({
      onlyMyPosts: !this.state.onlyMyPosts
    })
  }

  render() {
    return (
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
          {data.map((el, idx) => {
            return (
              <Grid item xs={12} sm={6} key={idx}>
                <Card style={{ maxWidth: 450 }}>
                  <CardMedia
                    style={{
                      height: 300,
                      backgroundPosition: 'center top',
                    }}
                    image={el.image}
                  />
                  <CardContent style={{ minHeight: 92 }}>
                    <Typography variant="headline" component="h2">
                      {el.title}
                    </Typography>
                    <Typography component="p">
                      {formattedDescription(el.description)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/posts/${el.id}`}
                    >
                      Подробнее
                    </Button>
                    <Typography title={moment(el.createdAt).format('lll')} style={{marginLeft: 'auto'}}>
                      {formattedCreatedAt(el.createdAt)}
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
