import { Box, Typography } from '@mui/material';
import DashboardHeadChart from './DashboardHeadChart';

export default function DashboardHeadChartContainer(): JSX.Element {
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
          color: '#e0e0e0',
        }}
      >
        Total Head Errors - All Lines
      </Typography>
      <DashboardHeadChart />
    </Box>
  );
}
