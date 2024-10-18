import { MdOutlineMoreVert } from "react-icons/md";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import AddMoreModal from "./addmore-marketitem";
import DeleteList from "./delete-list";
import { useWindowSize } from "@reactuses/core";

type Props = {
  id: number;
};

const MorePopOverMenu = ({ id }: Props) => {
  const { width } = useWindowSize();
  return (
    <Popover size={"sm"}>
      <PopoverTrigger>
        {width > 768 ? (
          <span className="hidden md:inline">
            <MdOutlineMoreVert />
          </span>
        ) : (
          <Button
            size={"sm"}
            border={"1px solid black"}
            className="flex items-center gap-2 rounded-md py-1 px-3 md:hidden"
          >
            <span className="text-sm ">More</span>
            <span>
              <MdOutlineMoreVert />
            </span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        _focus={{ boxShadow: "none", outline: "none" }}
        width={"fit"}
      >
        <PopoverArrow />
        {/* <PopoverCloseButton /> */}
        {/* <PopoverHeader fontSize={'12px'}>Actions</PopoverHeader> */}
        <PopoverBody padding={"10px"}>
          <div className="flex flex-col gap-2 p-1">
            <AddMoreModal id={id} />
            <DeleteList id={id} />
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MorePopOverMenu;

{
  /* <Button
            size={"sm"}
            border={"1px solid black"}
            className="flex items-center gap-2 rounded-md py-1 px-3 md:hidden"
          >
            <span className="text-sm ">More</span>
            <span>
              <MdOutlineMoreVert />
            </span>
          </Button> */
}
