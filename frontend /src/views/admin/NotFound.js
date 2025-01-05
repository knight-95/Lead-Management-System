import { Box, Button, Heading, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 

const NotFoundPage = () => {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <Center height="50vh">
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb="4" color="red.500">
          404
        </Heading>
        <Text fontSize="lg" color="gray.500" mb="6">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Button onClick={handleGoHome} colorScheme="blue">
          Go Back to Home
        </Button>
      </Box>
    </Center>
  );
};

export default NotFoundPage;
