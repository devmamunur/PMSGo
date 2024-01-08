'use client';
import React, { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Global/Breadcrumb';
import Column from '@/components/Project/Details/TaskBoard/Column';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Interfaces.ts
export interface Task {
  userId: number;
  id: number;
  title: string;
  stage: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: number[];
}
const initialTasks: { [key: string]: Task } = {
  '1': { userId: 1, id: 1, title: 'delectus aut autem', stage: 'todo' },
  '2': {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    stage: 'inProgress',
  },
  '3': { userId: 1, id: 3, title: 'fugiat veniam minus', stage: 'review' },
  '4': { userId: 1, id: 4, title: 'et porro tempora', stage: 'done' },
  '5': {
    userId: 1,
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    stage: 'review',
  },
  '6': {
    userId: 1,
    id: 6,
    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
    stage: 'review',
  },
};
const initialColumns: { [key: string]: Column } = {
  todo: { id: 'todo', title: 'To Do', taskIds: [] },
  inProgress: { id: 'inProgress', title: 'In Progress', taskIds: [] },
  review: { id: 'review', title: 'Review', taskIds: [] },
  done: { id: 'done', title: 'Done', taskIds: [] },
};
const TaskBoard = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task }>(initialTasks);
  const [columns, setColumns] = useState<{ [key: string]: Column }>(
    initialColumns
  );

  useEffect(() => {
    const newColumns = { ...columns };
    Object.keys(initialTasks).forEach(taskKey => {
      const task = initialTasks[taskKey];
      newColumns[task.stage].taskIds.push(task.id);
    });
    setColumns(newColumns);
  }, []);

  let breadcrumbs = [
    {
      url: '/projects',
      label: 'Projects',
    },
    {
      url: '/projects/64c56e59e841630716d50317',
      label: 'Project Details',
    },
    {
      url: '',
      label: 'Task Board',
    },
  ];
  const onDragEnd = (result: any, _columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTasks = Array.from(sourceColumn.taskIds);
      const destTasks = Array.from(destColumn.taskIds);
      const [removedTaskId] = sourceTasks.splice(source.index, 1);

      destTasks.splice(destination.index, 0, removedTaskId);
      const newColumns = {
        ...columns,
        [source.droppableId]: { ...sourceColumn, taskIds: sourceTasks },
        [destination.droppableId]: { ...destColumn, taskIds: destTasks },
      };
      setColumns(newColumns);

      const updatedTasks = {
        ...tasks,
        [removedTaskId]: {
          ...tasks[removedTaskId],
          stage: destination.droppableId,
        },
      };
      setTasks(updatedTasks);
    } else {
      const column = columns[source.droppableId];
      const copiedTasks = Array.from(column.taskIds);
      const [removedTaskId] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removedTaskId);
      const newColumns = {
        ...columns,
        [source.droppableId]: { ...column, taskIds: copiedTasks },
      };
      setColumns(newColumns);
    }
  };

  return (
    <>
      <Breadcrumb data={breadcrumbs} />
      <h1>TaskBoard</h1>
      <div>
        <div
          style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
        >
          <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div key={columnId} style={{ margin: '0 8px' }}>
                  <h2>{column.title}</h2>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightblue'
                              : 'lightgrey',
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.taskIds.map((taskId, index) => {
                            const task = tasks[taskId];
                            return (
                              <Draggable
                                key={taskId}
                                draggableId={taskId.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#263B4A'
                                          : '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {task && task.title}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default TaskBoard;
