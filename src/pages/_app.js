// import all css
import { useEffect } from "react";
import SmoothPageScroll from "../components/common/SmoothPageScroll";
import { NavigationProvider } from "../context/NavigationContext";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("../../public/js/bootstrap.bundle.min.js");
  });
  return (
    <NavigationProvider>
      <SmoothPageScroll />
      <Component {...pageProps} />
    </NavigationProvider>
  );
}

export default MyApp;
