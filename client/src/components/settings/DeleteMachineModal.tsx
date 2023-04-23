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

type DeleteMachineModalProps = {
  _id: string;
  _title: string;
  _numBeams: number;
  _numHeads: number;
  deleteMachine(machine: Machine): void;
};

type Machine = {
  id: string;
  title: string;
  numBeams: number;
  numHeads: number;
};

export default function DeleteMachineModal({
  _id,
  _title,
  _numBeams,
  _numHeads,
  deleteMachine,
}: DeleteMachineModalProps) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(_id);
  const [title, setTitle] = useState(_title);
  const [numBeams, setNumBeams] = useState(_numBeams);
  const [numHeads, setNumHeads] = useState(_numHeads);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleDelete() {
    let machine: Machine = {
      id: id,
      title: title,
      numBeams: numBeams,
      numHeads: numHeads,
    };

    deleteMachine(machine);
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
            label="ID"
            value={id}
            disabled
            sx={{
              m: '5px',
            }}
          />
          <TextField
            type="text"
            label="Title"
            value={title}
            disabled
            sx={{
              m: '5px',
            }}
          />
          <TextField
            type="number"
            label="Number of Beams"
            value={numBeams}
            disabled
            sx={{
              m: '5px',
            }}
          />
          <TextField
            type="number"
            label="Number of Heads"
            value={numHeads}
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
