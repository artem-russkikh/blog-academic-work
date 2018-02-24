import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {Link} from 'react-router';

class MainLayout extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
              <Button
                color="inherit"
                component={Link}
                to="/"
              >
                <Typography variant="title" color="inherit">
                  БЛОГ
                </Typography>
              </Button>
            <div style={styles.flex} />
            <Button
              color="inherit"
              component={Link}
              to="/posts/new"
            >
              Новая запись
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signin"
            >
              Вход
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
            >
              Регистрация
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

const styles = {
  flex: {
    flex: 1,
  }
};

export default MainLayout;
