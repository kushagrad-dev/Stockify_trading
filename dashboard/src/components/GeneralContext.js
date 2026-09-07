import React, { createContext, useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [actionWindow, setActionWindow] = useState(null);

  const openBuyWindow = (uid) => {
    setActionWindow({
      uid,
      mode: "BUY",
    });
  };

  const openSellWindow = (uid) => {
    setActionWindow({
      uid,
      mode: "SELL",
    });
  };

  const closeBuyWindow = () => {
    setActionWindow(null);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow,
        openSellWindow,
        closeBuyWindow,
      }}
    >
      {children}

      {actionWindow && (
        <BuyActionWindow
          uid={actionWindow.uid}
          mode={actionWindow.mode}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;