import { ResponsivePie } from '@nivo/pie';

const mockPieData = [
  {
    id: 'L1 CN065',
    label: 'L1 CN065',
    value: 239,
    color: 'hsl(104, 70%, 50%)',
  },
  {
    id: 'L1 CN040',
    label: 'L1 CN040',
    value: 170,
    color: 'hsl(162, 70%, 50%)',
  },
  {
    id: 'L2 CN400',
    label: 'L2 CN400',
    value: 322,
    color: 'hsl(291, 70%, 50%)',
  },
  {
    id: 'L1 CN030',
    label: 'L1 CN030',
    value: 503,
    color: 'hsl(229, 70%, 50%)',
  },
  {
    id: 'L2 CN065',
    label: 'L2 CN065',
    value: 584,
    color: 'hsl(344, 70%, 50%)',
  },
];

export default function DashboardNozzleChart() {
  return (
    <ResponsivePie
      data={mockPieData}
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
