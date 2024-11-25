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
import Image from 'next/image'


export default function Product() {
    const [data, setData] = useState()
    const [weather, setWeatherData] = useState(null)
    const [user, setUser] = useState(null)
   

    useEffect(() => {
        fetch('https://rich-web-assignment.vercel.app/api/getWeather')
            .then((res) => res.json())
            .then((weather) => {
                setWeatherData(weather)
            })
        fetch('https://rich-web-assignment.vercel.app/api/getProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
        fetch('/api/getData')
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
        runDBCallAsync(`https://rich-web-assignment.vercel.app/api/addToCart?user=${user.email}&product=${product}&price=${price}`)
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
            <Link href="/products" style={{padding: 10}}>Products</Link>
            <Link href="/cart" style={{padding: 10}}>Cart</Link>
            <Link href="/" style={{padding: 10}}>Login</Link>
          </Toolbar>
        </AppBar>

        Today's temperature: {JSON.stringify(weather.temp)}°C
            <Container component="main" >
                <div style={{fontSize: '40px', textAlign: 'center'}} > Products</div>
                <Box  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
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
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 2,
                              }} key={i}>
                                <Box>
                                {item.title}
                                <br></br>
                                <br></br>
                                Description:
                                <br></br>
                                {item.description}
                                <br></br>
                                <br></br>
                                Price: €
                                {item.price.toFixed(2)}
                                <br></br>
                                </Box>
                                <Box>
                                <Image src={item.image} alt="Jam Image" width={500} height={300} />
                                </Box>
                                <Button variant="outlined" sx={{backgroundColor: 'blue', color: 'white', margin: 1, alignSelf: 'center'}} onClick={() => addToCart(item.title, item.price)}> Add to cart </Button>
                            </Box>
                        ))
                    }
                </Box>
            </Container>
      </Box>
    );
}