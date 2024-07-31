import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import MessageBubble from '../messageBubble';

const index = (props) => {
  return (
    <Box>
      <MessageBubble sender="user" message={props.message} />
      {/* <MessageBubble sender="other" message="Hi there!" />
      <MessageBubble sender="user" message="How are you?" />
      <MessageBubble sender="other" message="I'm good, thanks!" /> */}
    </Box>
  );
};

export default index;
