import React from "react";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: () => {},
        closeBuyWindow: () => {},
      }}
    >
      {props.children}

      {/* Buy Action Window */}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
