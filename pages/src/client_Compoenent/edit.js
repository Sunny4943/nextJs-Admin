import React from "react";
import styles from '../../../styles/Home.module.css'
import { IoIosPerson } from 'react-icons/io';
import { IoIosUnlock, IoIosBarcode, IoMdPhonePortrait } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5'
import Router from 'next/router'
import { store } from '../../../src/store'
import * as Action from '../../../src/actions'
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRegister, fethClientDetails, updateClientProfile } from '../../../src/admin/supportFunction'
class EditCLient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "", contact: "", city: "", userId: "", passWord: "", confPassword: "", ApiKey: "", Secretkey: "", BarCode: "", loginChecked: 0
        }
        this.fetchClientInfo()
        //console.log(JSON.stringify(sessionStrategyList))
    }
    getHistoricalData = async () => {
        // console.log("Historical data");
    }
    fetchClientInfo = async () => {
        if (this.props.state.clientCode) {
            const clntdetails = await fethClientDetails(this.props.state.clientCode).then(function (result) {
                //console.log(JSON.stringify(result))
                return result ? result : [];
            }).catch((err) => { console.log(err) });
            if (clntdetails) {
                for (var i = 0; i < clntdetails.length; i++) {
                    this.setState({ userName: clntdetails[i]['UserName'], userId: clntdetails[i]['Userid'], contact: clntdetails[i]['Contact'], city: clntdetails[i]['City'], ApiKey: clntdetails[i]['ApiKey'], Secretkey: clntdetails[i]['SecretKey'], BarCode: clntdetails[i]['BarCode'] })
                }
            }
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
        this.getHistoricalData();
    }
    UpdateClient = async () => {
        if (this.props.state.clientCode) {
            if (this.state.userName && this.state.contact && this.state.city && this.state.userId && this.state.ApiKey && this.state.Secretkey && this.state.BarCode) {
                const updateClnt = await updateClientProfile(this.props.state.clientCode, this.state.userName, this.state.contact, this.state.city, this.state.ApiKey, this.state.Secretkey, this.state.BarCode)
                if (updateClnt.toString().includes("2")) {
                    // if (parseInt(new Date(this.state.clientDetails[0]["expiry"]).getMonth()) > parseInt(new Date(this.state.clientCurMonPos).getMonth())) {
                    toast.success("Successfully Updated....")
                    this.fetchClientInfo()
                    //}
                    /* store.dispatch(Action.default.login({ login: true, userName: this.state.userName, subscriptionExpiry: expiry, userCode: this.props.state.clientCode }));
                     store.subscribe(() => {
                         saveState(store.getState());
                     })
                     setTimeout(() => window.location.reload(), 150);*/
                }


            } else {
                toast.warn("Please Fill All details...")
                //console.log(JSON.stringify(responseRegister)) // store.dispatch(Action.default.login({ login: true, email: this.state.userId }));
                //Router.router.push("/src/home")
            }
        }
    }

    render() {

        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', marginBottom: "0px" }}>
                <div class="login-page bg-light">
                    <div class="container" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: "100%", marginTop: "25px" }} >
                        <div class="row">
                            <div class="col-lg-10 offset-lg-1">
                                <h3 class="mb-3">Profile</h3>
                                <div class="bg-white shadow rounded">
                                    <div class="row">
                                        <div style={{ width: "100%", padding: '50px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                                                <div style={{ width: "100%" }}>
                                                    <div className={styles.legGrid1}>
                                                        <div style={{ width: 'auto', padding: '5px' }}>
                                                            <label>UserID<span class="text-danger">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><IoIosPerson /></div>
                                                                <input disabled type="text" name="userId" maxLength={20} value={this.state.userId ? this.state.userId : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter UserID" />
                                                            </div>
                                                        </div>
                                                        {/*<div style={{ width: 'auto', padding: '5px' }}>
                                                            <label>Name<span class="text-danger">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><IoIosPerson /></div>
                                                                <input type="text" name="userName" maxLength={20} value={this.state.userName ? this.state.userName : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Name" />
                                                            </div>
                                                        </div>
        */}
                                                        <div style={{ width: 'auto', padding: '5px' }}>
                                                            <label>Contact No.<span class="text-danger">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><IoMdPhonePortrait /></div>
                                                                <input type="text" name="contact" maxLength={10}
                                                                    onKeyPress={(event) => {
                                                                        if (!/[0-9]/.test(event.key)) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }} value={this.state.contact ? this.state.contact : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter contact" />
                                                            </div>
                                                        </div>
                                                        <div style={{ width: 'auto', padding: '5px' }}>
                                                            <label>City<span class="text-danger">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><IoLocationSharp /></div>
                                                                <input type="text" name="city" maxLength={20} value={this.state.city ? this.state.city : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter City" />
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                                <div style={{ width: "100%" }}>
                                                    <div className={styles.legGrid1}>
                                                        {/*<div style={{ width: 'auto', padding: '5px' }}>
                                                            <label>UserID<span class="text-danger">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><IoIosPerson /></div>
                                                                <input disabled type="text" name="userId" maxLength={20} value={this.state.userId ? this.state.userId : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter UserID" />
                                                            </div>
                                                        </div>*/}
                                                        <div style={{ width: 'auto', padding: '5px' }}>
                                                            <label>Name<span class="text-danger">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><IoIosPerson /></div>
                                                                <input type="text" name="userName" maxLength={20} value={this.state.userName ? this.state.userName : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Name" />
                                                            </div>
                                                        </div>

                                                        {/* <div style={{ width: 'auto', padding: '5px' }}>
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
                                                        </div>*/}
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


                                                    </div>
                                                </div>
                                                <div style={{ width: "100%" }}>

                                                    {/*<div style={{ width: 'auto', padding: '5px' }}>
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
                                                    </div>*/}

                                                    <div style={{ width: '300px', padding: '5px' }}>
                                                        <label>BarCode<span class="text-danger">*</span></label>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><IoIosBarcode /></div>
                                                            <input type="text" name="BarCode" maxLength={100} value={this.state.BarCode ? this.state.BarCode : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Barcode" />
                                                        </div>
                                                    </div>



                                                </div>
                                                <div style={{ width: "100%" }}>
                                                    <div class="col-12">
                                                        <button onTouchStartCapture={() => { this.UpdateClient() }} onClick={() => { this.UpdateClient() }} class="btn btn-primary px-4 float-end mt-4">Update</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        {/*<div class="row">
                            <div  class="row">
                            <div class="col-7">
                              <label>UserID<span class="text-danger">*</span></label>
                              <div class="input-group">
                                <div class="input-group-text"><IoIosPerson /></div>
                                <input type="text" name="userName" value={this.state.userName ? this.state.userName : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter UserID" />
                              </div>
                            </div>
                            <div class="col-7">
                              <label>Api Key<span class="text-danger">*</span></label>
                              <div class="input-group">
                              <div class="input-group-text"><IoIosUnlock /></div>
                                <input type="text" name="userName" value={this.state.userName ? this.state.userName : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Api Key" />
                              </div>
                            </div>
                            </div>

                            <div class="col-12">
                              <label>Password<span class="text-danger">*</span></label>
                              <div class="input-group">
                                <div class="input-group-text"><IoIosUnlock /></div>
                                <input type="password" name="passWord" value={this.state.passWord ? this.state.passWord : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Password" />
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
                              <button onTouchStartCapture={() => { this.LoginClicked(this.state.userName, this.state.passWord) }} onClick={() => { this.LoginClicked(this.state.userName, this.state.passWord) }} class="btn btn-primary px-4 float-end mt-4">Register</button>
                            </div>
                            <div>
                              Already Have an account? <span onClick={()=>{Router.router.push("/")}} style={{color:'#1e90ff' ,fontWeight:'bold',cursor:'pointer'}}>Login Now</span>
                            </div>
                          </div>*/}


                                        { /*<div class="col-md-5 ps-0 d-none d-md-block">
                        <div class="form-right h-100 bg-primary text-white text-center pt-5">
                          <h2 class="fs-1">Welcome Back!!!</h2>
                        </div>
    </div>*/}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

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
            </div >
        )
    }
}
export default EditCLient;
