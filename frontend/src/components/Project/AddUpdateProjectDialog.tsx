import React, { ChangeEvent, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
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
import Grid from '@mui/material/Grid';
import AddProjectCard from '@/components/Project/AddProjectCard';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store/store';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { Theme, useTheme } from '@mui/material/styles';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
        personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
  };
}


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
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [users, setUsers] = useState<any>([]);
  const [status, setStatus] = useState<string>('');
  const [budget, setBudget] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [start_date, setStart_date] = useState<Dayjs | null>(null);
  const [end_date, setEnd_date] = useState<Dayjs | null>(null);


  useEffect(() => {
    usersService.get().then(res => {});
  }, []);

  const userslist = useSelector((state: RootState) => state.users.value);

  const handleChange = (event: SelectChangeEvent<typeof users>) => {
    const {target: { value, }} = event;
    setUsers(typeof value === 'string' ? value.split(',') : value,);
  };

  console.log(users, " user array")

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
        maxWidth="md"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {project ? 'Edit Project' : 'Add Project'}
        </BootstrapDialogTitle>
        <DialogContent dividers>
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
              <Grid item md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        label="Start Date"
                        value={start_date}
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        sx={{ width : '100%' }}
                        onChange={(newValue) => setStart_date(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        label="End Date"
                        value={end_date}
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        sx={{ width : '100%' }}
                        onChange={(newValue) => setEnd_date(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item md={6}>
                <TextField
                    fullWidth
                    label="Status"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setStatus(event.target.value)
                    }
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                    fullWidth
                    label="Budget"
                    type='number'
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setBudget(parseFloat(event.target.value))
                    }
                />
              </Grid>
              <Grid item md={12}>
                <FormControl sx={{  width: '100%' }}>
                  <InputLabel id="demo-multiple-chip-label">Users</InputLabel>
                  <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={users}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                              const user = userslist.find((user) => user._id === value);
                              return <Chip key={value} label={user.name ?? item.email} />;
                            })}
                          </Box>
                      )}
                      MenuProps={MenuProps}
                  >
                    {userslist.map((item) => (
                        <MenuItem
                            key={item.name ?? item.email}
                            value={item._id}
                            style={getStyles(item, users, theme)}
                        >
                          {item.name ?? item.email}
                        </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
