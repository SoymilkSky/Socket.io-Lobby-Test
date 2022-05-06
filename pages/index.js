import Head from 'next/head';
import Image from 'next/image';
import ChakraTest from '../components/modalTest.jsx';
import StyledTokenHolder from '../components/styles/StyledTokenHolder';
import questions from '../questions';

export default function Home() {
  return (
    <>
      <StyledTokenHolder>
        <ChakraTest token={'yes'} count={5} questions={questions} /> <br/>
        <ChakraTest token={'no'} count={2} questions={questions} /> <br/>
        <ChakraTest token={'maybe'} count={4} questions={questions} /> <br/>
      </StyledTokenHolder>
    </>
  )
};
