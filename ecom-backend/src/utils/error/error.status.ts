const invalidRequestBody = {
  message: "Invalid Request",
};

const userAlreadyExist = {
  message: "User Already Exist",
};

const userDoesNotExist = {
  message: "User Does Not Exist",
};

const internalServerError = {
  message: "Internal Server Error",
};

const invalidUserDetails = {
  message: "Invalid Username or Password",
};

const customMessage = (message: string) => {
  return { message: message };
};

const productDoesNotExist = {
  message: "Product Does Not Exist",
};
export default {
  internalServerError,
  invalidRequestBody,
  userAlreadyExist,
  userDoesNotExist,
  invalidUserDetails,
  customMessage,
  productDoesNotExist,
};
