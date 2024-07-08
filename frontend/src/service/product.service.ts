import baseUrl from "../utils/constants/api.constants";

class ProductService {
  static createProduct = async (data: any): Promise<any> => {
    try {
      const response = await fetch(`${baseUrl}/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Product creation Failed");
      }
      console.log("response");
      return await response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  static updateProduct = async (id: string, data: any): Promise<any> => {
    try {
      const response = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Product update Failed");
      }
      console.log("response");
      return await response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  static getProductById = async (id: string): Promise<any> => {
    try {
      const response = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Product Not Found");
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  static getProducts = async (page?: number, limit?: number): Promise<any> => {
    try {
      const response = await fetch(
        `${baseUrl}/api/products/find?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Products Not Found");
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export default ProductService;
