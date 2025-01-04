import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const ExpandedRowContent = ({ interactions = [] }) => {
  const columnHelper = createColumnHelper();
  const [sorting, setSorting] = useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Define columns for the table
  const columns = [
    columnHelper.accessor('interaction_type', {
      id: 'interaction_type',
      header: () => (
        <Text fontSize="15px" color="black" fontWeight="700">
          Interaction Type
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
    columnHelper.accessor('interaction_date', {
      id: 'interaction_date',
      header: () => (
        <Text fontSize="15px" color="black" fontWeight="700">
          Interaction Date
        </Text>
      ),
      cell: (info) => {
        const date = new Date(info.getValue());
        const formattedDate = date.toLocaleDateString('en-US', {
          // weekday: 'long', // E.g., Monday
          year: 'numeric',
          month: 'long', // E.g., December
          day: 'numeric', // E.g., 20
        });
        return (
          <Text color={textColor} fontWeight="400">
            {formattedDate}
          </Text>
        );
      },
    }),
    columnHelper.accessor('interaction_date', {
      id: 'interaction_date',
      header: () => (
        <Text fontSize="15px" color="black" fontWeight="700">
          Interaction Time
        </Text>
      ),
      cell: (info) => {
        const date = new Date(info.getValue());
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // 12-hour format with AM/PM
        });
        return (
          <Text color={textColor} fontWeight="400">
            {formattedTime}
          </Text>
        );
      },
    }),

    columnHelper.accessor('details', {
      id: 'details',
      header: () => (
        <Text fontSize="15px" color="black" fontWeight="700">
          Interaction Details
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontWeight="400">
          {info.getValue()}
        </Text>
      ),
    }),
  ];

  const table = useReactTable({
    data: interactions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (interactions.length === 0) {
    return (
      <Box p="4">
        <Text color="red.500" fontSize="md">
          No interactions found for this lead.
        </Text>
      </Box>
    );
  }

  return (
    <Box p="4">
      <Table variant="simple">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  cursor="pointer"
                  textAlign="left"
                  borderColor={borderColor}
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
            <Tr
              key={row.id}
              // onClick={() => toggleRowExpansion(row.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Divider borderColor="gray.300" borderWidth="1px" marginTop="1rem" />
    </Box>
  );
};

export default ExpandedRowContent;
