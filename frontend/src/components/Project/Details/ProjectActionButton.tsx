import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Link from 'next/link';

const ProjectActionButton = () => {
  return (
    <>
      <Card elevation={2} className="mb-6">
        <CardHeader
          className="flex justify-between items-center border-b"
          titleTypographyProps={{ style: { fontSize: '16px' } }}
          title="Action buttons"
        />
        <CardContent>
          <div className="overflow-y-auto max-h-[300px]">
            <Link href={`/projects/64c56e59e841630716d50317/task-board`}>
              <Button variant="contained" sx={{ m: 1 }}>
                Task Board
              </Button>
            </Link>
            <Button variant="contained" sx={{ m: 1 }}>
              Gantt Chart
            </Button>
            <Button variant="contained" sx={{ m: 1 }}>
              Bug Report
            </Button>
            <Button variant="contained" sx={{ m: 1 }}>
              Tracker
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectActionButton;
