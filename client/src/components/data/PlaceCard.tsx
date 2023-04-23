import { Box, Grid, IconButton, Typography } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function PlaceCard(): JSX.Element {
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
        <ArrowCircleDownIcon
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
          Placements
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" textAlign="center" color="#e0e0e0">
          16,561,352
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
