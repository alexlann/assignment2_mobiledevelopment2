import { useState, useEffect } from "react";

import Loader from "./Loader";

const TimedLoader = ({requirement}) => {
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
      // reset show content when requirement changed
      setShowContent(false);
      // set timeout to show content
      const timeout = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      // pass cleaning function to react
      return () => clearTimeout(timeout);
    }, [requirement]);
  
    return showContent ? <Loader /> : "";
}

export default TimedLoader;