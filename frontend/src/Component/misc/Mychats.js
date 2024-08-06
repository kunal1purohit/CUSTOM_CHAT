import React, { useEffect, useState } from 'react'
import { Chatstate } from '../../Context/chatprovider';
import { Box, Button ,Stack,useToast,Text} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import ChatLoading from './ChatLoading.js';
import { getsender } from '../../config/Chatlogics.js';



function Mychats() {
  const [loggeduser,setloggeduser] = useState();
  const {selectedchat , setselectedchat , user , chats , setchats} = Chatstate();
  const toast = useToast();
  const fetchchats = async()=>{
    try {
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get("/api/chat" , config);
      setchats(data);
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to load chats",
        status: "error",
        duration:5000,
        isClosable :true,
        position : "bottom-left",
      });
    }
  }

  useEffect(()=>{
    setloggeduser(JSON.parse(localStorage.getItem("userInfo")));
    fetchchats();
  },[])


  return (
    <Box
    display={{base:selectedchat? "none":"flex" , md:"flex"}}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{base:"100%" , md:"31%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
      <Box
      pb={3}
      px={3}
      fontSize={{base:"28px" , md:"30px"}}
      fontFamily="Work sans"
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      >
        My Chats
        <Button
        display="flex"
        fontSize={{base:"17px" , md:"10px" , lg:"17px"}}
        rightIcon={<AddIcon/>}
        >
        New Group Chat
        </Button>
      </Box>

      <Box
      display="flex"
      flexDir="column"
      p={3}
      bg="#F8F8F8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"

      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat)=>(
              <Box
              onClick={()=>setselectedchat(chat)}
              cursor="pointer"
              bg={selectedchat===chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedchat === chat ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
              >
                <Text>
                  {!chat.isgrpchat?(getsender(loggeduser,chat.users)):(chat.chatname)}
                </Text>
              </Box>
            ))}

          </Stack>
        ):(
          <ChatLoading/>
        )}

      </Box>

    </Box>
  )
}

export default Mychats
