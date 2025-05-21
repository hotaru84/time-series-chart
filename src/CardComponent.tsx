import { Box, Image, Heading, Text, Card } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function CardComponent() {
  const card = useSelector((state: RootState) => state.card);

  return (
    <Card direction="row" borderRadius="md" shadow="md" gap={4}>
      <Box overflow={"hidden"} w="120px" h="120px">
        <Image
          src={card.image}
          alt="Card Image"
          w="full"
          h="full"
          position={"relative"}
          top={`${card.imageTop}%`}
          right={`${card.imageRight}%`}
          objectFit={"contain"}
          style={{ transform: `scale(${card.imageScale})` }}
        />
      </Box>
      <Box>
        <Heading size="lg" fontWeight="semibold">{card.title}</Heading>
        <Text fontSize="sm">{card.subtitle}</Text>
      </Box>
    </Card>
  );
}

export default CardComponent;
