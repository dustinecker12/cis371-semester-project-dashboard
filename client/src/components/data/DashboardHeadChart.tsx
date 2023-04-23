import { ResponsiveBar } from '@nivo/bar';
import { Box } from '@mui/material';

const mockBarData = [
  {
    head: 'Line 1 - Machine 2 - Head #2',
    pick: 137,
    pickColor: 'hsl(229, 70%, 50%)',
    place: 96,
    placeColor: 'hsl(296, 70%, 50%)',
    error: 72,
    errorColor: 'hsl(97, 70%, 50%)',
    errorPPM: 140,
    errorPPMColor: 'hsl(340, 70%, 50%)',
  },
  {
    head: 'Line 2 - Machine 1 - Head #8',
    pick: 55,
    pickColor: 'hsl(307, 70%, 50%)',
    place: 28,
    placeColor: 'hsl(111, 70%, 50%)',
    error: 58,
    errorColor: 'hsl(273, 70%, 50%)',
    errorPPM: 29,
    errorPPMColor: 'hsl(275, 70%, 50%)',
  },
  {
    head: 'Line 2 - Machine 2 - Head #12',
    pick: 109,
    pickColor: 'hsl(72, 70%, 50%)',
    place: 23,
    placeColor: 'hsl(96, 70%, 50%)',
    error: 34,
    errorColor: 'hsl(106, 70%, 50%)',
    errorPPM: 152,
    errorPPMColor: 'hsl(256, 70%, 50%)',
  },
  {
    head: 'Line 1 - Machine 1 - Head#5',
    pick: 133,
    pickColor: 'hsl(257, 70%, 50%)',
    place: 52,
    placeColor: 'hsl(326, 70%, 50%)',
    error: 43,
    errorColor: 'hsl(110, 70%, 50%)',
    errorPPM: 83,
    errorPPMColor: 'hsl(9, 70%, 50%)',
  },
  {
    head: 'Line 1 - Machine 1 - Head #6',
    pick: 81,
    pickColor: 'hsl(190, 70%, 50%)',
    place: 80,
    placeColor: 'hsl(325, 70%, 50%)',
    error: 112,
    errorColor: 'hsl(54, 70%, 50%)',
    errorPPM: 35,
    errorPPMColor: 'hsl(285, 70%, 50%)',
  },
];

export default function HeadChart() {
  return (
    <Box
      sx={{
        height: '90%',
        width: '100%',
      }}
    >
      <ResponsiveBar
        data={mockBarData}
        theme={{
          // added
          axis: {
            domain: {
              line: {
                stroke: 'grey',
              },
            },
            legend: {
              text: {
                fill: 'grey',
              },
            },
            ticks: {
              line: {
                stroke: 'grey',
                strokeWidth: 1,
              },
              text: {
                fill: 'grey',
              },
            },
          },
          legends: {
            text: {
              fill: 'grey',
            },
          },
        }}
        keys={['pick', 'place', 'error', 'errorPPM']}
        indexBy="head"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'head', // changed
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food', // changed
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        barAriaLabel={function (e) {
          return (
            e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
          );
        }}
      />
    </Box>
  );
}
