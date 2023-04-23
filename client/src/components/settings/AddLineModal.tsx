import { useState, useEffect, ChangeEvent } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import AddButton from './AddButton';

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

type AddLineModalProps = {
  addLine(line: Line): void;
};

type Line = {
  id: string;
  title: string;
};

export default function AddLineModal({ addLine }: AddLineModalProps) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('(auto generated)');
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleOpen = () => setOpen(true);

  function handleClose() {
    setOpen(false);
    setTitle('');
  }

  function handleSave() {
    let line: Line = {
      id: id,
      title: title,
    };

    addLine(line);
    handleClose();
  }

  useEffect(() => {}, [title, id]);

  return (
    <div>
      <AddButton onButtonClick={handleOpen} type="line" />
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
            Enter Line Info
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
            onChange={handleTitleChange}
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
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
