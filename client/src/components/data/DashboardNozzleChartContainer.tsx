import { Box, Typography } from '@mui/material';
import DashboardNozzleChart from './DashboardNozzleChart';

export default function DashboardNozzleChartContainer(): JSX.Element {
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
        Total Nozzle Errors - All Lines
      </Typography>
      <DashboardNozzleChart />
    </Box>
  );
}
