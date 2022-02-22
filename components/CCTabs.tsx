import {Box, Tab, Tabs} from '@mui/material';
import {ReactNode, SyntheticEvent, useState} from 'react';
import {TabsProps} from '../types/TabsProps';

interface TabPanelProps {
  children?: ReactNode;
  keepState?: boolean;
  currentIndex: number;
  tabIndex: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, keepState, currentIndex, tabIndex, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={currentIndex !== tabIndex}
      {...other}
    >
      {keepState ? (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      ) : currentIndex === tabIndex && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

export const CCTabs = ({tabs, keepState}: TabsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentIndex(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentIndex} onChange={handleChange}>
          {tabs.map((tabProp) =>
            <Tab label={tabProp.label} key={tabProp.index} />
          )}
        </Tabs>
      </Box>
      {tabs.map((tabProp) =>
        <TabPanel currentIndex={currentIndex} tabIndex={tabProp.index} key={tabProp.index} keepState={keepState}>
          {tabProp.content}
        </TabPanel>
      )}
    </>
  );
};
