import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react";
import { IoIosPerson } from 'react-icons/io';
import { IoIosUnlock, IoIosBarcode, IoMdPhonePortrait } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5'
import { BsCurrencyExchange } from 'react-icons/bs'
import Router from 'next/router'
import { store } from '../src/store'
import * as Action from '../src/actions'
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRegister } from '../src/admin/supportFunction'
import Modal from 'react-awesome-modal';
import LoadingSpinner from './src/component/LoadingSpinner';
import { IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
if (typeof window !== 'undefined') {
  const { localStorage, sessionStorage } = window;
  var userDetails = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : []
  // console.log(JSON.parse(localStorage.getItem("ReduxStore")))
}

class UserRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selBroker: "", userId: "", passWord: "", confPassword: "", ApiKey: "", Secretkey: "", BarCode: "", loginChecked: 0,
      brokerArray: ['ZERODHA'], otp: "", accessToken: "", requestToken: "", refreshToken: "", loginTime: "", isLoading: false
    }
    if (userDetails) {
      // Router.router.push("/src/sendToken");
    }

    // localStorage.clear();
    //this.fetchSymbol();
    //console.log(JSON.stringify(sessionStrategyList))
  }
  getHistoricalData = async () => {
    // console.log("Historical data");
  }

  onOptionChangeHandler = (evt) => {
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
    console.log(this.state.selBroker)
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
    //localStorage.clear();
    this.getHistoricalData();
  }
  logout = async () => {
    //store.dispatch(Action.default.login({ login: false, userName: "", subscriptionExpiry: "" }));
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
      //store.dispatch(Action.default.login({ login: false, userName: "", subscriptionExpiry: "", userCode: "" }));
      //localStorage.setItem('userDetails', JSON.stringify(""))
      // Router.router.push("/")
      // Router.reload()

    }

  }
  RegisterButonClick = async () => {

    if ((this.state.userId) && (this.state.passWord) && (this.state.confPassword) && (this.state.ApiKey) && (this.state.Secretkey) && (this.state.selBroker) && (this.state.BarCode)) {
      if (!(this.state.selBroker.includes("Select Broker"))) {
        if (((this.state.passWord).toString()) === ((this.state.confPassword).toString())) {
          this.setState({ isLoading: true })
          var totp = await fetch('/api/topt_generate_authenticator', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ BarCode: this.state.BarCode }),
          }).then((result) => result.json()) // here
            .then((result) => {
              //console.log(result)
              return result["authenticator_otp"]
            })
          //this.setState({ otp: "" })
          if (totp) {
            this.setState({ otp: totp }, () => { console.log(this.state.otp) })
            // }
            //  if ((this.state.otp) && (this.state.ApiKey) && (this.state.Secretkey) && (this.state.passWord) && (this.state.userId)) {
            console.log("test")
            const responseToken = await fetch('/api/zerodhaLogin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              // body: JSON.stringify({ ApiKey: this.state.ApiKey, SecretKey: this.state.Secretkey, ClntID: this.state.userId, Clntpwd: this.state.passWord, Totp: this.state.otp }),
              body: JSON.stringify({ ApiKey: this.state.ApiKey, SecretKey: this.state.Secretkey, ClntID: this.state.userId, Clntpwd: this.state.passWord, Totp: totp }),
            }).then((result) => result.json()) // here
              .then((result) => {
                console.log(JSON.stringify(result))
                if (result["login"]) {
                  return result["login"];
                  /*const auth_Api_url = "/api/auth/login?user=" + this.state.userName + "&admin=false"
                  console.log(auth_Api_url)
                  const auth_api = async () => {
                    await fetch(auth_Api_url, {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      //body: JSON.stringify({ query: tempQuery, type: "select" }),
                    })
                      .then((result) => result.json()) // here
                      .then((result) => { console.log(result); return result })
                  }
                  console.log(auth_api)
                  if (auth_api) {
                    localStorage.setItem("userDetails", JSON.stringify({ "userId": this.state.userId, "password": this.state.passWord, "broker": this.state.selBroker, "tokenDetails": result["login"] }))
                    toast.success("Registered SuccessFully...");
                    Router.router.push("/src/sendToken")
                  }*/
                }
                // console.log(JSON.stringify(store.getState()))
                // return result["authenticator_otp"]
              }).catch((err) => {
                toast.warn(err)
              })
            if (responseToken) {
              // console.log(responseToken)
              const auth_Api_url = "/api/auth/login?user=" + this.state.userId + "&admin=false"
              const auth_api = await fetch(auth_Api_url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                //body: JSON.stringify({ query: tempQuery, type: "select" }),
              })
                .then((result) => result.json()) // here
                .then((result) => { console.log(result); return result })

              console.log(auth_api)
              if (auth_api) {
                localStorage.setItem("userDetails", JSON.stringify({ "userId": this.state.userId, "password": this.state.passWord, "broker": this.state.selBroker, "tokenDetails": responseToken }))
                toast.success("Registered SuccessFully...");
                Router.router.push("/src/sendToken")
              }
            }
          }
          // toast.success("register");
          this.setState({ isLoading: false })
        }
        else {
          toast.warn("Check Password And Confirm Password...");
        }
      }
      else {
        toast.warn("Select Broker..");
      }
    }
    else {
      toast.warn("Fill All Details...");
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

        <IonHeader>
          <IonToolbar color="primary" >
            <IonTitle >Registration</IonTitle>
          </IonToolbar>
        </IonHeader>


        <main >
          <ion-grid>
            <ion-col size="auto">
              <div className={styles.legGrid1}>
                <ion-input type="email" >
                  <ion-icon name="logo-ionic"></ion-icon>
                </ion-input>
              </div>

            </ion-col>
            <ion-col size="auto">
              <div className={styles.legGrid1}>
                test
              </div>
            </ion-col>
          </ion-grid>
          {  /*  <div class="container" style={{ paddingTop: "20x", marginTop: "30px" }}>
            <div class="row">
              <div class="col-lg-10 offset-lg-1">

                <div class="bg-white shadow rounded">

                  <div class="row">
                    <div style={{ width: "100%", padding: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <div className={styles.legGrid1}>
                            <div style={{ width: 'auto', padding: '5px' }}>
                              <label>Broker<span class="text-danger">*</span></label>
                              <div class="input-group">
                                <div class="input-group-text"><BsCurrencyExchange /></div>
                                <select name="selBroker" style={{ width: "auto" }} class="form-control" onChange={(evt) => this.onOptionChangeHandler(evt)}>
                                  <option style={{ width: "50%" }}>Select Broker</option>
                                  {this.state.brokerArray.map((option, index) => {
                                    return <option style={{ width: "50%" }} key={index} >
                                      {option}
                                    </option>
                                  })}
                                </select >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ width: "100%" }}>
                          <div className={styles.legGrid1}>
                            <div style={{ width: 'auto', padding: '5px' }}>
                              <label>UserID<span class="text-danger">*</span></label>
                              <div class="input-group">
                                <div class="input-group-text"><IoIosPerson /></div>
                                <input type="text" name="userId" maxLength={20} value={this.state.userId ? this.state.userId.toUpperCase() : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter UserID" />
                              </div>
                            </div>

                            <div style={{ width: 'auto', padding: '5px' }}>
                              <label>Password<span class="text-danger">*</span></label>
                              <div class="input-group">
                                <div class="input-group-text"><IoIosUnlock /></div>
                                <input type="password" name="passWord" maxLength={20} value={this.state.passWord ? this.state.passWord : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Password" />
                              </div>
                            </div>
                            <div style={{ width: 'auto', padding: '5px' }}>
                              <label>Confirm Password<span class="text-danger">*</span></label>
                              <div class="input-group">
                                <div class="input-group-text"><IoIosUnlock /></div>
                                <input type="password" name="confPassword" maxLength={20} value={this.state.confPassword ? this.state.confPassword : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Confirm Password" />
                              </div>
                            </div>


                          </div>
                        </div>
                        <div style={{ width: "100%" }}>
                          <div className={styles.legGrid1}>
                            <div style={{ width: 'auto', padding: '5px' }}>
                              <label>Api Key<span class="text-danger">*</span></label>
                              <div class="input-group">
                                <div class="input-group-text"><IoIosUnlock /></div>
                                <input type="text" name="ApiKey" maxLength={100} value={this.state.ApiKey ? this.state.ApiKey : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Api Key" />
                              </div>
                            </div>

                            <div style={{ width: 'auto', padding: '5px' }}>
                              <label>Secret Key<span class="text-danger">*</span></label>
                              <div class="input-group">
                                <div class="input-group-text"><IoIosUnlock /></div>
                                <input type="text" name="Secretkey" maxLength={200} value={this.state.Secretkey ? this.state.Secretkey : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Secret Key" />
                              </div>
                            </div>

                            <div style={{ width: 'auto', padding: '5px' }}>
                              <label>BarCode<span class="text-danger">*</span></label>
                              <div class="input-group">
                                <div class="input-group-text"><IoIosBarcode /></div>
                                <input type="text" name="BarCode" maxLength={100} value={this.state.BarCode ? this.state.BarCode : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Barcode" />
                              </div>
                            </div>


                          </div>
                        </div>
                        <div className={styles.legGrid1}>
                          
                          <div style={{ width: 'auto', padding: '5px' }}>
                            <ion-button class="ion-full" color="primary" onClick={() => this.RegisterButonClick()}>
                              Register
                            </ion-button>
                          </div>
                          <Modal visible={this.state.isLoading} width="auto" height="auto" >
                            <div style={{ width: "auto", height: "auto", backgroundColor: "transparent" }}>
                              <LoadingSpinner />
                            </div>
                          </Modal>
                        </div>

                        <div style={{ paddingTop: "30px" }}>
                          Already Have an account? <span onClick={() => { Router.router.push("/src/sendToken") }} style={{ color: '#1e90ff', fontWeight: 'bold', cursor: 'pointer' }}>Send Token</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>*/}
        </main >

      </div >

    )
  }
}
export default UserRegister;
