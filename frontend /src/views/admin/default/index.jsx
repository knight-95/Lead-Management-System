import { Box, Icon, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { fetchContacts } from 'api/contactApi';
import { fetchAllInteractions } from 'api/interactionApi';
import { fetchLeads } from 'api/leadApi';
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import { useEffect, useState } from 'react';
import { FaHandsHelping } from 'react-icons/fa';
import { MdBarChart, MdContacts } from 'react-icons/md';

import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import PieCardLeads from 'views/admin/default/components/PieCardLeads';

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const [totalLeads, setTotalLeads] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalInteractions, setTotalInteractions] = useState(0);

  useEffect(() => {
    const fetchTotalLeads = async () => {
      try {
        const schedules = await fetchLeads();
        setTotalLeads(schedules.length);
      } catch (error) {
        console.error('Error fetching call schedules:', error);
      }
    };

    const fetchTotalContacts = async () => {
      try {
        const contacts = await fetchContacts();
        setTotalContacts(contacts.length);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    const fetchTotalInteractions = async () => {
      try {
        const interactions = await fetchAllInteractions();
        setTotalInteractions(interactions.data.length);
      } catch (error) {
        console.error('Error fetching interactions:', error);
      }
    };

    fetchTotalLeads();
    fetchTotalContacts();
    fetchTotalInteractions();
  }, []);

  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <Icon
              mt="1rem"
              w="32px"
              h="32px"
              as={MdBarChart}
              color={brandColor}
            />
          }
          name="Total Leads"
          value={totalLeads}
        />
        <MiniStatistics
          startContent={
            <Icon
              mt="1rem"
              w="32px"
              h="32px"
              as={MdContacts}
              color={brandColor}
            />
          }
          name="Total Contacts"
          value={totalContacts}
        />
        <MiniStatistics
          startContent={
            <Icon
              mt="1rem"
              w="32px"
              h="32px"
              as={FaHandsHelping}
              color={brandColor}
            />
          }
          // growth="+23%"
          name="Total Interactions"
          value={totalInteractions}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        {/* <PieCard /> */}
        <PieCardLeads/>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
