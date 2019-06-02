import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {
//   InToPost,
//   InToPre,
//   PostToIn,
//   PostToPre,
//   PreToPost,
//   PreToIn
  isOperator
} from './operations';

import './App.css';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function checkExpression(expression) {
  const expressionCopy = expression.split('');
  if (isOperator(expressionCopy[0])) {
    return 'prefix';
  } else if (isOperator(expressionCopy.pop())) {
    return 'postfix';
  } else {
    return 'infix';
  }
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

function App() {
  const expression = useFormInput('');
  const classes = useStyles();
  
  // console.log('In');
  // InToPost("(3 * 4 / (2 + 5)) * (3 + 4)");
  // InToPre("(3 * 4 / (2 + 5)) * (3 + 4)");
  // console.log('Post');
  // PostToIn("3 4 * 2 5 + / 3 4 + *");
  // PostToPre("3 4 * 2 5 + / 3 4 + *");
  // console.log('Pre');
  // PreToPost("* / * 3 4 + 2 5 + 3 4 ");
  // PreToIn("* / * 3 4 + 2 5 + 3 4 ");
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CompareArrowsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Polish Notation Converter
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            {...expression}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="expression"
            label="Expression"
            name="expression"
            autoComplete="off"
            autoFocus
          />
          <Button
            type="button"
            onClick={() => console.log(checkExpression(expression.value))}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Convert
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default App;
