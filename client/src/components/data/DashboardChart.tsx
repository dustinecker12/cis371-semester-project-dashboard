import { Box, Typography } from '@mui/material';

export default function DashboardChart(): JSX.Element {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          mt: '20px',
          color: 'darkblue',
        }}
      >
        This is a dashboard chart
      </Typography>
    </Box>
  );
}
