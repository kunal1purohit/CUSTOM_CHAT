import React, { useState } from "react";
import { VStack, FormControl, FormLabel,Input, InputGroup, InputRightElement, Button ,useToast} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


function Login() {

    const [show,setshow] = useState(false);
    const [email,setemail] = useState();
    const [password,setpassword] = useState();
    const [loading,setloading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    
    const handleclick = () => {setshow(!show)};

    const submithandler = async () =>{
        setloading(true);
        if(!email || !password){
            toast({
                title:"please fill all the feilds",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            setloading(false);
            return;
        }


        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                },
            };
            const {data} = await axios.post("/api/user/login",
                {email,password},config).catch(console.log(200));
console.log(data);
                toast({
                    title:"login successful",
                    status:"success",
                    duration:5000,
                    isClosable:true,
                    position:"bottom"
                });
                localStorage.setItem("userInfo",JSON.stringify(data));
                setloading(false);
                history.push("/chats");
            
        } catch (error) {
            toast({
                title:"error occured while logging in",
                description : error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            setloading(false);
        }
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
              value={email}
              onChange={(e)=>{
                setemail(e.target.value)
              }}
            />
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input
            type={ show ? "text" : "password"}
              placeholder='Enter password'
              value={password}
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
        onClick={submithandler}
        isLoadinh = {loading}>
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
