import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

const EditCallScheduleModal = ({ isOpen, onClose, call, onSave }) => {
  const [callFrequency, setCallFrequency] = useState(call.call_frequency || '');
  const [lastCallDate, setLastCallDate] = useState(call.last_call_date || '');

  const handleSave = () => {
    onSave(call.lead_id, callFrequency, lastCallDate); // No need to pass leadId manually, it’s already in `call`
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Call Schedule</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="callFrequency" isRequired>
            <FormLabel>Call Frequency (in days)</FormLabel>
            <Input
              type="number"
              value={callFrequency}
              onChange={(e) => setCallFrequency(e.target.value)}
            />
          </FormControl>
          <FormControl id="lastCallDate" isRequired mt={4}>
            <FormLabel>Last Call Date</FormLabel>
            <Input
              type="date"
              value={lastCallDate}
              onChange={(e) => setLastCallDate(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCallScheduleModal;
