import React, { useRef, useCallback, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Spinner,
  Center,
} from '@chakra-ui/react';
import useDummySysLog from './useDummySysLog';

const SyslogTable: React.FC = () => {
  const {
    data,
    loading,
    loadNext,
    hasPrevious,
    loadPrevious,
    hasNext,
  } = useDummySysLog();

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (tableContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
      if (scrollTop === 0 && hasPrevious && !loading) {
        loadPrevious();
      } else if (scrollTop + clientHeight >= scrollHeight - 5 && hasNext && !loading) {
        loadNext();
      }
    }
  }, [hasPrevious, loading, hasNext, loadPrevious, loadNext]);

  useEffect(() => {
    if (tableContainerRef.current && !loading) {
      const scrollHeight = tableContainerRef.current.scrollHeight;
      const clientHeight = tableContainerRef.current.clientHeight;
      const newScrollTop = (scrollHeight - clientHeight) / 2;
      tableContainerRef.current.scrollTop = newScrollTop;
    }
  }, [data, loading]);

  return (
    <Box
      w="full"
      h="50vh"
      overflow={"auto"}
      ref={tableContainerRef}
      onScroll={handleScroll}
    >
      <Table variant="simple">
        <Thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <Tr>
            <Th>ID</Th>
            <Th>Timestamp</Th>
            <Th>Severity</Th>
            <Th>Message</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading && (
            <Tr>
              <Td colSpan={4}>
                <Center>
                  <Spinner size="sm" mr={2} />
                  Loading previous...
                </Center>
              </Td>
            </Tr>
          )}
          {data.map((log) => (
            <Tr key={log.id}>
              <Td>{log.id}</Td>
              <Td>{log.timestamp}</Td>
              <Td>{log.severity}</Td>
              <Td>{log.message}</Td>
            </Tr>
          ))}
          {loading && (
            <Tr>
              <Td colSpan={4}>
                <Center>
                  <Spinner size="sm" mr={2} />
                  Loading more...
                </Center>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SyslogTable;
