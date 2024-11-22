'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { useState, useEffect } from 'react';

export default function Manager() {
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
        fetch(`http://localhost:3000/api/getCart?user=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])
    if (!data) return <p>Loading</p>
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += data[i].price;
    }
    const theme = createTheme({
        palette: {
            secondary: {
                main: green[500],
            },
        },
    });
    const handleSubmit = () => {
        console.log("handling submit");
        const products = data.map((item) => item.product)
        const user = "Dave"; // get user from session
        runDBCallAsync(`http://localhost:3000/api/placeOrder?user=${user.email}&products=${JSON.stringify(products)}&dateTime=${new Date().toISOString()}`)
        runDBCallAsync(`http://localhost:3000/api/removeCart?user=${user.email}`)
    }; // end handle submit
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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <div style={{fontSize: '40px'}} > Cart </div>
                <div>
                    {
                        data.map((item, i) => (
                            <div style={{padding: '20px'}} key={i}>
                                {item.user}
                                <br></br>
                                {item.product}
                            </div>
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
                </div>
            </Container>
        </ThemeProvider>
    );
}