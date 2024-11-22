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
    const [data, setData] = useState()
    const [weather, setWeatherData] = useState(null)
    const [user, setUser] = useState(null)
    useEffect(() => {
        fetch('http://localhost:3000/api/getWeather')
            .then((res) => res.json())
            .then((weather) => {
                setWeatherData(weather)
            })
        fetch('http://localhost:3000/api/getProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
        fetch('http://localhost:3000/api/getData')
            .then((res) => res.json())
            .then((user) => {
                setUser(user)
            })
    }, [])
    if (!data) return <p>Loading</p>
    const theme = createTheme({
        palette: {
            secondary: {
                main: green[500],
            },
        },
    });
    if (!weather) return <p>No weather</p>
    const addToCart = (product, price) => {
        console.log("Email is: " + user.email)
        console.log("Product is: " + product)
        console.log("Price is: " + price)
        runDBCallAsync(`http://localhost:3000/api/addToCart?user=${user.email}&product=${product}&price=${price}`)
    }; // end handle submit
    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res;
        if(data.data == "valid"){
            console.log("Added to cart")
        } else {
            console.log("not valid")
        }
    }
    return (
        <ThemeProvider theme={theme}>
            Today's temperature: {JSON.stringify(weather.temp)}°C
            <Container component="main" maxWidth="xs">
                <div style={{fontSize: '40px'}} > Products</div>
                <div>
                    {
                        data.map((item, i) => (
                            <div style={{padding: '20px'}} key={i}>
                                {item.title}
                                <br></br>
                                <br></br>
                                Description:
                                <br></br>
                                {item.description}
                                <br></br>
                                <br></br>
                                Price: €
                                {item.price}
                                <br></br>
                                {item.image}
                                <br></br>
                                <Button variant="outlined" onClick={addToCart(item.title, item.price)}> Add to cart </Button>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </ThemeProvider>
    );
}