import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import FeederChart from './FeederChart';
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
  const [log, setLog] = useState(jsonToLogObj(line, machine));

  useEffect(() => {
    setLog(jsonToLogObj(line, machine));
  }, [line, machine]);

  return (
    <Box
      sx={{
        height: '300px',
        width: '450px',
        margin: '10px',
        backgroundColor: '#d0d1d5',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h6" textAlign="center" color="#525252">
        Feeder Info
      </Typography>
      <FeederChart key={JSON.stringify(log)} data={log} />
    </Box>
  );
}
