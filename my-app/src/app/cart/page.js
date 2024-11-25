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
        fetch(`https://rich-web-assignment.vercel.app/api/getData`)
            .then((res) => res.json())
            .then((user) => {
                setUser(user)
            })
    }, [])
    useEffect(() => {
        if (user) {
            fetch(`https://rich-web-assignment.vercel.app/api/getCart?user=${user.email}`)
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
        runDBCallAsync(`https://rich-web-assignment.vercel.app/api/placeOrder?user=${user.email}&products=${JSON.stringify(products)}&dateTime=${new Date().toISOString()}`)
        runDBCallAsync(`https://rich-web-assignment.vercel.app/api/removeCart?user=${user.email}`)
        window.location="/products"
    };
    const removeCartItem = (id) => {
        console.log("ID is: " + id)
        runDBCallAsync(`https://rich-web-assignment.vercel.app/api/removeCartItem?_id=${_id}`)
    }; 
    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res;
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
            <Link href="/products" style={{padding: 10}}>Products</Link>
            <Link href="/cart" style={{padding: 10}}>Cart</Link>
            <Link href="/" style={{padding: 10}}>Login</Link>
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
                    {
                        data.map((item, i) => (
                            <Box sx={{
                                border: 1,
                                padding: 1,
                                margin: 1,
                                borderRadius: 1,
                                backgroundColor: 'primary.main',
                                color: 'white', 
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 2,
                              }} key={i}>
                                <Box>
                                {item.product}
                                <br></br>
                                <br></br>
                                Price: €
                                {parseInt(item.price).toFixed(2)}
                                <br></br>
                                </Box>
                                <Box>
                                <Button variant="outlined" sx={{backgroundColor: 'blue', color: 'white', margin: 1, alignSelf: 'center'}} onClick={() => removeCartItem(item._id)}> Remove Item </Button>
                                </Box>
                            </Box>
                        ))
                    }
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