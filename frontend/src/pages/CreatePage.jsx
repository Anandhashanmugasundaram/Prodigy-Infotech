import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";


function CreatePage() { 
    const toast = useToast();
  const {createProduct} = useProduct()
  const [newproducts, setNewProducts] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const handleAddProduct = async() => {
    
   const {success,message} =  await createProduct(newproducts) 
   if(!success){
    toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 4000,
        isClosable:true,
        position:"top",
         variant:"subtle"
     
        })
   }
   else{
    toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 4000,
        isClosable:true,
         position:"top",
        variant:"subtle"
        })
   }
 }
  return (
    <Container maxW={Container.sm}>
      <VStack spacing={8} >
        <Heading as={"h1"} textAlign={"center"} size={"2xl"} mt={10}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray:400")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              name="name"
              placeholder="Product name"
              value={newproducts.name}
              onChange={(e) =>
                setNewProducts({ ...newproducts, name: e.target.value })
              }
            />

            <Input
              name="price"
              placeholder="Product Price"
              value={newproducts.price}
              onChange={(e) =>
                setNewProducts({ ...newproducts, price: e.target.value })
              }
            />

            <Input
              name="image"
              placeholder="Url of Product Image"
              value={newproducts.image}
              onChange={(e) =>
                setNewProducts({ ...newproducts, image: e.target.value })
              }
            />

            <Input
              name="description"
              placeholder="Product Description"
              value={newproducts.description}
              onChange={(e) =>
                setNewProducts({ ...newproducts, description: e.target.value })
              }
            />
            <Link to='/'>
            <Button  colorScheme={"blue"} w={"full"} onClick={handleAddProduct}>
                Add Product
            </Button>
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
