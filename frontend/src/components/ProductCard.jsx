import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProduct } from "../context/ProductContext";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const [updatedProducts, setUpdatedProducts] = useState(product);
  const { DeleteProduct,UpdateProduct } = useProduct();
  const bg = useColorModeValue("gray.200", "gray.900");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdate = async (id, updatedProduct) => {
    const { success, message } = await UpdateProduct(id, updatedProduct);
    if (success) {
      toast({
        title: "Product Updated",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const handleDelete = async (id) => {
    console.log("Deleting product with ID:", id);

    const { success, message } = await DeleteProduct(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      width="sm"
      rounded="lg"
      bg={bg}
      overflow="hidden"
      transition="all 0.3s ease-in-out"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h2" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {`$${product.price}`}
        </Text>
        <Text fontWeight="semibold" fontSize="xl" color={textColor} mb={2}>
          {product.description}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon onClick={onOpen} />} />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Product Name" name="name" 
              value={updatedProducts.name} 
              onChange={(e) => setUpdatedProducts({...updatedProducts,name:e.target.value}) }
                />
              <Input placeholder="Product Price" name="price"
                 value={updatedProducts.price}
                 onChange={(e) => setUpdatedProducts({...updatedProducts,price:e.target.value}) }
              />
              <Input placeholder="Product Description" name="description"
               onChange={(e) => setUpdatedProducts({...updatedProducts,description:e.target.value}) }
                 value={updatedProducts.description}
              />
              <Input placeholder="Product Image Url" name="image"
               onChange={(e) => setUpdatedProducts({...updatedProducts,image:e.target.value}) }
                 value={updatedProducts.image}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleUpdate(product._id,updatedProducts)}>
              Update
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
