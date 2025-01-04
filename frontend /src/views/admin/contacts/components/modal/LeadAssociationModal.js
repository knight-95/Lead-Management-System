import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Text,
  Stack,
  Flex,
  Grid,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { associateLeadsWithContact } from 'api/contactApi';

const LeadAssociationModal = ({
  isOpen,
  onClose,
  leads,
  contactId,
  leadIds,
  updateAssociatedLeads,
}) => {
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const toast = useToast(); // Initialize the toast hook

  // Update selectedLeadIds whenever the modal opens
  useEffect(() => {
    if (isOpen && leadIds) {
      setSelectedLeadIds(leadIds); // Set the already associated leads as selected
    }
  }, [isOpen, leadIds]);

  const handleAssociateLeads = async () => {
    try {
      await associateLeadsWithContact(contactId, selectedLeadIds);

      // Show success toast
      toast({
        title: 'Leads successfully associated!',
        description:
          'The selected leads have been successfully associated with the contact.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      // Update the parent component with new associated leads and refresh leads
      updateAssociatedLeads(selectedLeadIds);

      setSelectedLeadIds([]); // Clear selected leads
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error associating leads:', error);

      // Show error toast
      toast({
        title: 'Error associating leads',
        description:
          'An error occurred while associating the leads with the contact.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
    window.location.reload();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={useBreakpointValue({ base: 'full', md: 'lg' })}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg" fontWeight="bold" color="gray.700">
          Associate Leads with Contact
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="md" fontWeight="600" mb="4" color="gray.600">
            Select leads to associate with this contact:
          </Text>
          {/* Stack component to display leads vertically */}
          <Stack spacing={4}>
            {leads.map((lead) => (
              <Flex key={lead.id}>
                <Grid
                  templateColumns="50px 1fr 1fr"
                  width="full"
                  alignItems="center"
                >
                  {/* Checkbox Column */}
                  <Checkbox
                    value={lead.id}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLeadIds((prev) => [...prev, lead.id]);
                      } else {
                        setSelectedLeadIds((prev) =>
                          prev.filter((id) => id !== lead.id),
                        );
                      }
                    }}
                    isChecked={selectedLeadIds.includes(lead.id)}
                    colorScheme="blue"
                  />

                  {/* Restaurant Name Column */}
                  <Text fontSize="sm" color="gray.700" fontWeight="600">
                    {lead.restaurantName}
                  </Text>

                  {/* Phone Column */}
                  <Text
                    fontSize="sm"
                    color="gray.700"
                    fontWeight="600"
                    textAlign="right"
                  >
                    {lead.phone}
                  </Text>
                </Grid>
              </Flex>
            ))}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} colorScheme="gray">
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleAssociateLeads}
            isDisabled={selectedLeadIds.length === 0}
          >
            Associate Selected Leads
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LeadAssociationModal;
