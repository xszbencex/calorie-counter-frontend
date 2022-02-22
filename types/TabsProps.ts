import {ReactNode} from 'react';

export type CCTab = {
  /**
   * Index should start from 0
   **/
  index: number,
  label: string,
  content: ReactNode
}

export type TabsProps = {
  tabs: CCTab[],
  keepState?: boolean
};
