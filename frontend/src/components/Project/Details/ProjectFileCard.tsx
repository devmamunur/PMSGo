import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import {Delete, Download} from '@mui/icons-material';
import Card from '@mui/material/Card';
import {styled} from '@mui/material/styles';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ProjectFileCard = () => {
    return (
        <>
            <Card elevation={2}>
                <CardHeader
                    className="flex justify-between items-center border-b"
                    title="Files"
                    titleTypographyProps={{style: {fontSize: '16px'}}}
                />
                <CardContent>
                    <div className="text-center">
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </div>
                    <div className="file-list mt-4">
                        <div className="flex justify-between border-b mb-2 pb-2">
                            <div className="flex items-center">
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n`}
                                        src={`/static/images/avatar/1.jpg`}
                                    />
                                </ListItemAvatar>
                                <ListItemText id="1" primary={`Line item `} />
                            </div>
                            <div>
                                <Download/>
                                <Delete/>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n`}
                                        src={`/static/images/avatar/1.jpg`}
                                    />
                                </ListItemAvatar>
                                <ListItemText id="1" primary={`Line item `} />
                            </div>
                            <div>
                                <Download/>
                                <Delete/>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default ProjectFileCard;