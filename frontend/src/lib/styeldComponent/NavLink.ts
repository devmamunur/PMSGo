import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const StyledNavLink = styled(Link)({
  color: '#337f83',
  '&.active': {
    color: '337f83',
    backgroundColor: '#b4e8ec',
  },
  '&:hover': {
    color: '337f83',
    backgroundColor: '#b4e8ec !important',
  },
});
