import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({children})=>{
    const [currency , setCurrency] = useState("₹");

    const updateCurrency = (value)=>{
        setCurrency(value);
    }

    return (
        <CurrencyContext.Provider value={{currency , updateCurrency}}>{children}</CurrencyContext.Provider>
    )
}

const useCurrency = ()=>{
    const context = useContext(CurrencyContext);
    return context;
}

export default useCurrency;