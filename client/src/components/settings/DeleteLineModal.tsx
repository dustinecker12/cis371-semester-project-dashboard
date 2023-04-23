import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type DeleteLineModalProps = {
  _id: string;
  _title: string;
  deleteLine(line: Line): void;
};

type Line = {
  id: string;
  title: string;
};

export default function DeleteLineModal({
  _id,
  _title,
  deleteLine,
}: DeleteLineModalProps) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(_id);
  const [title, setTitle] = useState(_title);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleDelete() {
    let line: Line = {
      id: id,
      title: title,
    };

    deleteLine(line);
    handleClose();
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <DeleteIcon
          sx={{
            color: '#6870fa',
          }}
        />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            sx={{
              m: '5px',
            }}
          >
            Are you sure?
          </Typography>
          <TextField
            type="text"
            label="id"
            value={id}
            disabled
            sx={{
              m: '5px',
            }}
          />
          <TextField
            type="text"
            label="title"
            value={title}
            disabled
            sx={{
              m: '5px',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
