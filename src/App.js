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
  InToPost,
  InToPre,
  PostToIn,
  PostToPre,
  PreToPost,
  PreToIn,
  isOperator,
  op,
} from './operations';

import ExpDialog from './Components/Dialog';

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
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([]);
  const expression = useFormInput('');
  const [selectedValue, setSelectedValue] = React.useState('');
  const [result, setResult] = useState({});
  const classes = useStyles();
  
  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
    switch(value) {
      case 0:
        setResult(InToPost(expression.value));
        break;
      case 1:
        setResult(InToPre(expression.value));
        break;
      case 2:
        setResult(PostToIn(expression.value));
        break;
      case 3:
        setResult(PostToPre(expression.value));
        break;
      case 4:
        setResult(PreToPost(expression.value));
        break;
      case 5:
        setResult(PreToIn(expression.value));
        break;
      default:
        break;
    }
  };

  function checkExpression(expression) {
    if (!expression) {
      return;
    }
    const expressionCopy = expression.split('');
    if (isOperator(expressionCopy[0])) {
      setList([op[4], op[5]])
    } else if (isOperator(expressionCopy.pop())) {
      setList([op[2], op[3]])
    } else {
      setList([op[0], op[1]])
    }
    handleClickOpen();
  }

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
        <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
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
            onClick={() => checkExpression(expression.value)}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Convert
          </Button>
          <ExpDialog selectedValue={selectedValue} open={open} list={list} onClose={handleClose} />
          <Grid container>
            <Grid item xs>
              { result.value }
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
