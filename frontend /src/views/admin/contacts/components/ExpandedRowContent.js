import { Badge, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export default function ExpandedRowContent({ row }) {
  console.log("From contacts ExpandedRowContent ");
  console.log("row : ", row);
  
  // const { Contacts, leads } = row.original || {};

  const { Leads } = row.original || {}; // Fallback to empty object if row.original is undefined or null
  const leads = Leads || []; // Default to an empty array if Contacts is undefined

  const textColor = useColorModeValue('gray.600', 'white');

  return (
    <Box 
    // padding="0.5rem"
    >
      {/* Render Leads if available */}
      {leads && leads.length > 0 ? (
        <Box>
          <Text fontSize="md" fontWeight="700" mb="3" color={textColor}>
            Leads Associated with This Contact:
          </Text>
          {leads.map((lead, index) => {
            const { id, restaurantName, email, phone } = lead || {};

            return (
              <Flex
                key={index}
                mb="2"
                p="2"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                align="center"
                justify="space-between"
              >
                <Text
                  flex="1"
                  fontSize="sm"
                  color={restaurantName ? textColor : 'red.600'}
                  fontWeight="600"
                >
                  {restaurantName || 'No Lead Name Available'}
                </Text>
                <Text
                  flex="1"
                  fontSize="sm"
                  color={phone ? textColor : 'red.600'}
                  fontWeight="600"
                >
                  {phone || 'No phone Available'}
                </Text>
                <Text
                  flex="1"
                  fontSize="sm"
                  color={email ? textColor : 'red.600'}
                  fontWeight="600"
                >
                  {email || 'No email Available'}
                </Text>
                <Badge colorScheme="green" p="2">
                  Lead ID: {id || 'No ID Available'}
                </Badge>
              </Flex>
            );
          })}
        </Box>
      ) : (
        <Text fontSize="sm" color={'red.400'}>
          No leads associated with this contact.
        </Text>
      )}
    </Box>
  );
}
