/* eslint-disable */

import React from 'react';
import {
  Box,
  Text,
  Flex,
  Badge,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

export default function ExpandedRowContent({ row }) {
  // Ensure that row and its properties exist before destructuring them
  const { address, Contacts } = row.original || {}; // Fallback to empty object if row.original is undefined or null
  const contacts = Contacts || []; // Default to an empty array if Contacts is undefined

  const textColor = useColorModeValue('gray.600', 'white');

  return (
    <Box padding="0.5rem">
      <Text fontSize="md" fontWeight="600" mb="2" color={textColor}>
        Additional Information:
      </Text>

      {/* Check if address exists before rendering */}
      {address && (
        <Flex mb="4">
          <Text fontSize="sm" fontWeight="500" color={textColor}>
            Address:
          </Text>
          <Text fontSize="sm" color={textColor} marginLeft="1rem">
            {address}
          </Text>
        </Flex>
      )}
      <Divider
        borderColor="gray.300"
        borderWidth="1px"
        marginTop="1rem"
        marginBottom="1rem"
      />

      {/* Check if contacts exist and are non-empty */}
      {contacts.length > 0 ? (
        <Box>
          <Text fontSize="sm" fontWeight="700" mb="2" color={textColor}>
            Contacts:
          </Text>
          {contacts.map((contact, index) => {
            const { name, email, phone, role } = contact || {};

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
                  color={name ? textColor : 'red.600'}
                  fontWeight="600"
                >
                  {name || 'No Name Available'}{' '}
                  {/* Default if name is missing */}
                </Text>
                <Text
                  flex="1"
                  fontSize="sm"
                  color={email ? textColor : 'red.600'}
                  fontWeight="600"
                >
                  {email ? `Email: ${email}` : 'No Email Available'}{' '}
                  {/* Default if email is missing */}
                </Text>
                <Text
                  flex="1"
                  fontSize="sm"
                  color={phone ? textColor : 'red.600'}
                  fontWeight="600"
                >
                  {phone || 'No Phone Available'}{' '}
                  {/* Default if phone is missing */}
                </Text>
                <Badge colorScheme="blue" p="2">
                  {role || 'No Role Assigned'}{' '}
                  {/* Default if role is missing */}
                </Badge>
              </Flex>
            );
          })}
        </Box>
      ) : (
        <Text fontSize="sm" color={'red.400'}>
          No contacts available
        </Text>
      )}
    </Box>
  );
}
