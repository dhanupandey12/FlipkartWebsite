import React, { useState, useContext } from 'react'
import { Dialog, Box, TextField, Typography, Button, styled } from '@mui/material'
import { authenticateSignup, authenticateLogin } from '../../service/api'
import { DataContext } from '../../context/DataProvider'

const Component = styled(Box)`
height : 70vh;
width : 90vh;
`
const Image = styled(Box)`
background : #2874f0 Url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
height : 83%;
width  : 28%;
padding : 45px 35px;
& > p, & > h5{
  color: #ffffff;
  font-weight: 600;
}
`
const Wrapper = styled(Box)
`
display : flex;
flex-direction : column;
padding : 25px 35px;
flex: 1;
& > div, & > button, & > p{
  margin-top : 20px;
}
`
const LoginButton = styled(Button)
`
text-transform: none;
background: #fB641B;
color: #fff;
height : 48px;
border-radius: 2px;

`
const RequestOtp = styled(Button)
`
text-transform: none;
background: #fff;
color: #2874f0;
height : 48px;
border-radius: 2px;
box-shadow : 0 2px 4px 0 rgb(0 0 0/ 20%);
`

const Text = styled(Typography)
`
font-size: 12px;
color: #878787;
`

const CreateAccount = styled(Typography)
`
font-size : 14px;
text-align: center;
color: #2874f0;
font-weight: 600;
cursor: pointer;
`;

const Error = styled(Typography)`
font-size : 10px;
color: #ff6161;
line-height: 0;
marging-top : 10px;
font-weight : 600;

`

const accountinitialValues = {
  login: {
    view: 'login',
    heading: 'Login',
    subHeading: 'Get access to your orders, wishlist and Recommendations'
  },
  signup:{
    view: 'signup',
    heading: 'looks like you are here',
    subHeading: 'Sign up with your mobile number to get started'
  }
}

const signupIntialValue = {
  firstname : '',
  lastname : '',
  username : '',
  email    : '',
  password : '',
  phone    : ''
}

const loginIntialValue = {
  
  username : '',
  password : ''
}

export default function LoginDialog({open, setOpen}) {

const [account, toggleAccount] = useState(accountinitialValues.login);
const [signup, setsignup]  = useState(signupIntialValue);
const [login, setLogin] = useState(loginIntialValue)
const [error, setError] = useState(false);

const {setAccount} = useContext(DataContext)


const toggleSignup = ()=>{
 toggleAccount(accountinitialValues.signup)
}

  const handleClose = () =>{
    setOpen(false)
    toggleAccount(accountinitialValues.login)
    setError(false);
  }



  const onInputChange = (e)  =>{
    setsignup({...signup, [e.target.name]: e.target.value})
    console.log(signup)
  }

  const signupUser = async () => {
      let response =  await authenticateSignup(signup)
      if(!response) return;
      handleClose();
      setAccount(signup.firstname);
  }

  const onValueChange = (e) => {
     setLogin({...login, [e.target.name]: [e.target.value]})
  }

  const loginUser = async () => {
    let response = await authenticateLogin(login);
    console.log(response);
    if(response.status === 200)
    {
      handleClose();
      setAccount(response.data.data.firstname)
    }
    else {
     setError(true);
    }
  }
  
  return (
    <Dialog open = {open} onClose = {handleClose} PaperProps={{sx:{maxwidth: 'unset'}}}>
      
      <Component >
        <Box style = {{display: 'flex', height: '100%'}}>
        <Image>
         <Typography variant="h5">{account.heading}</Typography>
         <Typography style={{marginTop: 20}}>{account.subHeading}</Typography>
        </Image>
        { account.view === 'login' ?
          <Wrapper>
          <TextField variant= "standard" onChange = {(e) => onValueChange(e)} name = 'username' label = "Enter Email/Mobile Number"/>
          {error && <Error>Please enter valid username or password</Error>}
          <TextField variant= "standard" onChange = {(e) => onValueChange(e)} name = 'password' label = "Enter Password"/>
          <Text>By continuing, you agree to flipkart term of use and Privacy Policy</Text>
          <LoginButton onClick = {() => {loginUser()}}>Login</LoginButton>
          <Typography style = {{ textAlign : 'center'}}>OR</Typography>
          <RequestOtp>Request OTP</RequestOtp>
          <CreateAccount onClick ={() =>{toggleSignup()} }>New to Flipkart? Create an account </CreateAccount>
               </Wrapper>
               :
               <Wrapper>
   <TextField variant= "standard" onChange = {(e) => onInputChange(e)} name = 'firstname' label = "Enter Firstname"/>
   <TextField variant= "standard" onChange = {(e) => onInputChange(e)} name = 'lastname' label = "Enter Lastname"/>
   <TextField variant= "standard" onChange = {(e) => onInputChange(e)} name = 'username' label = "Enter Username"/>
   <TextField variant= "standard" onChange = {(e) => onInputChange(e)} name = 'email' label = "Enter Email"/>
   <TextField variant= "standard" onChange = {(e) => onInputChange(e)} name = 'password' label = "Enter Password"/>
   <TextField variant= "standard" onChange = {(e) => onInputChange(e)} name = 'phone' label = "Enter Phone"/>
   <LoginButton onClick = {() => signupUser()}>Continue</LoginButton>
  
        </Wrapper>
        }
        
        </Box>
      </Component>
      
      </Dialog>
  )
}
