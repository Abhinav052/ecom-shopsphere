import Request, { SellerRequestDocument } from "../models/request.model";
import { RequestType } from "../utils/constants/user.constants";
class RequestService {
  //   static async getUserByEmail(
  //     email: string
  //   ): Promise<UserDocument | null | undefined> {
  //     return await User.findOne({ email: email });
  //   }

  static async getSellerPendingRequest(): Promise<
    Array<SellerRequestDocument | null | undefined>
  > {
    return await Request.find({
      requestType: RequestType.sellerRequest,
      isPending: true,
    });
  }

  static async getSellerResolvedRequest(): Promise<
    Array<SellerRequestDocument | null | undefined>
  > {
    return await Request.find({
      requestType: RequestType.sellerRequest,
      isPending: false,
    });
  }

  static async createSellerRequest(
    userId: string,
    sellerName: string,
    contact: string,
    requestType: string
  ) {
    const newRequest = new Request({
      userId: userId,
      sellerName: sellerName,
      contact: contact,
      requestType: requestType,
    });
    return await newRequest.save();
  }
}

export default RequestService;
