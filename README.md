## Framework and Libraries used

- Next.js
- Recoil.js for state management
- Chakra UI as primary UI Framework
- react-icons

### what you manage to build

- built Kanban board with basic functionalities as [requirements in README](https://github.com/terra-money/screening-test-frontend) required
- add data persistence with LocalStorage
- add basic form validation for name field on building new card, column
- enhance user experience with effect on hovering card or column, responsive view, small 404 page

### what features are missing

- make it able to drag-and-drog on mobile

### what features you want to add

- support multiple boards
- try out virtualized list on column, board
- snapshot history of the board and card (see when it was being created, moved, arhived) 

### what things you think you might have done better given more time

- enhance drag-and-drog to be more smooth and have some experience more like Trello (maybe I should have used third-party libraries like `react-beautiful-dnd`)
- a better structure for cards and columns, I think this structure is good for single board and quick to implement but not really sure if it was applied for multiple board
- for more complicated model of cards and columns, I would use `react-form-hook` or `formik` as primary structure for more complicate data
