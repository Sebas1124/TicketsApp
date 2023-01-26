import { useContext, useEffect } from 'react'
import { UiContext } from './../context/UiContext';

export const useHideMenu = ( ocultar ) => {

    const { ShowMenu, HiddenMenu } = useContext( UiContext )

    useEffect(() => {
        if ( ocultar ) {
            HiddenMenu();
        }else{
            ShowMenu();
        }
    }, [ ocultar, HiddenMenu, ShowMenu ])

}
