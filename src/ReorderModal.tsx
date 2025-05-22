import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ReorderItem {
  id: string;
  name: string;
}

interface ReorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (items: ReorderItem[]) => void;
  initialItems: ReorderItem[];
}

interface SortableItemProps {
  item: ReorderItem;
}

function SortableItem({ item }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      p={3}
      mb={2}
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      boxShadow="sm"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text>{item.name}</Text>
      <Box as="span" cursor="grab" p={2} {...attributes} {...listeners} fontSize={"lg"}>
        &#x2261; {/* Unicode for three horizontal lines (hamburger icon) */}
      </Box>
    </Box>
  );
}

const ReorderModal: React.FC<ReorderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItems,
}) => {
  const [items, setItems] = useState<ReorderItem[]>(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over?.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  const handleSave = () => {
    onSave(items);
    onClose();
  };

  const handleClose = () => {
    // Reset items to initial state if modal is closed without saving
    setItems(initialItems);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reorder</ModalHeader>
        <ModalBody>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <VStack spacing={2} align="stretch">
                {items.map((item) => (
                  <SortableItem key={item.id} item={item} />
                ))}
              </VStack>
            </SortableContext>
          </DndContext>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={handleClose}>
            CANCEL
          </Button>
          <Button colorScheme="blue" ml={3} onClick={handleSave}>
            SAVE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReorderModal;
