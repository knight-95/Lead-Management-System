import { AddIcon, EditIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { fetchContacts, updateContact } from 'api/contactApi'; // Use contacts API
import Card from 'components/card/Card';
import React, { useEffect, useState } from 'react';
import AddContactModal from './modal/AddContactModal';
import EditContactModal from './modal/EditContactModal';
import ExpandedRowContent from './ExpandedRowContent';

const columnHelper = createColumnHelper();

export default function ComplexTable() {
  const [tableData, setTableData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [expandedRowIds, setExpandedRowIds] = useState(new Set());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const rowBgColor = useColorModeValue('blue.50', 'gray.700');

  const addNewContactToTable = (newContact) => {
    setTableData((prevData) => [...prevData, newContact]); // Use parent-provided state
  };

  useEffect(() => {
    const loadContacts = async () => {
      const contacts = await fetchContacts();
      setTableData(contacts);
    };
    loadContacts();
  }, []);

  const toggleRowExpansion = (rowId) => {
    setExpandedRowIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
    toggleRowExpansion(contact.id);
  };

  const handleSave = async (updatedContact) => {
    if (updatedContact && updatedContact.id) {
      try {
        // Update the contact in the backend
        const response = await updateContact(updatedContact.id, updatedContact);
        if (response) {
          // Re-fetch the contact list after successful update
          const contacts = await fetchContacts();
          setTableData(contacts); // Set updated contacts to state

          setIsEditModalOpen(false); // Close modal
        }
      } catch (error) {
        console.error('Failed to save contact:', error);
      }
    }
  };

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <Text fontSize="12px" color="gray.400">
          Name
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => (
        <Text fontSize="12px" color="gray.400">
          Phone
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: () => (
        <Text fontSize="12px" color="gray.400">
          Role
        </Text>
      ),
      cell: (info) => (
        <Badge
          colorScheme="blue"
          fontWeight="700"
          px="2"
          py="1"
          borderRadius="md"
        >
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <Text fontSize="12px" color="gray.400">
          Email
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => (
        <Text fontSize="12px" color="gray.400">
          Created
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontWeight="700">
          {new Date(info.getValue()).toLocaleDateString()}
        </Text>
      ),
    }),
    columnHelper.accessor('updatedAt', {
      id: 'updatedAt',
      header: () => (
        <Text fontSize="12px" color="gray.400">
          Updated
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontWeight="700">
          {new Date(info.getValue()).toLocaleDateString()}
        </Text>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <IconButton
          icon={<EditIcon />}
          onClick={() => handleEditClick(info.row.original)}
          aria-label="Edit contact"
          variant="ghost"
        />
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Card flexDirection="column" w="100%" px="0px">
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text color={textColor} fontSize="22px" fontWeight="700">
            Contacts Table
          </Text>
          <IconButton
            aria-label="Add Contact"
            icon={<AddIcon />}
            onClick={() => setIsAddModalOpen(true)}
            colorScheme="teal"
            size="sm"
          />
          <AddContactModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            addNewContactToTable={addNewContactToTable}
          />
        </Flex>
        <Box>
          <Table variant="simple" color="gray.500" mb="24px" mt="12px">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => {
                const isRowExpanded = expandedRowIds.has(row.id);
                return (
                  <React.Fragment key={row.id}>
                    <Tr
                      key={row.id}
                      onClick={() => toggleRowExpansion(row.id)}
                      _hover={{
                        transform: 'scale(1.02)',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer',
                      }}
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <Td key={cell.id}>
                          {index === row.getVisibleCells().length - 1 ? ( // Check if this is the last column
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          ) : cell.getValue() ? (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          ) : (
                            <span style={{ color: 'red' }}>
                              No Data Available
                            </span>
                          )}
                        </Td>
                      ))}
                    </Tr>

                    {isRowExpanded && (
                      <Tr>
                        <Td colSpan={columns.length + 1}>
                          <ExpandedRowContent row={row} />
                        </Td>
                      </Tr>
                    )}
                  </React.Fragment>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Card>
      {isEditModalOpen && (
        <EditContactModal
          contact={selectedContact}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
