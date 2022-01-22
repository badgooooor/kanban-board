import { useRecoilValue } from "recoil";

import { orderedColumns } from "../../stores/columns";

const useColumns = () => {
  const columns = useRecoilValue(orderedColumns);

  return { columns };
};

export default useColumns;
