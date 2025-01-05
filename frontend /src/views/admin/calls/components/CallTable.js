import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import Card from 'components/card/Card';
import { useState } from 'react';
import CallSchedulesTable from './tabs/CallSchedulesTable';
import LeadCallToday from './tabs/LeadCallToday';

export default function CallTable() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const rowBgColor = useColorModeValue('blue.50', 'gray.700');

  // prettier-ignore
  const [value, setValue] = useState('first');
  return (
    <>
      <Card
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Call Planning
          </Text>
        </Flex>
        <Flex
          px="25px"
          mt="1rem"
          mb="8px"
          justifyContent="space-between"
          align="center"
        >
          <Tabs>
            <TabList>
              <Tab paddingLeft="0px" marginRight="2rem">
                <Text
                  color={textColor}
                  fontSize="15px"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  Call Schedules Overview
                </Text>
              </Tab>
              <Tab paddingLeft="0px">
                <Text
                  color={textColor}
                  fontSize="15px"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  Leads Requiring Calls Today{' '}
                </Text>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <CallSchedulesTable />
              </TabPanel>
              <TabPanel>
                <LeadCallToday/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Card>
    </>
  );
}
