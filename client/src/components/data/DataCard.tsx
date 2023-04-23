import { Box, IconButton, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function DataCard(): JSX.Element {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        sx={{
          mt: '20px',
          color: 'darkgreen',
        }}
      >
        DataCard Example
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <IconButton>
          <ArrowRightAltIcon
            sx={{
              fontSize: '40px',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
