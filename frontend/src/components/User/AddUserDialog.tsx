import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import FormHelper from '@/helpers/form.helper';
import ToastHelper from '@/helpers/toast.helper';
import { usersService } from '@/services/api/users/users.service';

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

interface AddUserDialogProps {
  clickDialog: () => void;
  open: boolean;
}
const AddUserDialog: React.FC<AddUserDialogProps> = ({ clickDialog, open }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('d');
  const [password, setPassword] = useState<string>('');

  const handleClose = () => {
    clickDialog();
  };

  const handleSubmit = async () => {
    if (FormHelper.isEmpty(name)) {
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
    }
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
          Add user
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              type="email"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
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

export default AddUserDialog;
