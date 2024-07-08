import { Request, Response } from "express";
import errorStatus from "../utils/error/error.status";
import UserService from "../services/user.service";
import RequestService from "../services/request.service";
import { RequestType } from "../utils/constants/user.constants";
import { SellerRequestDocument } from "../models/request.model";
import Product, { Category } from "../models/product.models";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      quantity,
      price,
      discountPercentage,
      tags,
      imageUrls,
      warrantyInformation,
    } = req.body;

    if (!Object.values(Category).includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const newProduct = new Product({
      title,
      description,
      category,
      quantity,
      price,
      discountPercentage,
      tags,
      imageUrls,
      warrantyInformation,
    });

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(errorStatus.internalServerError);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { category, tags, title, page = 1, limit = 10 } = req.query;

    const filter: any = {};

    if (category) {
      if (!Object.values(Category).includes(category as Category)) {
        return res.status(400).json({ error: "Invalid category" });
      }
      filter.category = category;
    }

    if (tags) {
      filter.tags = { $in: (tags as string).split(",") };
    }

    if (title) {
      filter.title = { $regex: new RegExp(title as string, "i") };
    }

    const options = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    };

    const products = await Product.find(filter)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / options.limit),
      currentPage: options.page,
    });
  } catch (error) {
    res.status(500).json(errorStatus.internalServerError);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(400).json(errorStatus.invalidRequestBody);
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json(errorStatus.productDoesNotExist);
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(errorStatus.internalServerError);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(400).json(errorStatus.invalidRequestBody);
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json(errorStatus.productDoesNotExist);
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(errorStatus.internalServerError);
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      quantity,
      price,
      discountPercentage,
      tags,
      warrantyInformation,
    } = req.body;

    if (category && !Object.values(Category).includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        quantity,
        price,
        discountPercentage,
        tags,
        warrantyInformation,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(errorStatus.internalServerError);
  }
};

// GET http://localhost:3000/products?title=iphone&page=2&limit=5
// GET http://localhost:3000/products?category=electronics&tags=smartphone,laptop

// export const getPendingSellerRequestController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const pendingRequests = await RequestService.getSellerPendingRequest();
//     res.status(200).json(pendingRequests ?? []);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(errorStatus.internalServerError);
//   }
// };
