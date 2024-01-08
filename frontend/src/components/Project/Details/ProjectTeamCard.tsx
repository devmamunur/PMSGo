import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { AddBox, Delete, Lock } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Card from '@mui/material/Card';

const ProjectTeamCard = () => {
  return (
    <>
      <Card elevation={2}>
        <CardHeader
          className="flex justify-between items-center border-b"
          title="Team Members (5)"
          titleTypographyProps={{ style: { fontSize: '16px' } }}
          action={
            <IconButton aria-label="settings">
              <AddBox />
            </IconButton>
          }
        />
        <CardContent>
          <div className="overflow-y-auto max-h-[300px]">
            {Array.from({ length: 7 }, (_, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2 mb-2"
              >
                <div className="">
                  <div className="flex items-center px-2">
                    <a href="#" className=" text-start">
                      <Image
                        className="fix_img"
                        width={50}
                        height={50}
                        src="https://demo.rajodiya.com/taskly/storage/avatars/6329b3605f267.png"
                        alt="kkl"
                      />
                    </a>
                    <div className="px-2">
                      <h5 className="m-0">Alex</h5>
                      <small className="text-muted">
                        alex@example.com
                        <span className="text-primary "> - 2/14</span>
                      </small>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Lock />
                  <Delete />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectTeamCard;
