// Navbar.js
import { Box, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="white" color="black" px={5} borderRadius="20px">
      <Flex align="center" h={16}>
        <Heading size="lg">Lead Management System</Heading>
        <Spacer />
        <Link to="/admin/default">
          <Button variant="ghost" colorScheme="whiteAlpha" color="black">
            Home
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
