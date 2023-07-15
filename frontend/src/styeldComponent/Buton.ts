import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.blue.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: 'black',
  },
}));
