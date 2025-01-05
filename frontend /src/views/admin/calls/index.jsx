import { Box, SimpleGrid } from '@chakra-ui/react';
import CallTable from 'views/admin/calls/components/CallTable';

export default function Settings() {
  console.log('Lead component is rendering');
  return (
    <Box>
      <SimpleGrid mb="20px" spacing={{ base: '20px', xl: '20px' }}>
        <CallTable />
      </SimpleGrid>
    </Box>
  );
}
