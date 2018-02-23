import React from 'react';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography';
import CardHeader from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const data = [
  {
    id: 1337,
    title: "Здарова привет",
    description: "Вот такие вот дела происходят в уганде",
		image: "http://images.uesp.net/thumb/9/98/SR-creature-Dog.jpg/600px-SR-creature-Dog.jpg",
	  createdAt: new Date
  }, {
    id: 1338,
    title: "Здарова снова",
    description: "Вот такие вот дела происходят в уганде",
		image: "",
	  createdAt: new Date
  }, {
    id: 1333,
    title: "Здарова снова undefined картина",
    description: "Вот такие вот дела происходят в уганде",
		image: undefined,
	  createdAt: new Date
  }, {
    id: 2003,
    title: "картина ломаная",
    description: "",
		image: "http://imags.uesp.net/thumb/9/98/SR-creature-Dog.jpg/600px-SR-creature-Dog.jpg",
	  createdAt: new Date
  }, {
    id: 2002,
    title: "Здарова привет 3",
    description: "",
		image: "http://images.uesp.net/thumb/9/98/SR-creature-Dog.jpg/600px-SR-creature-Dog.jpg",
	  createdAt: new Date
  }, {
    id: 2001,
    title: "Здарова привет 4",
    description: "Вот такие вот дела происходят в уганде и это хорошо дескрипшн большойдескрипшн б" +
        "ольшойдескрипшн большойдескрипшн большойдескрипшн большойдескрипшн большойдескри" +
        "пшн большойдескрипшн большойдескрипшн большойдескрипшн большойдескрипшн большойд" +
        "ескрипшн большойдескрипшн большойдескрипшн большойдескрипшн большойдескрипшн бол" +
        "ьшойдескрипшн большойдескрипшн большойдескрипшн большойдескрипшн большойдескрипш" +
        "н большойдескрипшн большойдескрипшн большойдескрипшн большойдескрипшн большойдес" +
        "крипшн большойдескрипшн большойдескрипшн большойдескрипшн большойдескрипшн больш" +
        "ойм",
		image: "http://images.uesp.net/thumb/9/98/SR-creature-Dog.jpg/600px-SR-creature-Dog.jpg",
	  createdAt: new Date
  }
]
export default class Posts extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Grid container spacing={24}>
          {data.map((el, idx) => {
            return (
              <Grid item xs={12} sm={6} key={idx}>
                <Paper style={{height: 460}}>
									<Grid style={{ textAlign: 'center' }} item xs={12}>
										<img height={270} src={el.image} />
									</Grid>
									<div style={styles.padding}>
										<Grid item xs={12}>
											{el.title}
										</Grid>
										<Grid item xs={12}>
											<Typography style={{ height: 140, overflow: 'hidden', textOverflow: 'ellipsis' }}>
												{el.description}
											</Typography>
										</Grid>
									</div>
								</Paper>
              </Grid>
            )
          })}
        </Grid>
      </div>
    );
  }
}

const styles = {
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  padding: {
    padding: 10
  }
}