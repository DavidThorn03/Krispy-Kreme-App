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


export default function Cart() {
    const [user, setUser] = useState(null)
    const [data, setData] = useState()
    useEffect(() => {
        fetch(`http://localhost:3000/api/getData`)
            .then((res) => res.json())
            .then((user) => {
                setUser(user)
            })
    }, [])
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/api/getCart?user=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                });
        }
    }, [user]);
    if (!data) return <p>Loading</p>
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += Number(data[i].price);
    }
    const handleSubmit = () => {
        console.log("handling submit");
        const products = data.map((item) => item.product)
        runDBCallAsync(`http://localhost:3000/api/placeOrder?user=${user.email}&products=${JSON.stringify(products)}&dateTime=${new Date().toISOString()}`)
        runDBCallAsync(`http://localhost:3000/api/removeCart?user=${user.email}`)
    };
    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res;
        if(data.data == "valid"){
            console.log("login is valid!")
        } else {
            console.log("not valid ")
        }
    }
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
            <Link href="/products">Products</Link> - 
            <Link href="/cart">Cart</Link> -
            <Link href="/">Login</Link>
          </Toolbar>
        </AppBar>
            <Container component="main" maxWidth="xs">
                <div style={{fontSize: '40px'}} > Cart </div>
                {data.length === 0 ? (
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 3 }}>
                        Cart is empty
                    </Typography>
                ) : (
            <Box>
                    {data.map((item, i) => (
                    <div style={{ padding: "20px" }} key={i}>
                        {item.product}
                        <br />
                        Price: {item.price}
                    </div>
                ))}
                Order Total: {total}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >
                Complete Order
                </Button>
            </Box>
          )}
            </Container>
        </Box>
    );
}