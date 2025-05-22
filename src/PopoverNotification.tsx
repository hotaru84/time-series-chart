import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Box,
} from '@chakra-ui/react';

interface PopoverNotificationProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function PopoverNotification({ title, description, children }: PopoverNotificationProps) {
  return (
    <Popover trigger="hover" placement="bottom">
      <PopoverTrigger >
        <Box display="inline-block">{children}</Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>{title}</PopoverHeader>
        <PopoverBody>{description}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverNotification;
