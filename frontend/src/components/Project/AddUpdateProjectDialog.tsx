import React, { ChangeEvent, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, TextField } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { Save } from '@mui/icons-material';
import FormHelper from '@/helpers/form.helper';
import ToastHelper from '@/helpers/toast.helper';
import {usersService} from '@/services/api/users/users.service';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import {DateTimePicker} from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import AddProjectCard from '@/components/Project/AddProjectCard';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface AddProjectDialogProps {
  clickDialog: () => void;
  open: boolean;
  project : any;
}
const AddUpdateProjectDialog: React.FC<AddProjectDialogProps> = ({ clickDialog, open, project }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setCompany] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [users, setUsers] = useState<any>([]);
  const [status, setStatus] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [start_date, setStart_date] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [end_date, setEnd_date] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {

  }, []);
  const handleClose = () => {
    clickDialog();
  };

  const handleSubmit = async () => {
/*    if (FormHelper.isEmpty(name)) {
      ToastHelper.errorToast('Name required!');
    } else if (FormHelper.isEmail(email)) {
      ToastHelper.errorToast('Valid email address required!');
    } else if (FormHelper.isEmpty(password)) {
      ToastHelper.errorToast('Password required!');
    } else {
      setLoading(true);
      await usersService
        .create({ name, email, password })
        .then((res: boolean) => {
          if (res) {
            handleClose();
          }
          setLoading(false);
        });
    }*/
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {project ? 'Edit Project' : 'Add Project'}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <pre>
            name : {name} <br/>
            start_date : {start_date}
          </pre>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid
                container
                direction="row"
                spacing={2}
            >
              <Grid item md={12}>
                <TextField
                    fullWidth
                    label="Name"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setName(event.target.value)
                    }
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                    fullWidth
                    label="Status"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setStatus(event.target.value)
                    }
                />
              </Grid>
              <Grid item md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker
                        label="Start Date"
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        value={start_date}
                        sx={{ width : '100%' }}
                        onChange={(newValue) => setStart_date(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker
                        label="End Date"
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        onChange={(newValue) => setEnd_date(newValue)}
                        sx={{ width : '100%' }}

                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item md={12}>
                <TextField
                    fullWidth
                    label="Users"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setUsers(event.target.value)
                    }
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                    multiline
                    maxRows={4}
                    fullWidth
                    label="Description"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setDescription(event.target.value)
                    }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingTop: '14px', paddingBottom: '14px' }}>
          <Button onClick={handleClose}>Close</Button>
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={loading}
            endIcon={<Save />}
            loadingPosition="end"
          >
            <span>Save</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddUpdateProjectDialog;
