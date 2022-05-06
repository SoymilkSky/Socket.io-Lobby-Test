import {
  useDisclosure, Button, Modal, ModalContent, ModalOverlay,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

function ChakraTest({ token, count, questions }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const icon = {
    yes: '✅',
    no: '❌',
    maybe: '❔',
  }

  return (
    <>
    <Button colorScheme={'transparent'} onClick={onOpen} mr={2}>{icon[token]} x{count}</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{token}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {questions[token].map((question) => (<div key={question}>{question}</div>))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={2} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
};

export default ChakraTest;