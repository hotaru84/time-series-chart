import ChartComponent from './ChartComponent';
import { mockData } from './data';
import { VStack, Button, Text } from '@chakra-ui/react';
import SyslogTable from './SyslogTable';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './dashboard';
import ReorderModal from './ReorderModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reorderableItems, setReorderableItems] = useState([
    { id: '1', name: 'アイテム A' },
    { id: '2', name: 'アイテム B' },
    { id: '3', name: 'アイテム C' },
    { id: '4', name: 'アイテム D' },
  ]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveReorder = (newItems: { id: string; name: string }[]) => {
    console.log('Reordered items:', newItems);
    setReorderableItems(newItems); // Update the state with the new order
    setIsModalOpen(false);
  };

  return (
    <Router>
      <VStack w="100vw" h="full" gap={4} p={6}>
        <Routes>
          <Route path="/" element={<>
            <Link to="/dashboard">Dashboard</Link>
            <ChartComponent data={mockData} />
            <SyslogTable />
            <Button onClick={handleOpenModal} mt={4}>
              アイテムの順序変更
            </Button>
            <ReorderModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSave={handleSaveReorder}
              initialItems={reorderableItems}
            />
            <VStack mt={4} p={4} borderWidth="1px" borderRadius="md" w="full" maxW="md">
              <Text fontSize="lg" fontWeight="bold">現在のアイテム順序:</Text>
              {reorderableItems.map((item) => (
                <Text key={item.id}>{item.name}</Text>
              ))}
            </VStack>
          </>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </VStack>
    </Router>
  );
}

export default App;
