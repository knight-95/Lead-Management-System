// Chakra imports
import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import { fetchLeads } from 'api/leadApi'; // assuming fetchLeads is defined here
import Card from 'components/card/Card.js';
import PieChart from 'components/charts/PieChart';
import { useEffect, useState } from 'react';

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'navy.700');
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );
  // Initial state for pie chart data
  const [pieChartData, setPieChartData] = useState([0, 0, 0, 0]);
  // State for lead status
  const [leadStatus, setLeadStatus] = useState({
    new: 0,
    converted: 0,
    contacted: 0,
    followUp: 0,
  });

  // Fetch leads and update the lead status
  useEffect(() => {
    const fetchAndUpdateLeadStatus = async () => {
      const leads = await fetchLeads();
      const statusCount = {
        new: 0,
        converted: 0,
        contacted: 0,
        followUp: 0,
      };

      // Count the number of leads for each status
      leads.forEach((lead) => {
        switch (lead.leadStatus.toLowerCase()) {
          case 'new':
            statusCount.new += 1;
            break;
          case 'converted':
            statusCount.converted += 1;
            break;
          case 'contacted':
            statusCount.contacted += 1;
            break;
          case 'follow up':
            statusCount.followUp += 1;
            break;
          default:
            break;
        }
      });

      // Set the lead status count in the state
      setLeadStatus(statusCount);

      // Update pie chart data after fetching the leads
      const totalLeads =
        statusCount.new +
        statusCount.converted +
        statusCount.contacted +
        statusCount.followUp;
      const pieData = [
        (statusCount.new / totalLeads) * 100,
        (statusCount.contacted / totalLeads) * 100,
        (statusCount.converted / totalLeads) * 100,
        (statusCount.followUp / totalLeads) * 100,
      ];
      setPieChartData(pieData);
    };

    fetchAndUpdateLeadStatus();
  }, []);

  // Status colors
  const statusColors = {
    new: '#00B0FF', // Light Blue
    contacted: '#FF7043', // Deep Orange
    followup: '#FF9800', // Amber
    converted: '#4CAF50', // Green
  };

  const pieChartData1 = [4, 4, 4, 3];
  const pieChartOptions = {
    labels: ['New', 'Contacted', 'Follow Up', 'Converted'],
    colors: ['#00B0FF', '#FF7043', '#FF9800', '#4CAF50'],
    chart: {
      width: '50px',
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
  };
  return (
    <Card p="20px" align="center" direction="column" w="100%" {...rest}>
      <Flex
        px={{ base: '0px', '2xl': '10px' }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px" mb='1rem'>
          Lead Conversion Status
        </Text>
      </Flex>

      <PieChart
        h="100%"
        w="100%"
        chartData={pieChartData1}
        chartOptions={pieChartOptions}
      />

      <Card
        bg={cardColor}
        flexDirection="row"
        flexWrap="wrap"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        <Flex
          direction="row"
          justifyContent="space-evenly"
          align="center"
          w="100%"
          wrap="wrap"
        >
          <Flex direction="column" py="5px" align="center" maxW="25%">
            <Flex align="center">
              <Box
                h="8px"
                w="8px"
                bg={statusColors.new}
                borderRadius="50%"
                me="4px"
              />
              <Text
                fontSize="xs"
                color="secondaryGray.600"
                fontWeight="700"
                mb="5px"
              >
                New
              </Text>
            </Flex>
            <Text fontSize="lg" color={textColor} fontWeight="700">
              {(
                (leadStatus.new /
                  (leadStatus.new +
                    leadStatus.converted +
                    leadStatus.contacted +
                    leadStatus.followUp)) *
                100
              ).toFixed(2)}
              %
            </Text>
          </Flex>

          <Divider orientation="vertical" h="40px" mx="4" />

          <Flex direction="column" py="5px" align="center" maxW="25%">
            <Flex align="center">
              <Box
                h="8px"
                w="8px"
                bg={statusColors.converted}
                borderRadius="50%"
                me="4px"
              />
              <Text
                fontSize="xs"
                color="secondaryGray.600"
                fontWeight="700"
                mb="5px"
              >
                Converted
              </Text>
            </Flex>
            <Text fontSize="lg" color={textColor} fontWeight="700">
              17.64%
            </Text>
          </Flex>

          <Divider orientation="vertical" h="40px" mx="4" />

          <Flex direction="column" py="5px" align="center" maxW="25%">
            <Flex align="center">
              <Box
                h="8px"
                w="8px"
                bg={statusColors.contacted}
                borderRadius="50%"
                me="4px"
              />
              <Text
                fontSize="xs"
                color="secondaryGray.600"
                fontWeight="700"
                mb="5px"
              >
                Contacted
              </Text>
            </Flex>
            <Text fontSize="lg" color={textColor} fontWeight="700">
              23.52%
            </Text>
          </Flex>

          <Divider orientation="vertical" h="40px" mx="4" />

          <Flex direction="column" py="5px" align="center" maxW="25%">
            <Flex align="center">
              <Box
                h="8px"
                w="8px"
                bg={statusColors.followup}
                borderRadius="50%"
                me="4px"
              />
              <Text
                fontSize="xs"
                color="secondaryGray.600"
                fontWeight="700"
                mb="5px"
              >
                Follow Up
              </Text>
            </Flex>
            <Text fontSize="lg" color={textColor} fontWeight="700">
              23.52%
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Card>
  );
}
