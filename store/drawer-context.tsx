import {createContext, ReactElement, useState} from 'react';

const DrawerContext = createContext({
  headerHeight: 0,
  setHeaderHeight: (height: number) => {},
});

export function DrawerContextProvider(props: {children: ReactElement}) {
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const context = {
    headerHeight,
    setHeaderHeight,
  };

  return <DrawerContext.Provider value={context}>
    {props.children}
  </DrawerContext.Provider>;
}

export default DrawerContext;
