import { EditIcon } from '@chakra-ui/icons';
import {
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
  useToast,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  addOrUpdateCallSchedule,
  getAllCallSchedules,
  updateCallSchedule,
} from 'api/callPlanApi';
import { useEffect, useState } from 'react';
import AddCallScheduleModal from '../modal/AddCallScheduleModal';
import EditCallScheduleModal from '../modal/EditCallScheduleModal';

const CallSchedulesTable = () => {
  const toast = useToast();
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [editCall, setEditCall] = useState({
    leadId: '',
    callFrequency: '',
    lastCallDate: '',
  }); // Editing call form state

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
  }, [isModalOpen, isEditModalOpen]);

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

      // Show success toast
      toast({
        title: 'New Call Schedule Added',
        description: 'The call schedule was successfully added.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding new call schedule:', error);

      // Show error toast
      toast({
        title: 'Failed to Add Call Schedule',
        description:
          'There was an issue adding the call schedule. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };
  const handleEditClick = (callSchedule) => {
    setEditCall({
      lead_id: callSchedule.lead_id,
      call_frequency: callSchedule.call_frequency,
      last_call_date: callSchedule.last_call_date,
      next_call_date: callSchedule.next_call_date,
    });
    setIsEditModalOpen(true);
  };

  const handleEditCallSchedule = async (
    leadId,
    callFrequency,
    lastCallDate,
  ) => {
    try {
      const updatedSchedule = await updateCallSchedule(
        leadId,
        callFrequency,
        lastCallDate,
      );

      // Update the table data after editing
      setCallSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.lead_id === leadId
            ? {
                ...schedule,
                call_frequency: callFrequency,
                last_call_date: lastCallDate,
              }
            : schedule,
        ),
      );
      setTableData((prevData) =>
        prevData.map((schedule) =>
          schedule.lead_id === leadId
            ? {
                ...schedule,
                call_frequency: callFrequency,
                last_call_date: lastCallDate,
              }
            : schedule,
        ),
      );
      setIsEditModalOpen(false); // Close the modal after saving

      alert('Call Schedule Updated!');
    } catch (error) {
      console.error('Error updating call schedule:', error);
      alert('Failed to update call schedule');
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
            onClick={() => handleEditClick(info.row.original)} // Open edit modal with data
            aria-label="Edit call schedule"
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
        <Button colorScheme="teal" onClick={() => setIsModalOpen(true)} mt="1rem">
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

      {/* Use the AddCallScheduleModal */}
      <AddCallScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newCall={newCall}
        setNewCall={setNewCall}
        handleAddNewCall={handleAddNewCall}
      />

      {/* Edit Call Schedule Modal */}
      <EditCallScheduleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        call={editCall}
        onSave={handleEditCallSchedule}
      />
    </>
  );
};

export default CallSchedulesTable;
