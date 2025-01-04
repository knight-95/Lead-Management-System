import {
  Badge,
  Box,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AddIcon } from '@chakra-ui/icons';
import { fetchLeads } from 'api/leadApi';
import { fetchInteractionsByLead } from 'api/interactionApi';
import Card from 'components/card/Card';
import React, { useEffect, useState } from 'react';
import ExpandedRowContent from './ExpandedRowContent';
import AddInteractionModal from './modal/AddInteractionModal';
const columnHelper = createColumnHelper();

export default function InteractionTable() {
  const [tableData, setTableData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [expandedRowIds, setExpandedRowIds] = useState(new Set());
  const [interactionData, setInteractionData] = useState({});
  const [loadingInteractions, setLoadingInteractions] = useState(false);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const rowBgColor = useColorModeValue('blue.50', 'gray.700');

  const [isAddInteractionModalOpen, setIsAddInteractionModalOpen] =
    useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  const handleAddInteractionClick = (leadId) => {
    setSelectedLeadId(leadId);
    setIsAddInteractionModalOpen(true); // Open the modal
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

  const toggleRowExpansion = async (rowId, leadId) => {
    setExpandedRowIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });

    // Fetch interactions for the lead if the row is expanded
    if (!expandedRowIds.has(rowId)) {
      setLoadingInteractions(true);
      try {
        const interactions = await fetchInteractionsByLead(leadId);
        console.log('Interactions : ', interactions);
        setInteractionData((prev) => ({
          ...prev,
          [leadId]: interactions,
        }));
      } catch (error) {
        console.error('Error fetching interactions:', error);
      } finally {
        setLoadingInteractions(false);
      }
    }
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
            Interactions Table
          </Text>
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
                const leadId = row.original.id;
                const isRowExpanded = expandedRowIds.has(row.id);
                return (
                  <React.Fragment key={row.id}>
                    <Tr
                      onClick={() => toggleRowExpansion(row.id, leadId)}
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
                      <Td>
                        <IconButton
                          aria-label="Add Contact"
                          icon={<AddIcon />}
                          onClick={() => handleAddInteractionClick(leadId)}
                          colorScheme="teal"
                          size="sm"
                        />
                      </Td>
                    </Tr>
                    {isRowExpanded && (
                      <Tr>
                        <Td colSpan={columns.length + 1}>
                          {loadingInteractions ? (
                            <Spinner size="lg" />
                          ) : (
                            <ExpandedRowContent
                              interactions={interactionData[leadId]}
                            />
                          )}
                        </Td>
                      </Tr>
                    )}
                  </React.Fragment>
                );
              })}
            </Tbody>
          </Table>

          {/* Add Interaction Modal */}
          <AddInteractionModal
            isOpen={isAddInteractionModalOpen}
            onClose={() => setIsAddInteractionModalOpen(false)}
            leadId={selectedLeadId}
          />
        </Box>
      </Card>
    </>
  );
}
