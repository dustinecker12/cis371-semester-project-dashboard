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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <Typography variant="h2" textAlign="center">
        {`Displaying information about: ${line.title} with ID: ${line.id}`}
      </Typography>
      <MachineInfoContainer line={line} />
    </Box>
  );
}
