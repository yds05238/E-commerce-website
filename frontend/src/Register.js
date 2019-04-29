import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import firebase from './firebase';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AddPersonIcon from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as ROUTES from './constants/routes';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword: '',
      error: null
    };
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, confirmpassword } = this.state;
    if (password !== confirmpassword) {
      //alert("Error: Please check that you've entered and confirmed your password");
      const er = Error("Please check that you've entered and confirmed your password");
      this.setState({ error: er });
      return null;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  render() {
    const { email, password, confirmpassword, error } = this.state;
    const { classes } = this.props;
    return (
      <section>
        {error ? (
          <div>{error.message}</div>
        ) : null}
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AddPersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" type="email" value={email} onChange={this.handleInputChange} autoFocus />
                <FormHelperText id="component-helper-text">Must be a valid email address.</FormHelperText>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" value={password} onChange={this.handleInputChange} autoComplete="current-password" />
                <FormHelperText id="component-helper-text">Must be at least 6 characters.</FormHelperText>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                <Input name="confirmpassword" type="password" id="confirmpassword" value={confirmpassword} onChange={this.handleInputChange} autoComplete="current-password" />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                children="Register"
              >
                Create my account
          </Button>
            </form>
            <p>Already have an account? <Link to={ROUTES.LOGIN}>Sign In</Link></p>
          </Paper>
        </main>

      </section>

    );
  }
  propTypes = {
    classes: PropTypes.object.isRequired,
  };

};
export default withRouter(withStyles(styles)(Register));











