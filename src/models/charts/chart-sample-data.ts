
import { ChartDataSetModel, DataPoint, ChartDataSetModelType, DataPointType } from "./chart-data-set";
import * as dam0 from "../../data/dam0.json";
import * as dam25 from "../../data/dam25.json";
import * as dam50 from "../../data/dam50.json";
import * as dam75 from "../../data/dam75.json";

function addTestDataPoints() {
  const points = [];
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "alpha" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "bravo" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "charlie" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "delta" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "echo" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "foxtrot" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "golf" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "hotel" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "india" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "juliette" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "kilo" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "lima" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "mike" }));
  points.push (DataPoint.create({ a1: rand(), a2: rand(), label: "november" }));
  return points;
}

export function rngData() {
  const chartDataSets: ChartDataSetModelType[] = [];
  chartDataSets.push(ChartDataSetModel.create({
    name: "Sample Dataset1",
    dataPoints: addDataPoints(0, "Spring"),
    // dataPoints: addTestDataPoints(),
    // color: ChartColors[3].hex,
    // pointColors: ["#00ff00", "#ff0000", "#0000ff"],
    backgroundOpacity: 0.9,
    stack: "Spring"
  }));
  chartDataSets.push(ChartDataSetModel.create({
    name: "Sample Dataset2",
    dataPoints: addDataPoints(0, "Summer"),
    // dataPoints: addTestDataPoints(),
    // color: "#00ffcc",
    // pointColors: ["#00ff00", "#ff0000", "#0000ff"],
    backgroundOpacity: 0.3,
    stack: "Summer"
  }));
  return chartDataSets;
}

const rand = () => {
  return Math.round(Math.random() * 100);
};

function addDataPoints(diversionPercentage: number, season: string) {
  const points: DataPointType[] = [];
  let damData = dam0;
  switch (diversionPercentage) {
    case 25:
      damData = dam25;
      break;
    case 50:
      damData = dam50;
      break;
    case 75:
      damData = dam75;
      break;
  }
  damData.forEach((d) => {
    if (d.Year) {
      if (d.Season === season) {
        const area = d.EndSeasonSurfaceArea ? d.EndSeasonSurfaceArea : 0;
        points.push(DataPoint.create({ a1: d.Year, a2: area, label: d.Year + d.Season }));
      }
    }
  });
  return points;
}
