import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { addInteraction } from 'api/interactionApi'; // Import the addInteraction API function

const AddInteractionModal = ({ isOpen, onClose, leadId }) => {
  const [interactionType, setInteractionType] = useState('');
  const [interactionDate, setInteractionDate] = useState('');
  const [details, setDetails] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    const interactionData = {
      lead_id: leadId,
      interaction_type: interactionType,
      interaction_date: interactionDate,
      details: details,
    };

    try {
      const result = await addInteraction(interactionData);
      toast({
        title: 'Interaction Added',
        description: 'The interaction was successfully added.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close the modal after submission
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add interaction.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Interaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="interaction-type" mb="4">
            <FormLabel>Interaction Type</FormLabel>
            <Select
              value={interactionType}
              onChange={(e) => setInteractionType(e.target.value)}
              placeholder="Select Interaction Type"
            >
              <option value="Call">Call</option>
              <option value="Meeting">Meeting</option>
              <option value="Order">Order</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Negotiation">Negotiation</option>
            </Select>
          </FormControl>

          <FormControl id="interaction-date" mb="4">
            <FormLabel>Interaction Date</FormLabel>
            <Input
              type="datetime-local"
              value={interactionDate}
              onChange={(e) => setInteractionDate(e.target.value)}
            />
          </FormControl>
          <FormControl id="details" mb="4">
            <FormLabel>Details</FormLabel>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Add Details"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSubmit} marginBottom="1rem">
            Add Interaction
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddInteractionModal;
