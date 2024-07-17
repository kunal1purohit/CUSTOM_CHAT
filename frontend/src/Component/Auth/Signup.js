import React, { useState } from "react";
import axios from 'axios';
import { VStack, FormControl, FormLabel,Input, InputGroup, InputRightElement, Button,useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function Signup() {
    const [show,setshow] = useState(false);
    const [name,setname] = useState();
    const [email,setemail] = useState();
    const [password,setpassword] = useState();
    const [confirmpassword,setconfirmpassword] = useState();
    const [pic,setpic] = useState();
    const [loading,setloading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const cloudinaryurl = "https://api.cloudinary.com/v1_1/djt0h1ldp/image/upload"

    const handleclick = () => {setshow(!show)};

    const postdetails = (pics) =>{
        setloading(true);
        if(pics === undefined){
            toast({
                title: 'Please select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            });
            return;
        }

        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","djt0h1ldp");
            fetch(cloudinaryurl,{
                method:"post",
                body:data,
            })
            .then((res)=>res.json())
            .then((data)=>{
                setpic(data.url.toString());
                setloading(false);
                console.log(data);
            })
            .catch((err)=>{
                console.log(err);
                setloading(false);
            });
        }else{
            toast({
                title: 'Please select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            });
            setloading(false);
            return;
        }

    }

    
    const submithandler = async () =>{
        setloading(true);
        if(!name || !email || !password ||!confirmpassword){
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
        if(password !== confirmpassword){
            toast({
                title:"passwords dont match",
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
            const {data} = await axios.post("/api/user",
                {name,email,password,pic},config)

                toast({
                    title:"registration successful",
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
                title:"error occured while signing up",
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
        onClick={submithandler}
        isLoading = {loading}>
            Sign Up
        </Button>
      </VStack>
    </div>
  );
}

export default Signup;
