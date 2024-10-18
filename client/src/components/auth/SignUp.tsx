import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormHelperText,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { LiaIndustrySolid } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiUser } from "react-icons/pi";
import { SubmitHandler, useForm } from "react-hook-form";
import InputContainer from "./InputContainer";
import api from "../../api/ApiSettings";
import { signupSchema } from "../../validations/authvalidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {useWindowSize} from "@reactuses/core"

interface Props {
  handleSignIn: () => void;
}

interface formData {
  email: string;
  name: string;
  password: string;
  // company: string;
  // username: string;
  confirmPassword: string;
}

const SignUp: React.FC<Props> = ({ handleSignIn }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(signupSchema),
  });

  const { width } = useWindowSize();

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onSubmit: SubmitHandler<formData> = async (value) => {
    const { confirmPassword, ...others } = value;

    //(others);

    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/register", others);
      if (response.status === 201) {
        toast({
          position: "top-right",
          status: "success",
          title: "Operation Successful",
          description: "Account Created Successfully",
          duration: 1500,
        });
        setIsLoading(false);
        setTimeout(() => {
          handleSignIn();
        }, 1500);
      }
    } catch (error: any) {
      // //(error?.response?.data.message);
      // toast({
      //   position: "top",
      //   status: "error",
      //   title: "Operation Failed",
      //   description: error?.response?.data.message || "Something went wrong, Try again",
      //   duration: 4000,
      // });
      // setIsLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast({
          position: "top",
          status: "error",
          title: "Sign-In Failed",
          description: error?.response?.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        toast({
          position: "top",
          status: "error",
          title: "Sign-In Failed",
          description: "Network Error,  Please check your internet connection",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        toast({
          position: "top",
          status: "error",
          title: "Sign-In Failed",
          description: "Our Fault, Please try again later ",
        });
      }
      //(error);
      setIsLoading(false);
    }
  };

  return (
    <section className="border text-[#31473A] rounded-md py-10 mx-2 px-4 md:px-12 max-w-[700px] bg-white/50 w-[500px] min-w-[350px] space-y-5 md:space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-medium">Register</h1>
        <p className="text-sm text-black/60">
          Already have an account?{" "}
          <button onClick={handleSignIn} className="underline">
            Sign In
          </button>
        </p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <VStack spacing={width > 760 ? 6 : 3} align={"stretch"}>
          {/* email */}
          <InputContainer
            register={register}
            type="email"
            icon={<HiOutlineMail />}
            inputname="email"
            placeholder="Enter your email"
            error={errors.email}
          />
          {/* name */}
          <InputContainer
            register={register}
            type="text"
            icon={<PiUser />}
            inputname="name"
            placeholder="Enter your name"
            error={errors.name}
          />

          {/* Password */}
          <FormControl>
            <InputContainer
              register={register}
              type="password"
              icon={<RiLockPasswordLine />}
              inputname="password"
              placeholder="Enter your password"
              error={errors.password}
            />
            <FormHelperText fontSize={'12px'}>
              Password should contain atleast 6 characters
            </FormHelperText>
          </FormControl>
          {/* Confirm Password */}
          <InputContainer
            register={register}
            type="password"
            icon={<RiLockPasswordLine />}
            inputname="confirmPassword"
            placeholder="Confirm your password"
            error={errors.confirmPassword}
          />
        </VStack>
        <div className="flex justify-end">
          <Button
            type="submit"
            size={"lg"}
            bgColor={"#7C8363"}
            textColor={"white"}
            padding={"0 40px"}
            isLoading={isLoading}
            loadingText="Processing"
          >
            <span className="text-[15px]">Sign Up</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
