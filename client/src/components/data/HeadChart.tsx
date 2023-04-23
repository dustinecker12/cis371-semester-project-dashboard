import { ResponsiveBar } from '@nivo/bar';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

type HeadChartProps = {
  data: Log;
};

type Log = {
  info: {
    idleTime: number;
    panelCount: number;
    placeCount: number;
    stopTime: number;
  };
  heads: [
    {
      headNum: number;
      pickup: number;
      place: number;
      error: number;
      errorPPM: number;
    }
  ];
  feeders: {
    tapeFeeders: [
      {
        slot: string;
        partNum: string;
        pickup: number;
        place: number;
        error: number;
        errorPPM: number;
      }
    ];
    stickFeeders: [
      {
        slot: string;
        partNum: string;
        pickup: number;
        place: number;
        error: number;
        errorPPM: number;
      }
    ];
    trayFeeders: [
      {
        slot: string;
        partNum: string;
        pickup: number;
        place: number;
        error: number;
        errorPPM: number;
      }
    ];
  };
  nozzles: [
    {
      slot: string;
      type: string;
      pickup: number;
      place: number;
      error: number;
      errorPPM: number;
    }
  ];
};

const mockBarData = [
  {
    country: 'AD',
    'hot dog': 137,
    'hot dogColor': 'hsl(229, 70%, 50%)',
    burger: 96,
    burgerColor: 'hsl(296, 70%, 50%)',
    kebab: 72,
    kebabColor: 'hsl(97, 70%, 50%)',
    donut: 140,
    donutColor: 'hsl(340, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 55,
    'hot dogColor': 'hsl(307, 70%, 50%)',
    burger: 28,
    burgerColor: 'hsl(111, 70%, 50%)',
    kebab: 58,
    kebabColor: 'hsl(273, 70%, 50%)',
    donut: 29,
    donutColor: 'hsl(275, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 109,
    'hot dogColor': 'hsl(72, 70%, 50%)',
    burger: 23,
    burgerColor: 'hsl(96, 70%, 50%)',
    kebab: 34,
    kebabColor: 'hsl(106, 70%, 50%)',
    donut: 152,
    donutColor: 'hsl(256, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 133,
    'hot dogColor': 'hsl(257, 70%, 50%)',
    burger: 52,
    burgerColor: 'hsl(326, 70%, 50%)',
    kebab: 43,
    kebabColor: 'hsl(110, 70%, 50%)',
    donut: 83,
    donutColor: 'hsl(9, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 81,
    'hot dogColor': 'hsl(190, 70%, 50%)',
    burger: 80,
    burgerColor: 'hsl(325, 70%, 50%)',
    kebab: 112,
    kebabColor: 'hsl(54, 70%, 50%)',
    donut: 35,
    donutColor: 'hsl(285, 70%, 50%)',
  },
];

export default function HeadChart({ data }: HeadChartProps) {
  const [topFiveHeads, setTopFiveHeads] = useState([]);
  const [log, setLog] = useState<Log>(data);
  const colors = [
    'hsl(104, 70%, 50%)',
    'hsl(162, 70%, 50%)',
    'hsl(291, 70%, 50%)',
    'hsl(229, 70%, 50%)',
    'hsl(344, 70%, 50%)',
  ];

  useEffect(() => {
    if (data) {
      setLog(data);
    }
  }, [data]);

  useEffect(() => {
    if (log.heads && log.heads.length > 0) {
      topFive(log);
    }
  }, [log]);

  function topFive(data: Log) {
    data.heads.sort((a, b) => {
      return b.error - a.error;
    });

    if (!data.heads[0].headNum) {
      return null;
    }

    const tempTopFive: any = [];

    for (let i = 0; i < 5; i++) {
      let temp = {
        head: `Head #${data.heads[i].headNum}`,
        pick: data.heads[i].pickup,
        pickColor: colors[0],
        place: data.heads[i].place,
        placeColor: colors[1],
        error: data.heads[i].error,
        errorColor: colors[2],
      };

      tempTopFive.push(temp);
    }

    setTopFiveHeads(tempTopFive);
  }

  return (
    <Box
      sx={{
        height: '95%',
        width: '100%',
      }}
    >
      <ResponsiveBar
        data={topFiveHeads.length ? topFiveHeads : mockBarData}
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
        keys={
          topFiveHeads.length ? ['pick', 'place', 'error'] : undefined
          // : ['hot dog', 'burger', 'kebab', 'donut']
        }
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
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
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
      />
    </Box>
  );
}
