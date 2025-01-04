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
  FormControl,
  FormLabel,
  Input,
  useToast,
  Select,
} from '@chakra-ui/react';

const EditLeadModal = ({ isOpen, onClose, lead, onSave }) => {
  
  const toast = useToast();

  // State to manage form data
  const [formData, setFormData] = useState({
    restaurantName: '',
    address: '',
    phone: '',
    email: '',
    leadStatus: '',
    contacts: [],
    leadId: '',
  });

  // Update formData when lead prop changes
  useEffect(() => {
    if (lead) {
      setFormData({
        restaurantName: lead.restaurantName,
        address: lead.address,
        phone: lead.phone,
        email: lead.email,
        leadStatus: lead.leadStatus,
        contacts: lead.contacts || [],
        leadId: lead.id,
      });
    }
  }, [lead]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving the lead
  const handleSave = () => {
    if (!formData.restaurantName || !formData.phone || !formData.email) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log('Form Data : ', formData);
      return;
    }

    console.log('Saving formData: ', formData); // Debug log
    onSave(formData); // Pass updated form data to onSave function
    onClose(); // Close the modal
    toast({
      title: 'Lead updated',
      description: 'The lead information has been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (!lead) {
    return null; // Don't render if no lead is passed
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Lead</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Restaurant Name */}
          <FormControl isRequired>
            <FormLabel>Restaurant Name</FormLabel>
            <Input
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Address */}
          <FormControl mt={4} isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Phone */}
          <FormControl mt={4} isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Email */}
          <FormControl mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Lead Status */}
          <FormControl mt={4}>
            <FormLabel>Lead Status</FormLabel>
            <Select
              name="leadStatus"
              value={formData.leadStatus}
              onChange={handleInputChange}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="FollowUp">Follow Up</option>
              <option value="Converted">Converted</option>
            </Select>
          </FormControl>

          {/* Contacts (optional) */}
          {formData.contacts && formData.contacts.length > 0 && (
            <FormControl mt={4}>
              <FormLabel>Contact Information</FormLabel>
              <div>
                {formData.contacts.map((contact, index) => (
                  <div key={index}>
                    <p>
                      <strong>Name:</strong> {contact.name}
                    </p>
                    <p>
                      <strong>Role:</strong> {contact.role}
                    </p>
                    <p>
                      <strong>Phone:</strong> {contact.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {contact.email}
                    </p>
                  </div>
                ))}
              </div>
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
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

export default EditLeadModal;
