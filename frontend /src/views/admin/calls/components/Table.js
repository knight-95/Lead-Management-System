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
              backgroundColor={isRowExpanded ? rowBgColor : 'transparent'}
            >
              {row.getVisibleCells().map((cell) => (
                <Td
                  key={cell.id}
                  fontSize={{ sm: '14px' }}
                  minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                  borderColor="transparent"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
</Box>;
