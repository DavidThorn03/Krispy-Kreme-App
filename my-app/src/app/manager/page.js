'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Link from 'next/link'

export default function Manager() {
    const [data, setData] = useState()
    useEffect(() => {
        fetch('https://rich-web-assignment.vercel.app/api/getOrders')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])
    if (!data) return <p>Loading</p>
    
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Krispy Kreme
            </Typography>
            <Link href="/products" style={{padding: 10}}>Manager</Link>
            <Link href="/" style={{padding: 10}}>Login</Link>
          </Toolbar>
        </AppBar>
            <Container component="main">
                <div style={{fontSize: '40px', textAlign: 'center'}} > Orders</div>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    colummWidth: '50%',
                    gap: 2,
                    center: 'true'
                }}>
                    {
                        data.map((item, i) => (
                            <Box sx={{
                                border: 1,
                                padding: 1,
                                margin: 1,
                                borderRadius: 1,
                                backgroundColor: 'primary.main',
                                color: 'white',
                              }} key={i}>
                                User: {item.user}
                                <br></br>
                                <br></br>
                                Products: 
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {item.products.map((product, i) => (
                                        <div key={i}>
                                            {product}
                                        </div>
                                    ))}
                                </div>
                                <br></br>
                                Date/Time: {item.dateTime}
                            </Box>
                        ))
                    }
                </Box>
            </Container>
        </Box>
    );
}