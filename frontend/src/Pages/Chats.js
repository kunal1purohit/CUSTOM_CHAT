import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Chatstate } from '../Context/chatprovider.js'
import { Box } from '@chakra-ui/react';
import Sidedrawer from '../Component/misc/sidedrawer.js';
import Mychats from '../Component/misc/Mychats';
import Chatbox from '../Component/misc/Chatbox';

function Chats() {
  const {user} = Chatstate();
  console.log(user);

  return (
    <div style={{width:"100%"}}>
      {user && <Sidedrawer/>}
      <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      height="91.5vh"
      padding="10"
      >
        {user && <Mychats/>}
        {user && <Chatbox/>}
      </Box>
    </div>
  )
}

export default Chats
