import React, { useState } from 'react';
import MaterialTable from 'material-table';
import copy from 'copy-to-clipboard';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

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
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 2,
      paddingRight: 2,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    paddingTop: 5,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: 380,
    },
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
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
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
  const [selectedValue, setSelectedValue] = React.useState(undefined);
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
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CompareArrowsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Konwerter notacji matematycznej
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
          <TextField
            {...expression}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="expression"
            label="Wyrażenie"
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
            Zamień
          </Button>
          <ExpDialog selectedValue={selectedValue} open={open} list={list} onClose={handleClose} />
          { selectedValue !== undefined
            ? (
            <Grid container>
              <InputBase className={classes.input} readOnly value={result.value} />
              <Tooltip title="Kopiuj do schowka" placement="top">
                <IconButton
                  color="primary"
                  className={classes.iconButton}
                  aria-label="SaveAlt"
                  onClick={() => copy(result.value)}
                >
                  <SaveAltIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            )
            : undefined
          }            
          <Grid container>
          { selectedValue !== undefined && selectedValue < 2
            ? (<div className={classes.table}>
            <MaterialTable
              options={{
                search: false,
                paging: false,
                toolbar: false,
                sorting: false,
                showTitle: false
              }}
              columns={[
                { title: "Nr.", field: "id" },
                { title: "Znak", field: "expression" },
                { title: "Stos", field: "stack" },
                { title: "Wynik", field: "output" },
              ]}
              data={result.operations}
              title={result.value}
              />
            </div>)
            : undefined
          }
          { selectedValue !== undefined && selectedValue > 1
            ? (<div className={classes.table}>
            <MaterialTable
              options={{
                search: false,
                paging: false,
                toolbar: false,
                sorting: false,
                showTitle: false
              }}
              columns={[
                { title: "Nr.", field: "id" },
                { title: "Znak", field: "expression" },
                { title: "Stos", field: "stack" },
              ]}
              data={result.operations}
              title={result.value}
              />
            </div>)
            : undefined
          }
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default App;
