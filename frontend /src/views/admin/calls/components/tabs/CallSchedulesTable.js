import { EditIcon, AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { getAllCallSchedules, addOrUpdateCallSchedule } from 'api/callPlanApi';
import React, { useEffect, useState } from 'react';

const CallSchedulesTable = () => {
  const columnHelper = createColumnHelper();
  const [tableData, setTableData] = useState([]);
  const [callSchedules, setCallSchedules] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [newCall, setNewCall] = useState({
    leadId: '',
    callFrequency: '',
    lastCallDate: '',
  }); // New call form state
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const rowBgColor = useColorModeValue('blue.50', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedules = await getAllCallSchedules();
        setCallSchedules(schedules);
        setTableData(schedules);
        console.log('Schedules : ', schedules);
      } catch (error) {
        console.error('Error fetching call schedules:', error);
      }
    };

    fetchData();
  }, [isModalOpen]);

  const handleAddNewCall = async () => {
    try {
      const newSchedule = await addOrUpdateCallSchedule(
        newCall.leadId,
        newCall.callFrequency,
        newCall.lastCallDate,
      );

      // Update the table data after adding
      setCallSchedules([...callSchedules, newSchedule]);
      setTableData([...tableData, newSchedule]);
      setIsModalOpen(false); // Close the modal after saving

      alert('New Call Schedule Added!');
    } catch (error) {
      console.error('Error adding new call schedule:', error);
      alert('Failed to add new call schedule');
    }
  };

  const columns = [
    columnHelper.accessor('Lead.restaurantName', {
      id: 'restaurantName',
      header: () => (
        <Text fontSize="12px" color="gray.400">
          Restaurant Name
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('call_frequency', {
      id: 'call_frequency',
      header: () => (
        <Text fontSize="12px" color="gray.400">
          Call Frequency
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontWeight="700">
          {info.getValue()} Days
        </Text>
      ),
    }),
    columnHelper.accessor('last_call_date', {
      id: 'last_call_date',
      header: () => (
        <Text fontSize="12px" color="gray.400">
          Last Call Date
        </Text>
      ),
      cell: (info) => {
        const date = new Date(info.getValue());
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long', // E.g., December
          day: 'numeric', // E.g., 20
        });
        return (
          <Text color={textColor} fontWeight="700">
            {formattedDate}
          </Text>
        );
      },
    }),
    columnHelper.accessor('last_call_date', {
      id: 'last_call_date_time',
      header: () => (
        <Text fontSize="12px" color="gray.500">
          Last Call Time
        </Text>
      ),
      cell: (info) => {
        const date = new Date(info.getValue());
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        return (
          <Text color={textColor} fontWeight="700">
            {formattedTime}
          </Text>
        );
      },
    }),
    columnHelper.accessor('next_call_date', {
      id: 'next_call_date',
      header: () => (
        <Text fontSize="12px" color="gray.500">
          Next Call Date
        </Text>
      ),
      cell: (info) => {
        const date = new Date(info.getValue());
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long', // E.g., December
          day: 'numeric', // E.g., 20
        });
        return (
          <Text color={textColor} fontWeight="700">
            {formattedDate}
          </Text>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <Flex>
          <IconButton
            icon={<EditIcon />}
            // onClick={() => handleEditClick(info.row.original)}
            aria-label="Edit contact"
            variant="ghost"
            mr={2}
          />
        </Flex>
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
      <Box mb="20px">
        <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
          Add New Call Schedule
        </Button>
      </Box>

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
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal for adding a new call schedule */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CallSchedulesTable;
