import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MachineInfoContainer from '../../components/data/MachineInfoContainer';

type Line = {
  id: string;
  title: string;
};

export default function Line(): JSX.Element {
  const location = useLocation();
  const line: Line = location.state?.line;
  const [lineTitle, setLineTitle] = useState(line.title);

  useEffect(() => {
    setLineTitle(line.title);
  }, [line]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        margin: 'auto',
      }}
    >
      <Typography variant="h2" color="#6870fa">
        {line.title}
      </Typography>
      <MachineInfoContainer line={line} />
    </Box>
  );
}
