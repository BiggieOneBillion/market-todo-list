import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import InputContainer from "../../InputContainer";
import { FaProductHunt } from "react-icons/fa6";
import { PiMoney } from "react-icons/pi";
import { BsCart4 } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { userProp, userStore } from "../../../store/GlobalStore";
import api from "../../../api/ApiSettings";
import { useWindowSize } from "@reactuses/core";
import { useQueryClient } from "@tanstack/react-query";

interface formData {
  productName: string;
  price: number;
  quantity: number;
}

const marketItemSchema = z.object({
  productName: z.string().min(1, "Product name is required."),
  price: z.coerce.number().min(1, "Price must be a non-negative number."),
  quantity: z.coerce
    .number()
    .min(1, "Quantity must be a non-negative integer.")
    .default(1),
});

function AddMoreModal(props: { id: number }) {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<formData>({
    resolver: zodResolver(marketItemSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const token = userStore((state: unknown) => (state as userProp).token);

  const toast = useToast();

  const handleSaveList = async (values: object) => {
    setIsLoading(true);
    try {
      const response = await api.post(
        `/api/marketlist/${props.id}`,
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // stop the button spinner
        setIsLoading(false);
        // tell the user the operation was successful.
        toast({
          title: "Operation Successful",
          description: "List Saved",
          status: "success",
          duration: 2000,
          position: "top-right",
        });
        queryClient.invalidateQueries({ queryKey: ["all-user-marketlist"] });
      }
    } catch (error: any) {
      console.log(error);

      setIsLoading(false);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast({
          position: "top",
          status: "error",
          title: "Opeartion Failed",
          description: error?.response?.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        toast({
          position: "top",
          status: "error",
          title: "Opeartion Failed",
          description: "Network Error,  Please check your internet connection",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        toast({
          position: "top",
          status: "error",
          title: "Opeartion Failed",
          description: "Our Fault, Please try again later ",
        });
      }
    }
  };

  const onSubmit: SubmitHandler<formData> = (value) => {
    console.log(value);
    handleSaveList(value);
    reset();
  };

  const { width } = useWindowSize();

  return (
    <>
      <Button
        _focus={{ outline: "none", boxShadow: "none" }}
        size={"sm"}
        padding={"0px 30px"}
        type="button"
        leftIcon={<IoMdAdd />}
        bg="#7C8363" // Initial background color
        color="white" // Initial text color
        _hover={{
          bg: "#65694f", // Background color on hover
          color: "white", // Text color on hover
        }}
        onClick={onOpen}
      >
        Add
      </Button>

      <Modal size={width > 760 ? "xl" : "sm"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="flex items-center justify-center">
          <ModalHeader>Add More Items</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={"0px 50px"}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 w-[320px]  md:min-w-[320px] md:w-[500px] pb-10"
            >
              <VStack spacing={width > 760 ? 6 : 4} align={"stretch"}>
                {/* email */}
                <InputContainer
                  register={register}
                  type="text"
                  icon={<FaProductHunt />}
                  inputname="productName"
                  placeholder="What is the product name?"
                  error={errors.productName}
                />
                {/* name */}
                <InputContainer
                  register={register}
                  type="number"
                  icon={<PiMoney />}
                  inputname="price"
                  placeholder="What is the unit price in naira?"
                  error={errors.price}
                />

                {/* Password */}
                <InputContainer
                  register={register}
                  type="number"
                  icon={<BsCart4 />}
                  inputname="quantity"
                  placeholder="How many units did you buy?"
                  error={errors.quantity}
                />
              </VStack>
              <div className="flex justify-between items-center">
                <Button
                  type="submit"
                  size={width > 760 ? "lg" : "md"}
                  bgColor={"#7C8363"}
                  textColor={"white"}
                  padding={"0 40px"}
                  isLoading={isLoading}
                  loadingText="Processing"
                >
                  <span className="text-[15px]">Add To List</span>
                </Button>
                <Button onClick={onClose}>Close</Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddMoreModal;
