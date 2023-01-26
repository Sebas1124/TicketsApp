import React, { createContext, useState } from 'react';


export const UiContext = createContext();

export const UiProvider = ({ children }) => {

    const [ ocultarMenu, setOcultarMenu ] = useState(true);

    const ShowMenu = () => {
        setOcultarMenu( false );
    }

    const HiddenMenu = () => {
        setOcultarMenu( true );
    }
  return (
    <UiContext.Provider value={{ 
        ocultarMenu,
        ShowMenu,
        HiddenMenu,
     }}>

        { children }

    </UiContext.Provider>
  )
}
