import { Box } from '@mui/material';
import IdleCard from '../../components/data/IdleCard';
import PanelCard from '../../components/data/PanelCard';
import PlaceCard from '../../components/data/PlaceCard';
import StopCard from '../../components/data/StopCard';
import DashboardNozzleChartContainer from '../../components/data/DashboardNozzleChartContainer';
import DashboardHeadChartContainer from '../../components/data/DashboardHeadChartContainer';

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
              backgroundColor: '#141b2d',
              borderRadius: 2,
            }}
          >
            <IdleCard />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 3"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#141b2d',
              borderRadius: 2,
            }}
          >
            <PanelCard />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 3"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#141b2d',
              borderRadius: 2,
            }}
          >
            <PlaceCard />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 3"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#141b2d',
              borderRadius: 2,
            }}
          >
            <StopCard />
          </Box>

          {/* Row 3 */}
          <Box
            gridColumn="span 8"
            gridRow="span 9"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#141b2d',
              borderRadius: 2,
            }}
          >
            <DashboardHeadChartContainer />
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 9"
            width="100% / 4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#141b2d',
              borderRadius: 2,
            }}
          >
            <DashboardNozzleChartContainer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
