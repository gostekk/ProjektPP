import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ExpDialog(props) {
  const { list, fullScreen, onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(undefined);
  }

  function handleListItemClick(value) {
    onClose(value);
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        {...other}
      >
        <DialogTitle id="responsive-dialog-title">{"Convert to?"}</DialogTitle>
        <List>
        {list.map(notation => (
          <ListItem button onClick={() => handleListItemClick(notation.id)} key={notation.id}>
            <ListItemText primary={notation.name} />
          </ListItem>
        ))}
      </List>
      </Dialog>
    </div>
  );
}

export default ExpDialog;