'use client';
import React, { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Global/Breadcrumb';
import Column from '@/components/Project/Details/TaskBoard/Column';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import { AddBox } from '@mui/icons-material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  const [taskAnchorEl, setTaskAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [tasks, setTasks] = useState<{ [key: string]: Task }>(initialTasks);
  const [columns, setColumns] = useState<{ [key: string]: Column }>(
    initialColumns
  );

  useEffect(() => {
    const newColumns = { ...columns };
    Object.values(initialTasks).forEach(task => {
      newColumns[task.stage].taskIds.push(task.id);
    });
    setColumns(newColumns);
  }, []);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    taskId: number
  ) => {
    setTaskAnchorEl(prevAnchorEl => ({
      ...prevAnchorEl,
      [taskId]: event.currentTarget,
    }));
  };

  const handleClose = (taskId: number) => {
    setTaskAnchorEl(prevAnchorEl => ({
      ...prevAnchorEl,
      [taskId]: null,
    }));
  };

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

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    // If the item is dropped in the same place, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Handling drag and drop logic
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      // Reordering in the same column
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, result.draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } else {
      // Moving from one column to another
      const startTaskIds = Array.from(start.taskIds);
      const finishTaskIds = Array.from(finish.taskIds);

      startTaskIds.splice(source.index, 1);
      finishTaskIds.splice(destination.index, 0, result.draggableId);

      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      setColumns({
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      });
    }
  };

  return (
    <>
      <Breadcrumb data={breadcrumbs} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container direction="row" columnSpacing={3}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Grid item md={3} key={columnId}>
                <Card elevation={2}>
                  <CardHeader
                    className="text-center border-b"
                    title={column.title}
                    titleTypographyProps={{ style: { fontSize: '16px' } }}
                  />
                  <CardContent>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="min-h-[220px]"
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
                                        className="mb-6"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <Card elevation={2}>
                                          <CardHeader
                                            className="flex justify-between items-center"
                                            title={
                                              <>
                                                <Button
                                                  disableElevation
                                                  color="primary"
                                                  size="small"
                                                  variant="contained"
                                                  sx={{
                                                    borderRadius:
                                                      '50px !important',
                                                    padding: '2px 20px',
                                                  }}
                                                >
                                                  High
                                                </Button>
                                              </>
                                            }
                                            titleTypographyProps={{
                                              style: { fontSize: '16px' },
                                            }}
                                            action={
                                              <>
                                                <IconButton
                                                  aria-controls={`task-board-menu-${index}`}
                                                  aria-haspopup="true"
                                                  aria-expanded={
                                                    Boolean(
                                                      taskAnchorEl[taskId]
                                                    )
                                                      ? 'true'
                                                      : undefined
                                                  }
                                                  onClick={event =>
                                                    handleMenuClick(
                                                      event,
                                                      task.id
                                                    )
                                                  }
                                                >
                                                  <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                  id={`task-board-menu-${index}`}
                                                  aria-labelledby={`task-board-menu-${index}`}
                                                  anchorEl={
                                                    taskAnchorEl[taskId]
                                                  }
                                                  open={Boolean(
                                                    taskAnchorEl[taskId]
                                                  )}
                                                  onClose={() =>
                                                    handleClose(taskId)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                  }}
                                                  transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                  }}
                                                >
                                                  <MenuItem>Edit</MenuItem>
                                                  <MenuItem>Delete</MenuItem>
                                                </Menu>
                                              </>
                                            }
                                          />
                                          <CardContent>
                                            {task && task.title}
                                          </CardContent>
                                        </Card>
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
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default TaskBoard;
