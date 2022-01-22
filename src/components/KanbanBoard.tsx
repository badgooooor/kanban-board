import { Flex, Box, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

const groups = ["To Do", "In Progress", "Done"];

const initialItems = [
  { id: "1adfsdff", group: "To Do", value: "Task A" },
  { id: "2asdfasd", group: "To Do", value: "Task B" },
  { id: "3sdafsdf", group: "To Do", value: "Task C" },
];

const KanbanBoard = () => {
  const [items, setItems] = useState(initialItems);
  const dragData = useRef<any>({});
  const dragOverItem = useRef<any>({});
  const dragOverGroup = useRef<any>({});

  const handleDragStart = (e: any, id: any, group: string) => {
    dragData.current = { id: id, initialGroup: group };
  };

  const handleDragEnterGroup = (e: any, group: string) => {
    dragOverGroup.current = group;
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDragOverItem = (e: any, item: any) => {
    dragOverItem.current = item;
  };

  const changeCategory = (targetItem: any, group: string) => {
    const targetItemIndex = items.findIndex(
      (item) => item.id === dragOverItem.current.id
    );
    const newItems = [...items].filter((item) => item.id !== targetItem.id);
    const newItem = targetItem;

    newItem.group = group;

    newItems.splice(targetItemIndex, 0, newItem);
    setItems([...newItems]);
  };

  const handleDrop = (e: any) => {
    const selected = dragData.current.id;
    changeCategory(selected, dragOverGroup.current);
  };

  return (
    <>
      <Flex m={1} p={1} wrap="wrap">
        {groups.map((group, idx) => (
          <Box
            margin={1}
            padding={2}
            bgColor="gray.200"
            width={`300px`}
            minHeight={`500px`}
            key={`group-${idx}`}
            onDragEnter={(e) => handleDragEnterGroup(e, group)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e)}
          >
            <Text fontSize="xl" mb={1}>
              {group}
            </Text>
            <div>
              {items
                .filter((item) => item.group === group)
                .map((item) => (
                  <Box
                    bgColor={`whiteAlpha.300`}
                    minHeight={`70px`}
                    mb={1}
                    p={2}
                    key={`item-${item.id}`}
                    id={`item-${idx}-${item.id}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, group)}
                    onDragOver={(e) => handleDragOverItem(e, item)}
                  >
                    {item.value}
                  </Box>
                ))}
            </div>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default KanbanBoard;
