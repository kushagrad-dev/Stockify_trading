import React, { createContext, useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = createContext({
  openBuyWindow: () => {},
  openSellWindow: () => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [actionMode, setActionMode] = useState("BUY");

  const handleOpenBuyWindow = (uid) => {
    if (!uid) return;

    setSelectedStockUID(uid);
    setActionMode("BUY");
    setIsBuyWindowOpen(true);
  };

  const handleOpenSellWindow = (uid) => {
    if (!uid) return;

    setSelectedStockUID(uid);
    setActionMode("SELL");
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setActionMode("BUY");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {children}

      {isBuyWindowOpen && selectedStockUID && (
        <BuyActionWindow
          uid={selectedStockUID}
          mode={actionMode}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
