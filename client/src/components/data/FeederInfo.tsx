import { Box } from '@mui/material';
import jsonToLogObj from '../../helperClasses/jsonToLogObj';

type FeederInfoProps = {
  machine: Machine;
  line: Line;
};

type Line = {
  id: string;
  title: string;
};

type Machine = {
  id: string;
  title: string;
  numBeams: number;
  numHeads: number;
};

export default function FeederInfo({
  machine,
  line,
}: FeederInfoProps): JSX.Element {
  const log = jsonToLogObj(line, machine);

  return (
    <Box
      sx={{
        height: '150px',
        width: '150px',
        margin: '10px',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <h1>Feeder Info</h1>
    </Box>
  );
}
