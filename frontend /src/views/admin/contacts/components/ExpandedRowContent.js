// ExpandedRowContent.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  useColorModeValue,
  Button,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import { fetchLeads } from 'api/leadApi';
import LeadAssociationModal from './modal/LeadAssociationModal';

export default function ExpandedRowContent({ row }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [associatedLeads, setAssociatedLeads] = useState(
    row.original?.Leads || [],
  ); // Initialize associatedLeads state
  const [leads, setLeads] = useState([]);
  const { Leads } = row.original || {}; // Fallback to empty object if row.original is undefined or null
  const contactId = row.original.id; // Get the contact ID from the row data
  const leadIds = Leads.map((lead) => lead.id);
  const textColor = useColorModeValue('gray.600', 'white');

  const statusColors = {
    new: '#00B0FF',
    contacted: '#FF7043',
    followup: '#FF9800',
    converted: '#4CAF50',
  };

  const refreshLeads = async () => {
    const allLeads = await fetchLeads();
    setLeads(allLeads); // Update the leads state with the latest data
  };

  const updateAssociatedLeads = (selectedLeadIds) => {
  setAssociatedLeads((prevLeads) => [
    ...prevLeads,
    ...leads.filter((lead) => selectedLeadIds.includes(lead.id)),
  ]);

  // Refresh leads after associating them
  refreshLeads();
};


  useEffect(() => {
    const fetchData = async () => {
      const allLeads = await fetchLeads();
      setLeads(allLeads);
    };
    fetchData();
  }, []);

  // console.log('Lead IDs : ', leadIds);
  return (
    <Box>
      {/* Render Leads if available */}
      {Leads && Leads.length > 0 ? (
        <Box>
          <Text fontSize="md" fontWeight="700" mb="3" color={textColor}>
            Leads Associated with This Contact:
          </Text>
          {Leads.map((lead, index) => {
            console.log('Console log Leads : ', Leads);
            const { id, restaurantName, email, phone, leadStatus } = lead || {};

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
                  minWidth="0"
                  isTruncated
                >
                  {restaurantName || 'No Lead Name Available'}
                </Text>

                <Box flex="1">
                  <Badge
                    colorScheme={statusColors[leadStatus.toLowerCase()]}
                    p="4px 8px"
                    borderRadius="md"
                    fontSize="sm"
                    fontWeight="700"
                    backgroundColor={statusColors[leadStatus.toLowerCase()]}
                    color="white"
                  >
                    {leadStatus || 'No Data Available'}
                  </Badge>
                </Box>
                <Text
                  flex="1"
                  fontSize="sm"
                  color={phone ? textColor : 'red.600'}
                  fontWeight="600"
                  minWidth="0"
                  isTruncated
                  marginLeft="3rem"
                >
                  {phone || 'No phone Available'}
                </Text>

                <Text
                  flex="1"
                  fontSize="sm"
                  color={email ? textColor : 'red.600'}
                  fontWeight="600"
                  minWidth="0"
                  isTruncated
                >
                  {email || 'No email Available'}
                </Text>

                <Badge colorScheme="green" p="2" textAlign="center">
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

      {/* Button to open modal for associating new leads */}
      <Button mt="4" onClick={onOpen} colorScheme="blue">
        Associate Leads
      </Button>

      <Divider borderColor="gray.300" borderWidth="1px" marginTop="1rem" />

      {/* LeadAssociationModal component */}
      <LeadAssociationModal
        isOpen={isOpen}
        onClose={onClose}
        leads={leads}
        contactId={contactId}
        leadIds={leadIds}
        updateAssociatedLeads={updateAssociatedLeads} // Pass the update function
      />
    </Box>
  );
}
