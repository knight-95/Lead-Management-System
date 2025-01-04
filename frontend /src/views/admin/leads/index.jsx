import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { fetchLeads } from 'api/leadApi';
import { useEffect, useState } from 'react';
import LeadTable from 'views/admin/leads/components/LeadTable';

export default function Settings() {
  console.log('Lead component is rendering');

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const leads = await fetchLeads();
        setTableData(leads);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box color="red.500" textAlign="center">
        <Text>Failed to load data. Please try again later.</Text>
      </Box>
    );
  }

  return (
    <Box
    // pt={{ base: '130px', md: '80px', xl: '80px' }}
    >
      <SimpleGrid mb="20px" spacing={{ base: '20px', xl: '20px' }}>
        <LeadTable tableData={tableData} />
      </SimpleGrid>
    </Box>
  );
}
