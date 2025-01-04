import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack
} from '@chakra-ui/react';
import { addContact } from 'api/contactApi';
import { useState } from 'react';

const AddContactModal = ({ isOpen, onClose, refetchContacts }) => {
  const [contactData, setContactData] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const validateForm = () => {
    const { name, role, phone, email } = contactData;
    if (!name || !role || !phone || !email) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const newContact = await addContact(contactData); // Use the addContact API call

      toast({
        title: 'Contact Added',
        description: 'The contact has been successfully added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Call refetchContacts to update the table data in the parent
      refetchContacts();

      // Reset form and close modal
      setContactData({
        name: '',
        role: '',
        phone: '',
        email: '',
      });
      onClose();
    } catch (error) {
      console.error('Error adding contact:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while adding the contact.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={contactData.name}
                onChange={handleContactChange}
                placeholder="Enter contact name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Input
                name="role"
                value={contactData.role}
                onChange={handleContactChange}
                placeholder="Enter role"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={contactData.phone}
                onChange={handleContactChange}
                placeholder="Enter phone number"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={contactData.email}
                onChange={handleContactChange}
                placeholder="Enter email"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} isDisabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddContactModal;
