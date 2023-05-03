import { styled } from '@mui/material/styles';
import {NavLink} from "react-router-dom";

export const StyledNavLink = styled(NavLink)({
    color: '#337f83',
    '&.active' : {
        color: '337f83',
        backgroundColor: '#b4e8ec',
    },
    '&:hover' : {
        color: '337f83',
        backgroundColor: '#b4e8ec !important',
    }
});