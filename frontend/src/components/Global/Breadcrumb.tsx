import React from 'react';
import Grid from '@mui/material/Grid';
import {Breadcrumbs, Link} from '@mui/material';
import {Home} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import {BreadcrumbData} from '@/interfaces/global/global';

const Breadcrumb = ({data} : BreadcrumbData) => {
    if(data && data.length > 0){
        let pageName = data[data.length - 1]?.label;
        return (
            <>
                <Grid container direction="row">
                    <Grid item md={12}>
                        <h4 className="font-bold text-xl">
                            {pageName}
                        </h4>
                    </Grid>
                    <Grid item md={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                href="/"
                            >
                                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                                Home
                            </Link>
                            {
                                data.map((item, i) => (
                                    item.url ? (
                                        <Link
                                            key={i}
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                            color="inherit"
                                            href={item.url}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <Typography
                                            key={i}
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                            color="text.primary"
                                        >
                                            {item.label}
                                        </Typography>
                                    )
                                ))
                            }
                        </Breadcrumbs>
                    </Grid>
                </Grid>
            </>
        );
    }else {
        return (
            <Grid container direction="row">
                <Grid item md={12}>
                    <h4 className="font-bold text-xl">
                        Not Found
                    </h4>
                </Grid>
                <Grid item md={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            href="/"
                        >
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            Home
                        </Link>
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="text.primary"
                        >
                            Not Found
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
        )
    }
};

export default Breadcrumb;