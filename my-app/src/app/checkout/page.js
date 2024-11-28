'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Link from 'next/link'
import {useState, useEffect} from 'react';
import { WindowOutlined } from '@mui/icons-material';

export default function Checkout() {
    const [user, setUser] = useState(null)
    const [data, setData] = useState()
  useEffect(() => {
    fetch(`https://rich-web-assignment.vercel.app/api/getData`)
        .then((res) => res.json())
        .then((user) => {
            setUser(user)
        })
}, [])
useEffect(() => {
  if (user) {
      fetch(`https://rich-web-assignment.vercel.app/api/email?user=${user.email}`);
  }
}, [user]);
    return(
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
            <Link href="/products" style={{padding: 10}}>Products</Link>
            <Link href="/cart" style={{padding: 10}}>Cart</Link>
            <Link href="/" style={{padding: 10}}>Login</Link>
          </Toolbar>
        </AppBar>
        <Box  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
            <div style={{fontSize: 50 , textAlign: 'center'}}>Thank you for your order!!</div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Button
        	sx={{backgroundColor: 'primary.main', color: 'white', fontSize: 20, padding: 2}}><Link href="/products">Return to products</Link></Button>
        </Box>
    </Box>
    )
}