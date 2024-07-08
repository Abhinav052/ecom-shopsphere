import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { closeAuthModal } from "../../../redux/features/home/home.slice";
import { User } from "../../../models/user.model";
import UserService from "../../../service/user.service";
import { login } from "../../../redux/features/auth/auth.slice";

interface SignInForm {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = React.useState<SignInForm>({
    email: "",
    password: "",
  });

  // const handleEmailChange = (event : React.FormEvent<HTMLFormElement>) => setFormData((prev) => { return {...prev,"password":event.target.value}})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const isOpen: boolean = useSelector(
    (state: RootState) => state.home.isModalOpen
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(closeAuthModal());
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    const user: User = await UserService.login(
      formData.email,
      formData.password
    );
    console.log("signed in");
    console.log(user);
    dispatch(login(user));
    // const email = initialRef.current?.value;
    // const password = passwordRef.current?.value;
    // console.log("Email:", email);
    // console.log("Password:", password);

    // Here you can dispatch a login action with the email and password
    // dispatch(login({ email, password }));

    // Close the modal
    onClose();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome Back!!</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  ref={initialRef}
                  id="email"
                  placeholder="Email"
                  type={"email"}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignIn;
