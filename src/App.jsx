import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Routers";
// import { SourceMapConsumer } from 'source-map-js';

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./redux/redux-store/store";
import "@smastrom/react-rating/style.css";
import { useEffect } from "react";

function App() {
  //* removing logs in production
  useEffect(() => {
 
    // const noop = () => {};
    // [
    //   "assert",
    //   "clear",
    //   "count",
    //   "debug",
    //   "dir",
    //   "dirxml",
    //   "error",
    //   "exception",
    //   "group",
    //   "groupCollapsed",
    //   "groupEnd",
    //   "info",
    //   "log",
    //   "markTimeline",
    //   "profile",
    //   "profileEnd",
    //   "table",
    //   "time",
    //   "timeEnd",
    //   "timeline",
    //   "timelineEnd",
    //   "timeStamp",
    //   "trace",
    //   "warn",
    // ].forEach((method) => {
    //   window.console[method] = noop;
    // });
  },[]);

  return (
    <>
      <ChakraProvider>
        <Provider store={store}>
          <BrowserRouter basename="/">
            <AppRouter />
          </BrowserRouter>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
