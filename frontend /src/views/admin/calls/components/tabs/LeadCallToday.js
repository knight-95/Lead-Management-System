import {
  Box,
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
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { getAllCallSchedules } from 'api/callPlanApi';

const LeadCallToday = () => {
  const columnHelper = createColumnHelper();
  const [tableData, setTableData] = useState([]);
  const [sorting, setSorting] = useState([]);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const rowBgColor = useColorModeValue('blue.50', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedules = await getAllCallSchedules();
        const today = new Date().toLocaleDateString('en-US'); // Get today's date

        // Filter the schedules to only include those with next_call_date matching today's date
        const filteredSchedules = schedules.filter((schedule) => {
          const nextCallDate = new Date(
            schedule.next_call_date,
          ).toLocaleDateString('en-US');
          return nextCallDate === today;
        });

        setTableData(filteredSchedules);
      } catch (error) {
        console.error('Error fetching call schedules:', error);
      }
    };

    fetchData();
  }, []);

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
          month: 'long',
          day: 'numeric',
        });
        return (
          <Text color={textColor} fontWeight="700">
            {formattedDate}
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
          month: 'long',
          day: 'numeric',
        });
        return (
          <Text color={textColor} fontWeight="700">
            {formattedDate}
          </Text>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={columns.length} textAlign="center">
                <Text color="gray.500">No Call Schedules for Today</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LeadCallToday;
