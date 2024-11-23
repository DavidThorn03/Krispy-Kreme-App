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


export default function Product() {
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
   
    if (!weather) return <p>No weather</p>
    const addToCart = (product, price) => {
        console.log("Username is: " + user)
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
                                <Button variant="outlined" onClick={() => addToCart(item.title, item.price)}> Add to cart </Button>
                            </div>
                        ))
                    }
                </div>
            </Container>
      </Box>
        
   

         
      
    );
}