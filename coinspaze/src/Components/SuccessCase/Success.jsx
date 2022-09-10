import React from "react";
import HomeStyles from "./Success.module.css";
import {Box, Button, FormControl, FormHelperText, FormLabel, Input, Select, Textarea} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast
  } from '@chakra-ui/react'

export function Success()
{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formData,setFormData]=React.useState({
        email:"",
        from:"btc",
        amount:0,
        description:""
        
    });
    const [response,setResponse]=React.useState({});
    const toast = useToast()
    const [isSubmitted,setIsSubmitted]=React.useState(false); 
    const [error,setError]=React.useState(false);
    const [amountError,setAmountError]=React.useState(false);
    function validateEmail(inputData)
    {
        return /\S+@\S+\.\S+/.test(email);
    }
    const validateAmount=(num)=>
    {
        if(num<0)
        {
            return false;
        }
        else
        {
            return true;
        }

    }
    
    const handleChange=(e)=>
    {
        const {type,name,value}=e.target;
        if(type==="email")
        {
           
            setFormData({...formData,[name]:value})
            if(validateEmail(value))
            {
                setError(true);
            }
            else{
                setError(false);
            }
        }
        else if(type==="number")
        {
           
            setFormData({...formData,[name]:value})
            if(validateAmount(value))
            {
                setAmountError(true);
            }
            else{
                setAmountError(false);
            }
        }
        else
        {
            
            setFormData({...formData,[name]:value}) 
        }
        
    }
    async function payment()
    {
        const input={
            email:"sreejithskumar80@gmail.com",
            from:"btc",
            amount:133,
            description:""
        }
        try {

            const res=await fetch("https://coin-spaze.herokuapp.com/payment",{
                method:"POST",
                body:JSON.stringify(formData),
                headers:{"Content-type":"Application/json"}
            })
            const data=await res.json();
            console.log(data)
            setResponse(data);
            setIsSubmitted(true);
            setFormData({
                email:"",
                from:"btc",
                amount:0,
                description:""
                
            })
            
            
            
            
        } catch (error) {
            console.log(error)
            setIsSubmitted(true);
            setResponse({status:"Error",message:"Server Error"})
            setFormData({
                email:"",
                from:"btc",
                amount:0,
                description:""
                
            })
        }
    }
    React.useEffect(()=>
    {
        setIsSubmitted(false)
    },[response])
    const {email,from,amount,description}=formData;
    return(
        <>
        
        <Button onClick={onOpen} size="lg" colorScheme="blue">Payment</Button>   
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Payment</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>To</FormLabel>
                            <Input name="email" type="email" value={email} onChange={(e)=>(handleChange(e))} placeholder="Enter valid email address"/>
                            {!error?<FormHelperText color="red.800">Enter valid email</FormHelperText>:<FormHelperText></FormHelperText>}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>From</FormLabel>
                            <Select name="from" value={from} onChange={(e)=>(handleChange(e))}>
                                <option value="btc">BTC</option>
                                <option value="eth">ETH</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Amount</FormLabel>
                            <Input name="amount" value={amount} onChange={(e)=>(handleChange(e))}  type="number" placeholder="Enter the amount"/>
                            {!amountError?<FormHelperText color="red.800">Enter valid amount greater than 0</FormHelperText>:<FormHelperText></FormHelperText>}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input type="text" name="description" value={description} onChange={(e)=>(handleChange(e))}   placeholder="Enter any remarks"/>
                        </FormControl>
                       
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={(e)=>(payment())} disabled={email===""||from===""||amount===""} colorScheme='blue' mr={3} >
                            Submit
                        </Button>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                    {
                           isSubmitted? response.status==="Success"?toast({
                            title: response.status,
                            description:response.message,
                            position: 'top',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                          }):toast({
                            title: response.status,
                            description:response.message,
                            position: 'top',
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                          }):<></>
                    }
                </ModalContent>
            </Modal>
            
        </>
        
    )
}