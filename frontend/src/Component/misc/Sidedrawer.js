import {Input, Box, Button, Tooltip,Text,Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import { Chatstate } from '../../Context/chatprovider';
import Profile from './Profile';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem.js';
import  {Spinner}  from '@chakra-ui/spinner';

function Sidedrawer() {

  const [search,setsearch] = useState("");
  const [searchresult,setsearchresult] = useState([]);
  const [loading,setloading] = useState(false);
  const [loadingchat,setloadingchat] = useState();

  const {user,setselectedchat,chats,setchats} =Chatstate();
  const history=useHistory();

  const logouthandler = ()=>{
    localStorage.removeItem('userInfo');
    history.push("/");
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

const toast=useToast();

  const handlesearch=async()=>{
    if(!search){
      toast({
        title:"please enter something in search",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-left"
    });
    return;
    }

    try {
      setloading(true);
      const config={
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get(`/api/user?search=${search}`,config)
      setloading(false);
      setsearchresult(data);
      console.log(searchresult);
      
    } catch (error) {
      toast({
        title:"error occured",
        description:"failed to load search results",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left"
    });
    }

    
  }
  const accessChat=async(userId)=>{
    try {
      setloadingchat(true);
      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`
        },
      };
      const {data} =  await axios.post("/api/chat" , {userId} , config );
      if(!chats.find((c)=> c._id===data._id)) setchats([data,...chats])
      setselectedchat(data);
      setloadingchat(false);
      onClose();
    } catch (error) {
      toast({
        title:"error fetching chat",
        description:error.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left"
    });
    }
  }

  return (
    <>
      <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px"
      >
        <Tooltip label='search users to chat' hasArrow placement='bottom-end'>
          <Button variant="ghost" onClick={onOpen} >
          <i class="fa-solid fa-magnifying-glass"></i>
          <Text d={{base:"none" , md:"flex"}} px="4">Search User</Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-a-Tives
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
               <BellIcon fontSize="2xl" m={1}/>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
               <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <Profile user={user}>
              <MenuItem>MY Profile</MenuItem>
              </Profile>
              
              <MenuDivider></MenuDivider>
              <MenuItem onClick={logouthandler}>Logout</MenuItem>
            </MenuList> 
          </Menu>
        </div>


      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
          <DrawerBody>
          <Box display="flex" pb={2}>
            <Input
            placeholder="search my name or email"
            mr={2}
            value={search}
            onChange={(e)=>setsearch(e.target.value)}
            />
            <Button
             onClick={handlesearch}
             >Go</Button>

          </Box>
          {loading? (
            <ChatLoading/>
          ):(
            
            searchresult.map((user)=>(
              <UserListItem
              key={user._id}
              user={user}
              handleFunction={()=>accessChat(user._id)}
              />
            ))
          )}
          {loadingchat && <Spinner ml="auto" d="flex"/>}
          
        </DrawerBody>
        </DrawerContent>
        

      </Drawer>
    </>
  )
}

export default Sidedrawer
