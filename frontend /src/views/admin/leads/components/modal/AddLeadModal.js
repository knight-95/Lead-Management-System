import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { addLeadWithContacts } from 'api/leadApi';
import { useState } from 'react';

const AddLeadModal = ({ isOpen, onClose, addNewLeadToTable }) => {
  const [leadData, setLeadData] = useState({
    restaurantName: '',
    address: '',
    phone: '',
    email: '',
    leadStatus: '',
  });
  const [contacts, setContacts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactFieldsRequired, setContactFieldsRequired] = useState(false);
  const toast = useToast();

  const handleLeadChange = (e) => {
    const { name, value } = e.target;
    setLeadData({ ...leadData, [name]: value });
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = contacts.map((contact, i) =>
      i === index ? { ...contact, [field]: value } : contact,
    );
    setContacts(updatedContacts);
  };

  const addContactField = () => {
    setContacts([...contacts, { name: '', role: '', phone: '', email: '' }]);
    setContactFieldsRequired(true); // Make fields required when a contact is added
  };

  const removeContactField = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const { restaurantName, phone, email, leadStatus } = leadData;
    if (!restaurantName || !phone || !email || !leadStatus) {
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
      const payload = { ...leadData, contacts };
      await addLeadWithContacts(payload); // Call the new API function

      toast({
        title: 'Lead Added',
        description: 'The lead has been successfully added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset form and close modal
      setLeadData({
        restaurantName: '',
        address: '',
        phone: '',
        email: '',
        leadStatus: '',
      });
      setContacts([]);
      setContactFieldsRequired(false); // Reset the required state after submission
      addNewLeadToTable(leadData);
      onClose();
    } catch (error) {
      console.error('Error adding lead:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while adding the lead.',
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
        <ModalHeader>Add Lead</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Restaurant Name</FormLabel>
              <Input
                name="restaurantName"
                value={leadData.restaurantName}
                onChange={handleLeadChange}
                placeholder="Enter restaurant name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="address"
                value={leadData.address}
                onChange={handleLeadChange}
                placeholder="Enter address"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={leadData.phone}
                onChange={handleLeadChange}
                placeholder="Enter phone number"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={leadData.email}
                onChange={handleLeadChange}
                placeholder="Enter email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Lead Status</FormLabel>
              <Select
                name="leadStatus"
                value={leadData.leadStatus}
                onChange={handleLeadChange}
                placeholder="Select Lead Status"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
                <option value="FollowUp">Follow Up</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Contacts (Optional)</FormLabel>
              <VStack spacing={2} align="stretch">
                {contacts.map((contact, index) => (
                  <VStack key={index} spacing={2}>
                    <Input
                      placeholder="Contact Name"
                      value={contact.name}
                      onChange={(e) =>
                        handleContactChange(index, 'name', e.target.value)
                      }
                      isRequired={contactFieldsRequired} // Make it required if any contact is added
                    />
                    <Input
                      placeholder="Role"
                      value={contact.role}
                      onChange={(e) =>
                        handleContactChange(index, 'role', e.target.value)
                      }
                      isRequired={contactFieldsRequired} // Make it required if any contact is added
                    />
                    <Input
                      placeholder="Phone"
                      value={contact.phone}
                      onChange={(e) =>
                        handleContactChange(index, 'phone', e.target.value)
                      }
                      isRequired={contactFieldsRequired} // Make it required if any contact is added
                    />
                    <Input
                      placeholder="Email"
                      value={contact.email}
                      onChange={(e) =>
                        handleContactChange(index, 'email', e.target.value)
                      }
                      isRequired={contactFieldsRequired} // Make it required if any contact is added
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => removeContactField(index)}
                      aria-label="Remove Contact"
                    />
                  </VStack>
                ))}
                <Button
                  leftIcon={<AddIcon />}
                  onClick={addContactField}
                  size="sm"
                >
                  Add Contact
                </Button>
              </VStack>
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

export default AddLeadModal;
