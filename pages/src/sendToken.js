import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React from "react";
import { IoIosPerson } from 'react-icons/io';
import { IoIosUnlock } from 'react-icons/io';
import Router from 'next/router'
import { store } from '../../src/store';
import * as Action from '../../src/actions'
import { userLogin } from '../../src/admin/supportFunction';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import { saveState } from '../../src/stateLoader';
import { IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
if (typeof window !== 'undefined') {
    const { localStorage, sessionStorage } = window;
    var userDetails = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : []
    // console.log(JSON.parse(localStorage.getItem("ReduxStore")))
    console.log(userDetails)
}
//import { useSession, signIn, signOut } from "next-auth/react"
class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: userDetails["userId"] ? userDetails["userId"] : "",
            passWord: userDetails["password"] ? userDetails["password"] : "",
            loginChecked: 0
        }
        // if (this.state.userName) {
        //Router.router.reload();
        //}
        //this.fetchSymbol();
        //console.log(JSON.stringify(sessionStrategyList))
    }
    getHistoricalData = async () => {
        // console.log("Historical data");
    }
    expireSession = async () => {
        const auth_api = await fetch('/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify({ query: tempQuery, type: "select" }),
        })
            .then((result) => result.json()) // here
            .then((result) => { return result })
        if (auth_api) {
            localStorage.clear()
            Router.router.push("/")  // Router.reload()
        }

    }
    handleChange(evt) {
        const value = evt.target.value;
        if (value) {

            this.setState({
                [evt.target.name]: value
            });
            //}
        } else {
            this.setState({
                [evt.target.name]: ''
            });
        }
        console.log(evt.target.name + " " + evt.target.value)
    }
    componentDidMount() {
        if (userDetails) {
            Router.router.push("/src/sendToken")
        }
        else {
            Router.router.push("/")
        }
        this.getHistoricalData();
    }


    LoginClicked = async () => {
        //signIn()
        if (this.state.userName && this.state.passWord) {
            const responseLogin = await userLogin(this.state.userName, this.state.passWord);
            //console.log(responseLogin.toString().includes("3"))
            if (responseLogin) {
                if (responseLogin[0].toString().includes("1")) {
                    if (userDetails["tokenDetails"]) {
                        const accessToken = userDetails["tokenDetails"]["access_token"]
                        const requestToken = userDetails["tokenDetails"]["1"]
                        const loginTime = userDetails["tokenDetails"]["login_time"]
                        const broker = userDetails["tokenDetails"]["broker"]
                        //toast.warn(Broker)
                        const updateResponse = await fetch('/api/updateAccessToken', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            // body: JSON.stringify({ ApiKey: this.state.ApiKey, SecretKey: this.state.Secretkey, ClntID: this.state.userId, Clntpwd: this.state.passWord, Totp: this.state.otp }),
                            body: JSON.stringify({ Broker: broker, UserID: this.state.userName, accessToken: accessToken, requestToken: requestToken, loginDate: loginTime }),
                        }).then((result) => result.json()) // here
                            .then((result) => {
                                //console.log(result)
                                return result
                            })
                        var allConnResponse = "";
                        if (updateResponse) {
                            for (var i = 0; i < updateResponse.length; i++) {
                                if ((updateResponse[0]["data"]) === 2 || (updateResponse[0]["data"]) === "2") {
                                    allConnResponse = 1;
                                }
                                else if ((updateResponse[0]["data"]) === 3 || (updateResponse[0]["data"]) === "3") {
                                    allConnResponse = 2
                                }
                                else {
                                    allConnResponse = 3
                                    toast.warn("Access Token Not Updated In Connection " + (i + 1) + "");
                                }

                            }
                        }
                        if ((allConnResponse === 1) || (allConnResponse === "1")) {
                            toast.success("Access Token SuccessFully Updated for All Connections...");
                        }
                        else if ((allConnResponse === 2) || (allConnResponse === "2")) {
                            toast.warn("Please Register again acess token  is expired...");
                        }
                        else if ((allConnResponse === 3) || (allConnResponse === "3")) {
                            //toast.warn("Access Token Not Updated In Connection " + (i + 1) + ""); 
                        }
                        /*if ((updateResponse === 2) || (updateResponse === "2")) {
                            toast.success("Access Token Updated Successfully...")
                        }*/
                        // toast.success(accessToken)
                        // toast.success(requestToken)
                        //toast.success(loginTime)
                    }
                    //toast.success("Login")
                }
                else if (responseLogin[0].toString().includes("2")) {
                    toast.warn("Wrong Password...")
                }
                else if (responseLogin[0].toString().includes("3")) {
                    toast.warn("User Not Found...")
                }
            }
            // console.log(responseLogin)
            //alert('Please enter username and password');
        } else {
            toast.warn("Please Fill All Details...")
            //store.dispatch(Action.default.login({ login: true, email: userName }));
            //Router.router.push("/src/home")
        }
    }

    render() {

        return (
            <div className={styles.container}>
                <ToastContainer />
                <Head>
                    <title>Admin Strategy</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {Capacitor.isNativePlatform() && (
                    <IonHeader>
                        <IonToolbar color="primary" >
                            <IonTitle >Update Access Token</IonTitle>
                        </IonToolbar>
                    </IonHeader>)}
                <main>
                    <div class="container" style={{ paddingTop: "0x", marginTop: "15px", }}>
                        <div class="row">
                            <div class="col-lg-10 offset-lg-1">

                                <div style={{ padding: "15px", height: '100%', border: "1px solid", borderColor: "rgba(0, 0, 0, 0.3)", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 15px 12px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff' }}>
                                    <div class="row">
                                        <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", paddingTop: "5px", paddingBottom: "15px" }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                                                <div style={{ width: "100%" }}>
                                                    <div className={styles.legGrid1}>
                                                        <div style={{ width: 'auto', padding: '5px' }}>
                                                            <label>UserID<span class="text-danger">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><IoIosPerson /></div>
                                                                <input disabled type="text" name="userName" value={this.state.userName ? this.state.userName : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter User Id" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ width: "100%" }}>
                                                    <div className={styles.legGrid1}>
                                                        <div style={{ width: 'auto', padding: '5px' }}>
                                                            <label>Password<span class="text-danger">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><IoIosUnlock /></div>
                                                                <input disabled type="password" name="passWord" value={this.state.passWord ? this.state.passWord : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Password" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ width: "100%" }}>
                                                    <div className={styles.legGrid1}>
                                                        <div style={{ width: 'auto', padding: '5px' }}>
                                                            <button type="submit" onTouchStartCapture={() => { this.LoginClicked() }} class="btn btn-primary px-4 float-end mt-4">Send Access Token</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ paddingTop: "40px" }}>
                                                    Not a member? <span onTouchStartCapture={() => { this.expireSession() }} style={{ color: '#1e90ff', fontWeight: 'bold', cursor: 'pointer' }}>Register</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="col-md-7 pe-0">
                                            <div class="form-left h-100 py-5 px-5">

                                                <div class="row g-4">
                                                    <div class="col-12">
                                                        <label>UserID<span class="text-danger">*</span></label>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><IoIosPerson /></div>
                                                            <input disabled type="text" name="userName" value={this.state.userName ? this.state.userName : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter User Id" />
                                                        </div>
                                                    </div>

                                                    <div class="col-12">
                                                        <label>Password<span class="text-danger">*</span></label>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><IoIosUnlock /></div>
                                                            <input disabled type="password" name="passWord" value={this.state.passWord ? this.state.passWord : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Password" />
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-6">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" id="inlineFormCheck" />
                                                            <label class="form-check-label" for="inlineFormCheck">Remember me</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-6">
                                                        <a href="#" class="float-end text-primary">Forgot Password?</a>
                                                    </div>

                                                    <div class="col-12">
                                                       
                                                        <button type="submit" onTouchStartCapture={() => { this.LoginClicked() }} class="btn btn-primary px-4 float-end mt-4">Send Access Token</button>
                                                    </div>
                                                    <div>
                                                        Not a member? <span onTouchStartCapture={() => { Router.router.push("/") }} style={{ color: '#1e90ff', fontWeight: 'bold', cursor: 'pointer' }}>Register</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>*/}
                                        {/*<div class="col-md-5 ps-0 d-none d-md-block">
                                            <div class="form-right h-100 bg-primary text-white text-center pt-5">
                                                <h2 class="fs-1">Welcome Back!!!</h2>
                                            </div>
            </div>*/}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </main>
                {/*<footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
    </footer>*/}
            </div>
        )
    }
}
export default home;
