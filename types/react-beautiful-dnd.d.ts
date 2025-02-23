declare module 'react-beautiful-dnd' {
  export type DropResult = {
    destination?: {
      index: number;
    };
    source: {
      index: number;
    };
  };

  export type DraggableProvided = any;
  export type DroppableProvided = any;
  
  export const DragDropContext: any;
  export const Droppable: any;
  export const Draggable: any;
} 