import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { fetchContacts } from 'api/contactApi';
import { useEffect, useState } from 'react';
import ContactTable from 'views/admin/contacts/components/ContactTable';

export default function Settings() {
  console.log('Contacts component is rendering');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const contacts = await fetchContacts();
        console.log('Logging Contacts : ', contacts);
        setTableData(contacts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadContacts();
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
        <ContactTable tableData={tableData} />
      </SimpleGrid>
    </Box>
  );
}
