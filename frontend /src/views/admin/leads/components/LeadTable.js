import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
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
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { deleteLead, fetchLeads, updateLead } from 'api/leadApi';
import Card from 'components/card/Card';
import React, { useEffect, useState } from 'react';
import ExpandedRowContent from './ExpandedRowContent';
import AddLeadModal from './modal/AddLeadModal';
import EditLeadModal from './modal/EditLeadModal';
const columnHelper = createColumnHelper();

export default function ComplexTable() {
  const [tableData, setTableData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [expandedRowIds, setExpandedRowIds] = useState(new Set());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeadToDelete, setSelectedLeadToDelete] = useState(null);
  const cancelRef = React.useRef();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const rowBgColor = useColorModeValue('blue.50', 'gray.700');

  const addNewLeadToTable = (newLead) => {
    setTableData((prevData) => [...prevData, newLead]); // Add new lead to the table
  };

  const statusColors = {
    new: '#00B0FF',
    contacted: '#FF7043',
    followup: '#FF9800',
    converted: '#4CAF50',
  };

  useEffect(() => {
    const loadLeads = async () => {
      const leads = await fetchLeads();
      setTableData(leads);
    };
    loadLeads();
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

  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
    toggleRowExpansion(lead.id);
  };

  const handleSave = async (updatedLead) => {
    if (updatedLead && updatedLead.leadId) {
      try {
        // Update the lead in the backend
        const response = await updateLead(updatedLead.leadId, updatedLead);
        console.log('API Response after update: ', response);

        if (response) {
          // Re-fetch the leads after update
          const leads = await fetchLeads();
          console.log('Fetched Leads after update: ', leads);

          // Update the local state with the fetched leads
          setTableData(leads); // Update the table data with the latest leads

          // Close the modal after saving
          setIsEditModalOpen(false);
        } else {
          console.error('Failed to update the lead in the backend');
        }
      } catch (error) {
        console.error('Failed to save lead:', error);
      }
    } else {
      console.error('Updated lead is missing an id:', updatedLead);
    }
  };

  const handleDeleteClick = (lead) => {
    setSelectedLeadToDelete(lead);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    console.log('Selected Lead to Delete : ', selectedLeadToDelete);
    if (selectedLeadToDelete && selectedLeadToDelete.id) {
      try {
        const response = await deleteLead(selectedLeadToDelete.id);
        if (response) {
          const leads = await fetchLeads();
          setTableData(leads);
        } else {
          console.error('Failed to delete the lead');
        }
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
    setIsDeleteModalOpen(false);
  };

  const columns = [
    columnHelper.accessor('restaurantName', {
      id: 'restaurantName',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Restaurant Name
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('leadStatus', {
      id: 'leadStatus',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Status
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Badge
            colorScheme={statusColors[info.getValue().toLowerCase()]}
            p="4px 8px"
            borderRadius="md"
            fontSize="sm"
            fontWeight="700"
            backgroundColor={statusColors[info.getValue().toLowerCase()]}
            color="white"
          >
            {info.getValue()}
          </Badge>
        </Flex>
      ),
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Phone
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Created
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {new Date(info.getValue()).toLocaleDateString()}
        </Text>
      ),
    }),
    columnHelper.accessor('updatedAt', {
      id: 'updatedAt',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Updated
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {new Date(info.getValue()).toLocaleDateString()}
        </Text>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <Flex>
          <IconButton
            icon={<EditIcon />}
            onClick={() => handleEditClick(info.row.original)}
            aria-label="Edit lead"
            variant="ghost"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteClick(info.row.original)}
            aria-label="Delete lead"
            variant="ghost"
            colorScheme="red"
            ml={2}
          />
        </Flex>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Card
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Lead Table
          </Text>
          <Flex alignItems="center" gap="10px">
            <IconButton
              aria-label="Add Lead"
              icon={<AddIcon />}
              onClick={() => setIsAddModalOpen(true)}
              variant="solid"
              colorScheme="teal"
              size="sm"
            />

            <AddLeadModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              addNewLeadToTable={addNewLeadToTable}
            />
          </Flex>
        </Flex>

        <Box>
          <Table variant="simple" color="gray.500" mb="24px" mt="12px">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Flex>
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
                      onClick={() => toggleRowExpansion(row.id)}
                      _hover={{
                        transform: 'scale(1.02)',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer',
                      }}
                      backgroundColor={
                        isRowExpanded ? rowBgColor : 'transparent'
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <Td
                          key={cell.id}
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor="transparent"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
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
        <EditLeadModal
          lead={selectedLead}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
      {isDeleteModalOpen && (
        <AlertDialog
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Confirm Deletion</AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete the lead "
                {selectedLeadToDelete?.restaurantName}"?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
}
