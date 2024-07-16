import React, { useState } from "react";
import { VStack, FormControl, FormLabel,Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";


function Login() {

    const [show,setshow] = useState(false);
    const [email,setemail] = useState();
    const [password,setpassword] = useState();
    
    const handleclick = () => {setshow(!show)};

    const submithandler = (pics) =>{

    }


  return (
    <div>
      <VStack
        spacing={4}
        align="stretch"
      >
        <FormControl isRequired>
           
            
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

            
           
        </FormControl>
       
       

        <Button
        colorScheme="blue"
        width="100%"
        style={{marginTop:15}}
        onClick={submithandler}>
Login        </Button>

<Button
variant="solid"
        colorScheme="red"
        width="100%"
       
        onClick={()=>{
            setemail("guest@example.com");
            setpassword("guest123")
        }}>
Get Guest User Credentials        </Button>
      </VStack>
    </div>
  )
}

export default Login
