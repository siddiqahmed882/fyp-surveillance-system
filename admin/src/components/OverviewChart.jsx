import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  // const { data, isLoading } = useGetSalesQuery();

  const isLoading = false;
  const data = [
    {
      id: "Shared Express",
      color: "hsl(10, 70%, 50%)",
      data: [
        {
          x: "Jan",
          y: 66,
        },
        {
          x: "Feb",
          y: 58,
        },
        {
          x: "Mar",
          y: 265,
        },
        {
          x: "Apr",
          y: 244,
        },
        {
          x: "May",
          y: 119,
        },
        {
          x: "Jun",
          y: 133,
        },
        {
          x: "Jul",
          y: 240,
        },
        {
          x: "Aug",
          y: 167,
        },
        {
          x: "Sept",
          y: 242,
        },
        {
          x: "Oct",
          y: 57,
        },
        {
          x: "Nov",
          y: 86,
        },
        {
          x: "Dec",
          y: 47,
        },
      ],
    },
    {
      id: "Rapid Express",
      color: "hsl(209, 70%, 50%)",
      data: [
        {
          x: "Jan",
          y: 176,
        },
        {
          x: "Feb",
          y: 82,
        },
        {
          x: "Mar",
          y: 12,
        },
        {
          x: "Apr",
          y: 146,
        },
        {
          x: "May",
          y: 185,
        },
        {
          x: "Jun",
          y: 277,
        },
        {
          x: "Jul",
          y: 85,
        },
        {
          x: "Aug",
          y: 16,
        },
        {
          x: "Sept",
          y: 97,
        },
        {
          x: "Oct",
          y: 68,
        },
        {
          x: "Nov",
          y: 158,
        },
        {
          x: "Dec",
          y: 249,
        },
      ],
    },
  ];

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 120, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "Month" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? "Number of Rides"
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 90,
          translateY: -40,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default OverviewChart;
