import { useState } from 'react';
import { Box, Heading, Button, VStack, SimpleGrid } from '@chakra-ui/react';
import CardEditDialog from './CardEditDialog';
import CardComponent from './CardComponent';

function Dashboard() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onOpen = () => {
    setIsEditModalOpen(true);
  };

  const onClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <VStack spacing={4} w="full">
      <Heading marginBottom="20px">Dashboard</Heading>

      <Button onClick={onOpen}>Edit Card</Button>

      <CardEditDialog
        isOpen={isEditModalOpen}
        onClose={onClose}
      />
      <SimpleGrid columns={3} w="full" h="full">
        <CardComponent />
      </SimpleGrid>
    </VStack>
  );
}

export default Dashboard;
