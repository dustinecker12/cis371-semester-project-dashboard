import { Box, Grid, IconButton, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function StopCard(): JSX.Element {
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          paddingTop: '10px',
        }}
      >
        <CancelIcon
          sx={{
            fontSize: '40px',
            color: '#6870fa',
            padding: '0px 10px 0px 10px',
          }}
        />
        <Typography
          variant="h5"
          color="#e0e0e0"
          sx={{
            paddingTop: '5px',
          }}
        >
          Stop Time
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" textAlign="center" color="#e0e0e0">
          51,352 S
        </Typography>
      </Box>

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
