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
        fetch('http://localhost:3000/api/getOrders')
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
            <Link href="/products">Manager</Link> - 
            <Link href="/">Login</Link>
          </Toolbar>
        </AppBar>
            <Container component="main" maxWidth="xs">
                <div style={{fontSize: '40px'}} > Orders</div>
                <div>
                    {
                        data.map((item, i) => (
                            <div style={{padding: '20px'}} key={i}>
                                {item.user}
                                <br></br>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {item.products.map((product, i) => (
                                        <div key={i}>
                                            {product}
                                        </div>
                                    ))}
                                </div>
                                <br></br>
                                {item.dateTime}
                            </div>
                        ))
                    }
                </div>
            </Container>
        </Box>
    );
}