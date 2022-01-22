import { Badge } from "@chakra-ui/react";

type Props = {
  status: "open" | "closed";
};

const StatusBadge = ({ status }: Props) => {
  if (status === "open") {
    return <Badge colorScheme="green">Open</Badge>;
  } else if (status === "closed") {
    return <Badge colorScheme="red">Closed</Badge>;
  } else {
    return null;
  }
};

export default StatusBadge;
