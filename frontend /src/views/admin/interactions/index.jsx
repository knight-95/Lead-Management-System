import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { fetchLeads } from 'api/leadApi';
import { useEffect, useState } from 'react';
import InteractionTable from 'views/admin/interactions/components/InteractionTable';

export default function Settings() {
  console.log('Lead component is rendering');
  return (
    <Box
    // pt={{ base: '130px', md: '80px', xl: '80px' }}
    >
      <SimpleGrid mb="20px" spacing={{ base: '20px', xl: '20px' }}>
        <InteractionTable />
      </SimpleGrid>
    </Box>
  );
}
