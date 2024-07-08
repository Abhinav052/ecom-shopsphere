import { Request, Response } from "express";
import errorStatus from "../utils/error/error.status";
import UserService from "../services/user.service";
import RequestService from "../services/request.service";
import { RequestType } from "../utils/constants/user.constants";
import { SellerRequestDocument } from "../models/request.model";

interface SellerRequestBody {
  userId: string;
  sellerName?: string;
  contact?: string;
}

export const sellerRequestController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData: SellerRequestBody = req.body;

    if (!userData.sellerName || !userData.contact) {
      res.status(400).send(errorStatus.invalidRequestBody);
      return;
    }

    const newReq = await RequestService.createSellerRequest(
      userData.userId,
      userData.sellerName,
      userData.sellerName,
      RequestType.sellerRequest
    );

    res
      .status(200)
      .json({ message: "Request Sent Successfully", request: newReq });
  } catch (error) {
    console.log(error);
    res.status(500).json(errorStatus.internalServerError);
  }
};

export const getPendingSellerRequestController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pendingRequests = await RequestService.getSellerPendingRequest();
    res.status(200).json(pendingRequests ?? []);
  } catch (error) {
    console.log(error);
    res.status(500).json(errorStatus.internalServerError);
  }
};

export const getResolvedSellerRequestController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pendingRequests = await RequestService.getSellerResolvedRequest();
    res.status(200).json(pendingRequests ?? []);
  } catch (error) {
    console.log(error);
    res.status(500).json(errorStatus.internalServerError);
  }
};
