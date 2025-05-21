import React, { useCallback, useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Image,
  Card,
  Heading,
  Text,
  Input,
  VisuallyHidden,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCard } from './redux/cardSlice';
import { RootState } from './redux/store';

interface CardEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function CardEditDialog({
  isOpen,
  onClose,
}: CardEditDialogProps) {
  const dispatch = useDispatch();
  const card = useSelector((state: RootState) => state.card);

  const [localImage, setLocalImage] = useState(card.image);
  const [localTitle, setLocalTitle] = useState(card.title);
  const [localSubtitle, setLocalSubtitle] = useState(card.subtitle);
  const [localImageScale, setLocalImageScale] = useState(card.imageScale);
  const [localImageTop, setLocalImageTop] = useState(card.imageTop);
  const [localImageRight, setLocalImageRight] = useState(card.imageRight);

  useEffect(() => {
    setLocalImage(card.image);
    setLocalTitle(card.title);
    setLocalSubtitle(card.subtitle);
    setLocalImageScale(card.imageScale);
    setLocalImageTop(card.imageTop);
    setLocalImageRight(card.imageRight);
  }, [card]);

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLocalImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalTitle(event.target.value);
    },
    []
  );

  const handleSubtitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSubtitle(event.target.value);
    },
    []
  );

  const handleImageScaleChange = useCallback(
    (valueAsString: string, valueAsNumber: number) => {
      setLocalImageScale(valueAsNumber);
    },
    []
  );

  const handleImageTopChange = useCallback(
    (value: number) => {
      setLocalImageTop(value);
    },
    []
  );

  const handleImageRightChange = useCallback(
    (value: number) => {
      setLocalImageRight(value);
    },
    []
  );

  const handleApply = useCallback(() => {
    dispatch(
      updateCard({
        image: localImage,
        title: localTitle,
        subtitle: localSubtitle,
        imageScale: localImageScale,
        imageTop: localImageTop,
        imageRight: localImageRight,
      })
    );
    onClose();
  }, [dispatch, localImage, localTitle, localSubtitle, localImageScale, localImageTop, localImageRight, onClose]);

  const handleCancel = useCallback(() => {
    setLocalImage(card.image);
    setLocalTitle(card.title);
    setLocalSubtitle(card.subtitle);
    setLocalImageScale(card.imageScale);
    setLocalImageTop(card.imageTop);
    setLocalImageRight(card.imageRight);
    onClose();
  }, [card, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="80vw !important">
        <ModalHeader>Edit Card</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="grid"
            gridTemplateColumns="1fr 1fr"
            gridGap={4}
          >
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Button
                  as="label"
                  htmlFor="image-upload"
                  variant="outline"
                  colorScheme="blue"
                >
                  Upload Image
                </Button>
                <VisuallyHidden>
                  <Input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </VisuallyHidden>
              </FormControl>
              <Input placeholder="Title" value={localTitle} onChange={handleTitleChange} />
              <Input placeholder="Subtitle" value={localSubtitle} onChange={handleSubtitleChange} />
              <NumberInput
                defaultValue={localImageScale}
                min={0.1}
                max={3}
                step={0.1}
                onChange={handleImageScaleChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormControl>
                <FormLabel>Image Top (%)</FormLabel>
                <Slider
                  aria-label="image-top"
                  defaultValue={localImageTop}
                  min={-100}
                  max={100}
                  step={1}
                  onChange={handleImageTopChange}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
              <FormControl>
                <FormLabel>Image Right (%)</FormLabel>
                <Slider
                  aria-label="image-right"
                  defaultValue={localImageRight}
                  min={-100}
                  max={100}
                  step={1}
                  onChange={handleImageRightChange}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
            </Stack>
            <Box>
              <Card direction="row" borderRadius="md" shadow="md" gap={4}>
                <Box overflow={"hidden"} w="200px" h="200px">
                  <Image
                    src={localImage}
                    alt="Card Image"
                    w="full"
                    h="full"
                    position={"relative"}
                    top={`${localImageTop}%`}
                    right={`${localImageRight}%`}
                    objectFit={"contain"}
                    style={{ transform: `scale(${localImageScale})` }}
                  />
                </Box>
                <Box>
                  <Heading size="lg" fontWeight="semibold">{localTitle}</Heading>
                  <Text fontSize="sm">{localSubtitle}</Text>
                </Box>
              </Card>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCancel}>
            Cancel
          </Button>
          <Button colorScheme="blue" mr={3} onClick={handleApply}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CardEditDialog;
