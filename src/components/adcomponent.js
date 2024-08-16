import React, { useEffect } from "react";

const AdsComponent = (props) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5386683070162029"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest="on"
      />
    </>
  );
};

export default AdsComponent;
