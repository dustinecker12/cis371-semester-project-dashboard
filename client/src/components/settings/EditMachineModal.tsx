import { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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

type EditMachineModalProps = {
  _id: string;
  _title: string;
  _numBeams: number;
  _numHeads: number;
  editMachine(machine: Machine): void;
};

type Machine = {
  id: string;
  title: string;
  numBeams: number;
  numHeads: number;
};

export default function EditMachineModal({
  _id,
  _title,
  _numBeams,
  _numHeads,
  editMachine,
}: EditMachineModalProps) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(_id);
  const [title, setTitle] = useState(_title);
  const [numBeams, setNumBeams] = useState(_numBeams);
  const [numHeads, setNumHeads] = useState(_numHeads);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNumBeams = (event: ChangeEvent<HTMLInputElement>) =>
    setNumBeams(Number(event.target.value));
  const handleNumHeads = (event: ChangeEvent<HTMLInputElement>) =>
    setNumHeads(Number(event.target.value));

  function handleSave() {
    let machine: Machine = {
      id: id,
      title: title,
      numBeams: numBeams,
      numHeads: numHeads,
    };

    editMachine(machine);
    handleClose();
  }

  useEffect(() => {}, [title, id]);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon />
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
            Enter Machine Info
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
            onChange={handleTitleChange}
            sx={{
              m: '5px',
            }}
          />
          <TextField
            type="number"
            label="Number of Beams"
            value={numBeams}
            onChange={handleNumBeams}
            sx={{
              m: '5px',
            }}
          />
          <TextField
            type="number"
            label="Number of Heads"
            value={numHeads}
            onChange={handleNumHeads}
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
