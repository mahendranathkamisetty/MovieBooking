import React from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import FormControl from "@material-ui/core/FormControl";
import { Tab, Tabs} from "@material-ui/core";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link, useParams } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
  };

  const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired
  }

  function Header (props) {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [usernameRequired, setUsernameRequired] = React.useState("dispNone");
    const [username, setUsername] = React.useState("");
    const [loginPasswordRequired, setLoginPasswordRequired] = React.useState("dispNone");
    const [loginPassword, setLoginPassword] = React.useState("");
    const [firstnameRequired, setFirstnameRequired] = React.useState("dispNone");
    const [firstname, setFirstname] = React.useState("");
    const [lastnameRequired, setLastnameRequired] = React.useState("dispNone");
    const [lastname, setLastname] = React.useState("");
    const [emailRequired, setEmailRequired] = React.useState("dispNone");
    const [email, setEmail] = React.useState("");
    const [registerPasswordRequired, setRegisterPasswordRequired] = React.useState("dispNone");
    const [registerPassword, setRegisterPassword] = React.useState("");
    const [contactRequired, setContactRequired] = React.useState("dispNone");
    const [contact, setContact] = React.useState("");
    const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(sessionStorage.getItem("access-token") == null ? false : true);
       
    const id = useParams().id;
  
    const openModalHandler = () => {
      setModalIsOpen(true);
      setValue(0);
      setUsernameRequired("dispNone");
      setUsername("");
      setLoginPasswordRequired("dispNone");
      setLoginPassword("");
      setFirstnameRequired("dispNone");
      setFirstname("");
      setLastnameRequired("dispNone");
      setLastname("");
      setEmailRequired("dispNone");
      setEmail("");
      setRegisterPasswordRequired("dispNone");
      setRegisterPassword("");
      setContactRequired("dispNone");
      setContact("");
      setLoggedIn();
  
  
    };
  
    const closeModalHandler = () => {
      setModalIsOpen (false );
    }
  
    const tabChangeHandler = (event, value) => {
        setValue( value );
    }
  
   const loginClickHandler = () => {
        username === "" ? setUsernameRequired("dispBlock" ) : setUsernameRequired("dispNone");
        loginPassword === "" ? setLoginPasswordRequired( "dispBlock" ) : setLoginPasswordRequired("dispNone" );
  
        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
      //   var state = document.readyState
      
        var resultText= XMLHttpRequest.responseText
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.resultText).id);
            
                if(xhrLogin.getResponseHeader("access-token") == null)
                {
                    sessionStorage.setItem("access-token", JSON.parse(resultText)["access-token"]);
                }
                
            
              
  
                closeModalHandler();
            }
        });
        setLoggedIn(true);
        xhrLogin.open("POST", props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(username + ":" + loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
       
        xhrLogin.send(dataLogin);
    }
  
  
   const registerClickHandler = () => {
        firstname === "" ? setFirstnameRequired( "dispBlock" ) : setFirstnameRequired("dispNone");
        lastname === "" ? setLastnameRequired("dispBlock" ) : setLastnameRequired("dispNone" );
        email === "" ? setEmailRequired( "dispBlock" ) : setEmailRequired("dispNone" );
        registerPassword === "" ? setRegisterPasswordRequired("dispBlock" ) : setRegisterPasswordRequired("dispNone" );
        contact === "" ? setContactRequired( "dispBlock" ) :setContactRequired("dispNone" );
  
        let dataSignup = JSON.stringify({
            "email_address": email,
            "first_name": firstname,
            "last_name": lastname,
            "mobile_number": contact,
            "password": registerPassword
        });
  
        let xhrSignup = new XMLHttpRequest();
       
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.state === 4) {
              setRegistrationSuccess(true);
            }
        });
  
        xhrSignup.open("POST", props.baseUrl + "auth/signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }
  
  
    const logoutHandler = (e) => {
  
        let dataSignout = JSON.stringify({
            "uuid": sessionStorage.getItem("uuid")
        });
  
        let xhrSignout = new XMLHttpRequest();
        var resultText= XMLHttpRequest.responseText
       
        xhrSignout.addEventListener("readystatechange", function () {
            if (this.state === 4) {
                if(JSON.parse(resultText).message === "Logged Out successfully.")
                {
                    sessionStorage.removeItem("uuid");
                    sessionStorage.removeItem("access-token");
  
                    loggedIn(false);
                }
            }
        });
  
        xhrSignout.open("POST", props.baseUrl + "auth/logout");
        xhrSignout.setRequestHeader("Content-Type", "application/json");
        xhrSignout.setRequestHeader("Cache-Control", "no-cache");
        xhrSignout.send(dataSignout);
  
  
        
    }
  
  
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="logo" alt="App-Logo" />
                   
                    {props.showBookShowButton === "true" && !loggedIn
                        ? <div className="book-show-btn">
                            <Button variant="contained" color="primary" onClick={openModalHandler}>
                                Book Show
                            </Button>
                        </div>
                        : ""
                    }
  
                    {props.showBookShowButton === "true" && loggedIn
                        ? <div className="book-show-btn">
                            <Link to={`/bookshow/${id}`}>
                                <Button variant="contained" color="primary">
                                    Book Show
                                </Button>
                            </Link>
                        </div>
                        : ""
                    }
                     {!loggedIn ?
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={openModalHandler}>
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={logoutHandler}>
                                Logout
                            </Button>
                        </div>
                    }
  
                </header>
                <Modal
                    ariaHideApp={false}
                    isOpen={modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={closeModalHandler}
                    style={customStyles}>
                    <Tabs className="tabs" value={value} onChange={tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
  
                    {value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={username} onChange={(event)=>setUsername(event.target.value)} />
                                <FormHelperText className={usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" type="password" loginpassword={loginPassword} onChange={(event)=>setLoginPassword(event.target.value)} />
                                <FormHelperText className={loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }
  
                    {value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={firstname} onChange={(event)=>setFirstname(event.target.value)} />
                                <FormHelperText className={firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={lastname} onChange={(event)=>setLastname(event.target.value)} />
                                <FormHelperText className={lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={email} onChange={(event)=>setEmail(event.target.value)} />
                                <FormHelperText className={emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input id="registerPassword" type="password" registerpassword={registerPassword} onChange={(event)=>setRegisterPassword(event.target.value)} />
                                <FormHelperText className={registerPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={contact} onChange={(event)=>setContact(event.target.value)} />
                                <FormHelperText className={contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {registrationSuccess === true &&
                                <FormControl>
                                    <span className="successText">
                                        Registration Successful. Please Login!
                                      </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={registerClickHandler}>REGISTER</Button>
                        </TabContainer>
                    }
                </Modal>
            </div>
        )
    }
  export default Header;