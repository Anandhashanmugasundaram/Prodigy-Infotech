import { useState, useContext, createContext } from "react";

export const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(false)

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const createProduct = async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      return { success: false, message: "Fill all fields" };
    }

    try {
      const res = await fetch("/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (data.success) {
        addProduct(newProduct);

        return { success: true, message: "Success", data };
      } else {
        return {
          success: true,
          message: data.message || "Error adding product",
        };
      }
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "Server error" };
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/products/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to fetch products:", errorData.message);
        return;
      }

      const data = await res.json();
      setProducts(data.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const DeleteProduct = async (id) => {
    try {
      if (!id) {
        throw new Error("Invalid product ID");
      }

      const res = await fetch(`/api/products/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete product: ${errorText}`);
      }

      const data = await res.json();
      console.log("Delete response:", data);

      if (!data || !data.success) {
        throw new Error("Invalid response structure from server");
      }
      setProducts(products.filter((product) => product._id !== id));

      return { success: true, message: "Product deleted" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: error.message || "An error occurred" };
    }
  };

  const UpdateProduct = async (id, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update product: ${errorText}`);
      }

      const data = await res.json();

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? data.data : product
        )
      );

      return { success: true, message: "Product updated", data: data.data };
    } catch (error) {
      return { success: false, message: error.message || "An error occurred" };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        createProduct,
        useProduct,
        fetchProduct,
        DeleteProduct,
        UpdateProduct,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
