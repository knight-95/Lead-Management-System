// src/components/AddCallScheduleModal.js
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const AddCallScheduleModal = ({ isOpen, onClose, newCall, setNewCall, handleAddNewCall }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Call Schedule</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="leadId" isRequired>
            <FormLabel>Lead ID</FormLabel>
            <Input
              type="text"
              value={newCall.leadId}
              onChange={(e) =>
                setNewCall({ ...newCall, leadId: e.target.value })
              }
            />
          </FormControl>
          <FormControl id="callFrequency" isRequired mt={4}>
            <FormLabel>Call Frequency (in days)</FormLabel>
            <Input
              type="number"
              value={newCall.callFrequency}
              onChange={(e) =>
                setNewCall({ ...newCall, callFrequency: e.target.value })
              }
            />
          </FormControl>
          <FormControl id="lastCallDate" isRequired mt={4}>
            <FormLabel>Last Call Date</FormLabel>
            <Input
              type="date"
              value={newCall.lastCallDate}
              onChange={(e) =>
                setNewCall({ ...newCall, lastCallDate: e.target.value })
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleAddNewCall}>
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

export default AddCallScheduleModal;
