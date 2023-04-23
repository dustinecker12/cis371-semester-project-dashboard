import { Box } from '@mui/material';
import DataCard from '../../components/data/DataCard';
import DashboardChart from '../../components/data/DashboardChart';

export default function Dashboard(): JSX.Element {
  return (
    <Box m="20px" height="90%">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <h1>Display Dashboard</h1>

        {/* Dashboard Layout Container */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridTemplateRows="repeat(12, 1fr)"
          width="100%"
          height="100%"
          gridAutoRows="150px"
          gap="20px"
        >
          {/* Row 1 */}
          <Box
            gridColumn="span 3"
            gridRow="span 3"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <DataCard />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 3"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <DataCard />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 3"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <DataCard />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 3"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <DataCard />
          </Box>

          {/* Row 3 */}
          <Box
            gridColumn="span 12"
            gridRow="span 9"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <DashboardChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
