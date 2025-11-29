import "./App.css";
import { ConversionRateChart } from "./components/ConversionRateChart.tsx";
import chart from "./assets/data.json";

function App() {
  return (
    <>
      <ConversionRateChart chart={chart} />
    </>
  );
}

export default App;
