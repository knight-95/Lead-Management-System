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
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { updateContact } from 'api/contactApi';

const EditContactModal = ({ isOpen, onClose, contact, onSave }) => {
  const [contactData, setContactData] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (contact) {
      setContactData({
        name: contact.name || '',
        role: contact.role || '',
        phone: contact.phone || '',
        email: contact.email || '',
      });
      console.log('Contact to edit : ', contact);
    }
  }, [contact]);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((contactData) => ({ ...contactData, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Filter out empty fields from contactData
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(contactData).filter(([_, value]) => value),
    );

    try {
      const updatedContact = await updateContact(contact.id, fieldsToUpdate);
      onSave(updatedContact);
      toast({
        title: 'Contact Updated',
        description: 'The contact has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      console.log('UpdatedContact : ', updatedContact);
      // Update the table with the updated contact
      // updateContactInTable(updatedContact.contact);

      // Reset form and close modal
      setContactData({
        name: '',
        role: '',
        phone: '',
        email: '',
      });
      onClose();
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while updating the contact.',
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
        <ModalHeader>Update Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={contactData.name}
                onChange={handleContactChange}
                placeholder="Enter contact name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input
                name="role"
                value={contactData.role}
                onChange={handleContactChange}
                placeholder="Enter role"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={contactData.phone}
                onChange={handleContactChange}
                placeholder="Enter phone number"
              />
            </FormControl>

            <FormControl>
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
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditContactModal;
