import { Typography } from '@mui/material';

type MachineProps = {
  title: string;
  numBeams: number;
  numHeads: number;
};

export default function Machine({ title, numBeams, numHeads }: MachineProps) {
  return (
    <>
      <Typography
        sx={{
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
        }}
      >
        {numBeams > 1 ? `${numBeams} Beams` : `${numBeams} Beam`}
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
        }}
      >
        {numHeads > 1 ? `${numHeads} Heads` : `${numHeads} Head`}
      </Typography>
    </>
  );
}
