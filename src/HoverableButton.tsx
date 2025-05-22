import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonProps, Flex, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactElement, useState } from "react";

const MotionText = motion(Text);

interface ExpandableButtonProps extends ButtonProps {
  label: string;
  icon?: ReactElement;
}

export const HoverExpandButton: React.FC<ExpandableButtonProps> = ({
  label,
  colorScheme = "blue",
  icon,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      variant={hovered ? "solid" : "ghost"}
      colorScheme={colorScheme}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      px={3}
      overflow="hidden"
      transition="all 0.3s ease"
    >
      <Flex align="center" justify="center" position="relative">
        <Icon>{icon || <AddIcon />}</Icon>
        <MotionText
          initial={{ width: 0, opacity: 0 }}
          animate={hovered ? { width: "auto", opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          overflow="hidden"
          whiteSpace="nowrap"
          ml={2}
        >
          {label}
        </MotionText>
      </Flex>
    </Button>
  );
};
