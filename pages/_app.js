import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SocketProvider } from './api/socketContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </ChakraProvider>
  )
}

export default MyApp
