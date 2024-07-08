import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { Field, Form, Formik } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  CheckboxGroup,
  CircularProgress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import ProductService from "../../../service/product.service";

interface FormValues {
  name1: string;
  name2: string;
  category: string;
  quantity: number;
  price: number;
  discountPercentage: number;
  tags: string;
  warrantyInformation: string;
}

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  }

  function validateImage(value: string) {
    let error;
    if (url.length == 0) {
      error = "Required";
    }
    return error;
  }

  function validateQuantity(value: number) {
    let error;
    if (value <= 0) {
      error = "Quantity must be greater than 0";
    }
    return error;
  }

  function validatePrice(value: number) {
    let error;
    if (value <= 0) {
      error = "Price must be greater than 0";
    }
    return error;
  }

  function validateDiscount(value: number) {
    let error;
    if (value < 0 || value > 100) {
      error = "Discount must be between 0 and 100";
    }
    return error;
  }

  const [url, setUrl] = useState<Array<string>>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialValue, setInitialValue] = useState({
    title: "",
    description: "",
    category: "",
    quantity: 0,
    price: 0,
    discountPercentage: 0,
    tags: "",
    warrantyInformation: "",
    imageUrls: url,
  });

  const saveImage = async (image: File | null) => {
    if (image === null) {
      return console.log("Please Upload image");
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "dbyoondqs");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbyoondqs/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const cloudData = await res.json();
      console.log(cloudData.url);
      setUrl((url) => [...url, cloudData.url]);
      console.log(url);
    } catch (error) {
      // toast.error("Image upload failed");
      console.error(error);
    }
  };

  async function getProductDetails() {
    console.log(params.id);
    const id: string = params.id as string;
    const data = await ProductService.getProductById(id);

    if (!data) {
      setError(true);
      return;
    }
    setUrl(data.imageUrls);
    const { _id, isActive, createdAt, updatedAt, __v, ...rest } = data;
    rest.tags = rest.tags.join(", ");
    setInitialValue(rest);
    setLoading(false);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  function submitData(values: any) {}

  return (
    <AdminHeader>
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center mt-[40%]">
            <CircularProgress />
          </div>
        ) : (
          <Formik
            initialValues={initialValue}
            onSubmit={async (values, actions) => {
              let tags = values.tags.split(",");
              values = { ...values, imageUrls: url };
              setLoading(true);
              const res = await ProductService.updateProduct(
                params.id as string,
                {
                  ...values,
                  tags,
                }
              );
              actions.setSubmitting(false);
              if (!res) {
                console.log("Failed");
                return;
              }
              getProductDetails();
              console.log(url);
            }}
          >
            {(props) => (
              <Form>
                <Field name="title" validate={validateName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name1 && form.touched.name1}
                    >
                      <FormLabel>Product Name</FormLabel>
                      <Input {...field} placeholder="Product Name" />
                      <FormErrorMessage>{form.errors.name1}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description" validate={validateName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name2 && form.touched.name2}
                    >
                      <FormLabel className="mt-4">Description</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Description..."
                        rows={4}
                      />
                      <FormErrorMessage>{form.errors.name2}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <div className="flex gap-4">
                  <Field name="category" validate={validateName}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.category && form.touched.category
                        }
                      >
                        <FormLabel className="mt-4">Category</FormLabel>
                        <Select {...field} placeholder="Select category">
                          <option value="electronics">Electronics</option>
                          <option value="fashion">Fashion</option>
                          <option value="home">Home</option>
                          <option value="books">Books</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.category}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="quantity" validate={validateQuantity}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.quantity && form.touched.quantity
                        }
                      >
                        <FormLabel className="mt-4">
                          Available Quantity
                        </FormLabel>
                        <NumberInput
                          {...field}
                          value={field.value}
                          onChange={(valueString) =>
                            form.setFieldValue(
                              field.name,
                              parseInt(valueString)
                            )
                          }
                          step={1}
                          defaultValue={0}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>
                          {form.errors.quantity}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <Field name="price" validate={validatePrice}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.price && form.touched.price}
                    >
                      <FormLabel className="mt-4">Price</FormLabel>
                      <NumberInput
                        {...field}
                        value={field.value}
                        onChange={(valueString) =>
                          form.setFieldValue(
                            field.name,
                            parseFloat(valueString)
                          )
                        }
                        step={0.01}
                        defaultValue={0}
                        min={0}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="discountPercentage" validate={validateDiscount}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.discountPercentage &&
                        form.touched.discountPercentage
                      }
                    >
                      <FormLabel className="mt-4">
                        Discount Percentage
                      </FormLabel>
                      <NumberInput
                        {...field}
                        value={field.value}
                        onChange={(valueString) =>
                          form.setFieldValue(
                            field.name,
                            parseFloat(valueString)
                          )
                        }
                        step={1}
                        defaultValue={0}
                        min={0}
                        max={100}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>
                        {form.errors.discountPercentage}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="tags" validate={validateName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.tags && form.touched.tags}
                    >
                      <FormLabel className="mt-4">Tags</FormLabel>
                      <Input {...field} placeholder="Tags (comma separated)" />
                      <FormErrorMessage>{form.errors.tags}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="warrantyInformation" validate={validateName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.warrantyInformation &&
                        form.touched.warrantyInformation
                      }
                    >
                      <FormLabel className="mt-4">
                        Warranty Information
                      </FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Warranty Information..."
                        rows={4}
                      />
                      <FormErrorMessage>
                        {form.errors.warrantyInformation}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <div>
                  <Field name="image" validate={validateImage}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.image && form.touched.image}
                      >
                        <FormLabel className="mt-4 bg-[#319795] w-min p-2 px-4 rounded-md hover:bg-teal-700 opacity-10  text-white flex flex-row ">
                          <div className="flex gap-2">
                            <Upload /> Upload
                          </div>
                        </FormLabel>
                        <Input
                          // {...field}
                          // placeholder="Tags (comma separated)"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            saveImage(e.target.files ? e.target.files[0] : null)
                          }
                        />
                        <FormErrorMessage>{form.errors.tags}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </AdminHeader>
  );
};

export default UpdateProduct;
