import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormNote() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>CREATE NOTE</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>CREATE NOTE</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Note Title"
            type="title"
            fullWidth
            variant="outlined"
          />          
          <TextField
            id="outlined-multiline-static"
            margin="dense"
            label="Note Content"
            multiline
            rows={5}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tag"
            type="tag"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>CANCEL</Button>
          <Button variant="contained" onClick={handleClose}>SUBMIT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
