import  React, {ReactNode, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AppBarComponent from "@/components/MasterLayout/AppBar";
import DrawerComponent from "@/components/MasterLayout/Drawer";


interface MasterLayoutProps {
    children: ReactNode;
}
const MasterLayout : React.FC<MasterLayoutProps> = (props) => {
    const [open, setOpen] = useState(true);

    const clickDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBarComponent clickDrawer={clickDrawer} open={open}/>
                <DrawerComponent clickDrawer={clickDrawer} open={open}/>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                        {props.children}
                    </Container>
                </Box>
            </Box>
        </>
    );
}

export default MasterLayout;