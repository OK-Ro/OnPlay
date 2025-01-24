import PagesRoutes from "./Pages/PagesRoutes";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/nav";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <PagesRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
