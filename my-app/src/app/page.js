'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from 'react';
import Products from './products/page.js';
import Login from './login/page.js';
import Register from './register/page.js';
import Manager from './manager/page.js';
import Cart from './cart/page.js';
import Checkout from './checkout/page.js';

export default function MyApp() {
  const [showLogin, setShowLogin] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  let loggedIn = false;
  	
  function setPagesFalse(){
    setShowLogin(false);
    setShowProducts(false);
    setShowRegister(false);
    setShowManager(false);
    setShowCart(false);
    setShowCheckout(false);
  }
  function runShowLogin(){
    setPagesFalse();
    setShowLogin(true);
  }

  function runShowProducts(){
    setPagesFalse();
    setShowProducts(true);
  }
  
  function runShowRegister(){
    setPagesFalse();
    setShowRegister(true);
  }

  function runShowManager(){
    setPagesFalse();
    setShowManager(true);
  }

  function runShowCart(){
    setPagesFalse();
    setShowCart(true);
  }

  function runShowCheckout(){
    setPagesFalse();
    setShowCheckout(true);
  }

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    if(data.data== "valid"){
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
            {!loggedIn &&
              <Box>
              <Button color="inherit" onClick={runShowLogin}>Login</Button>
              <Button color="inherit" onClick={runShowRegister}>Register</Button>
              </Box>
            }
            {loggedIn &&
              <Box>
              <Button color="inherit" onClick={runShowProducts}>Products</Button>
              <Button color="inherit" onClick={runShowCart}>Cart</Button>
              <Button color="inherit" onClick={runShowCheckout}>Checkout</Button>
              </Box>
            }
            {loggedIn /* and manager = true*/ &&
              <Box>
              <Button color="inherit" onClick={runShowManager}>Manager</Button>
              </Box>
            }
          </Toolbar>
        </AppBar>

        {showLogin &&
            Login()
        }

        {showProducts &&
            Products()
        }

        {showRegister &&
            Register()
        }

        {showManager &&
            Manager()
        }

        {showCart &&
            Cart()
        }

        {showCheckout &&
            Checkout()
        }
      </Box>
  );
}