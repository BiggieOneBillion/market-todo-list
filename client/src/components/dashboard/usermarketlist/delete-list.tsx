import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userProp, userStore } from "../../../store/GlobalStore";
import { TbTrash } from "react-icons/tb";
import api from "../../../api/ApiSettings";
import { useWindowSize } from "@reactuses/core";

type Props = {
  id: number;
};

const DeleteList: React.FC<Props> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const queryClient = useQueryClient();

  const token = userStore((state) => (state as userProp).token);

  // Function to delete a user by ID
  const deleteUser = async () => {
    return await api.delete(`/api/marketlist/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Define the mutation
  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      console.log(data);

      // show success toast
      toast({
        position: "top",
        title: "Event deleted successfully",
        description: "Deleted",
        status: "success",
        duration: 2000,
      });
      // Invalidate and refetch the 'users' query after a successful delete
      queryClient.invalidateQueries({ queryKey: ["all-user-marketlist"] });
      //  close modal
      onClose();
      //  navigate one step backwards
      //   navigate(-1);
    },
    onError: () => {
      //(error);
      // show error toast
      toast({
        position: "top",
        title: "Operation Unsuccessful",
        description: "Try Again",
        status: "error",
        duration: 2000,
      });
    },
  });

  const handleDelete = () => {
    // Call the mutate function to trigger the deletion
    mutate();
  };

  const { width } = useWindowSize();

  return (
    <>
    <Button
        _focus={{ outline: "none", boxShadow: "none" }}
        size={"sm"}
        padding={"0px 30px"}
        type="button"
        leftIcon={<TbTrash />}
        bg="#7C8363" // Initial background color
        color="white" // Initial text color
        _hover={{
          bg: "#65694f", // Background color on hover
          color: "white", // Text color on hover
        }}
        onClick={onOpen}
      >
        Delete 
      </Button>
      {/* <span onClick={onOpen} className="text-lg cursor-pointer">
        <TbTrash />
      </span> */}

      <Modal size={width > 760 ? "xl" : 'xs'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay border={"1px solid red"} />
        <ModalContent border={"1px solid red"}>
          {/* <ModalHeader>Delete Event</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <section className="pt-10 ">
              <h2 className="md:text-lg font-medium text-black/90 text-center md:text-left">
                Are you sure you want to delete this List?
              </h2>
            </section>
          </ModalBody>

          <ModalFooter>
            <Button size={'md'} colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              isLoading={isPending}
              loadingText={"Deleting..."}
              onClick={handleDelete}
            >
              Delete List
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteList;
