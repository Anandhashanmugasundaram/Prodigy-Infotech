import React, { useEffect } from "react";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function Home() {
  const { fetchProduct, products, loading } = useProduct();

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    console.log(products.length);
  }, [products]); // Make sure products is included in the dependency array

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"35"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r,cyan.400,blue.500)"}
          bgClip={"text"}
        >
          Current Products
        </Text>

        {/* Corrected the syntax for conditional rendering */}
        {loading ? (
          <Text fontSize="2xl">Loading...</Text>
        ) : products.length === 0 ? (
          <Text
            fontSize="20"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            color="gray.500"
          >
            No Products Found ☹️{" "}
            <Link to="/create">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        ) : (
          <SimpleGrid
            columns={{
              base: 1, // 1 column on small screens
              md: 2, // 2 columns on medium screens
              lg: 3, // 3 columns on large screens
            }}
            spacing={10}
            w="full"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}

export default Home;
