import { ResponsivePie } from '@nivo/pie';
import { useState, useEffect } from 'react';

type NozzleChartProps = {
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

type Data = [
  {
    id: string;
    label: string;
    value: number;
    color: string;
  }
];

const mockPieData = [
  {
    id: 'hack',
    label: 'hack',
    value: 239,
    color: 'hsl(104, 70%, 50%)',
  },
  {
    id: 'make',
    label: 'make',
    value: 170,
    color: 'hsl(162, 70%, 50%)',
  },
  {
    id: 'go',
    label: 'go',
    value: 322,
    color: 'hsl(291, 70%, 50%)',
  },
  {
    id: 'lisp',
    label: 'lisp',
    value: 503,
    color: 'hsl(229, 70%, 50%)',
  },
  {
    id: 'scala',
    label: 'scala',
    value: 584,
    color: 'hsl(344, 70%, 50%)',
  },
];

export default function NozzleChart({ data }: NozzleChartProps) {
  const empty: Data = [
    {
      id: '',
      label: '',
      value: 0,
      color: '',
    },
  ];
  const [topFiveNozzles, setTopFiveNozzles] = useState<Data>(empty);
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
    if (log.nozzles && log.nozzles.length > 0) {
      topFive(log);
    }
  }, [log]);

  function topFive(data: Log) {
    data.nozzles.sort((a, b) => {
      return b.error - a.error;
    });

    if (!data.nozzles[0].type) {
      return null;
    }

    const tempTopFive: any = [];

    for (let i = 0; i < 5; i++) {
      let temp = {
        // ${data.nozzles[i].slot},
        // ${data.nozzles[i].slot},
        id: `${i + 1} - ${data.nozzles[i].type}`,
        label: `${i + 1} - ${data.nozzles[i].type}`,
        value: data.nozzles[i].error,
        color: colors[i],
      };

      tempTopFive.push(temp);
    }

    setTopFiveNozzles(tempTopFive);
  }

  return (
    <ResponsivePie
      data={topFiveNozzles.length ? topFiveNozzles : mockPieData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: 'gray',
            },
          },
          legend: {
            text: {
              fill: 'gray',
            },
          },
          ticks: {
            line: {
              stroke: 'gray',
              strokeWidth: 1,
            },
            text: {
              fill: 'gray',
            },
          },
        },
        legends: {
          text: {
            fill: 'gray',
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={'gray'}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
    />
  );
}
