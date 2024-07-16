import React, { useState } from "react";
import { VStack, FormControl, FormLabel,Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

function Signup() {
    const [show,setshow] = useState(false);
    const [name,setname] = useState();
    const [email,setemail] = useState();
    const [password,setpassword] = useState();
    const [confirmpassword,setconfirmpassword] = useState();
    const [pic,setpic] = useState();

    const handleclick = () => {setshow(!show)};

    const postdetails = (pics) =>{

    }

    const submithandler = (pics) =>{

    }
    
  return (
    <div>
      <VStack
        spacing={4}
        align="stretch"
      >
        <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder='Enter your Name'
              onChange={(e)=>{
                setname(e.target.value)
              }}
            />
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder='Enter your Email'
              onChange={(e)=>{
                setemail(e.target.value)
              }}
            />
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input
            type={ show ? "text" : "password"}
              placeholder='Enter password'
              onChange={(e)=>{
                setpassword(e.target.value)
              }}
            />
            <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
                {show ? "Hide" : "Show"}
            </Button>
            </InputRightElement>
            </InputGroup>

            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
            <Input
            type={ show ? "text" : "password"}
              placeholder='Confirm password'
              onChange={(e)=>{
                setconfirmpassword(e.target.value)
              }}
            />
            <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
                {show ? "Hide" : "Show"}
            </Button>
            </InputRightElement>
            </InputGroup>
           
        </FormControl>
       
        <FormControl >
        <FormLabel>Upload your picture</FormLabel>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e)=>postdetails(e.target.files[0])}
            />
        </FormControl>

        <Button
        colorScheme="blue"
        width="100%"
        style={{marginTop:15}}
        onClick={submithandler}>
            Sign Up
        </Button>
      </VStack>
    </div>
  );
}

export default Signup;
