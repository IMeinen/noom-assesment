import { Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { changeState } from "app/store/sleepInfoCardSlice";

function NoInfoStateContainer() {
  const dispatch = useDispatch();

  return (
    <>
      <Text marginBottom="20px" color="#555" fontSize="16px">
        No sleep information
      </Text>
      <Button
        _hover={{ bg: "#bbb" }}
        width="50px"
        height="50px"
        backgroundColor="#ddd"
        border="none"
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onClick={() => dispatch(changeState(3))}
      >
        <AddIcon color="white" w={8} h={8} />
      </Button>
    </>
  );
}

export default NoInfoStateContainer;
