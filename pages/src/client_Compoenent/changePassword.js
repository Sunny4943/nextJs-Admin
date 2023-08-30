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
import { userRegister, fethClientDetails, updatePassword } from '../../../src/admin/supportFunction'
class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPwd: "", newPwd: "", newConfPwd: "", clientCurPass: ""
        }
        // this.fetchClientInfo()
        //console.log(JSON.stringify(sessionStrategyList))
    }
    getHistoricalData = async () => {
        // console.log("Historical data");
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
    fetchClientInfo = async () => {
        if (this.props.state.clientCode) {
            const clntdetails = await fethClientDetails(this.props.state.clientCode).then(function (result) {
                //console.log(JSON.stringify(result))
                return result ? result : [];
            }).catch((err) => { console.log(err) });
            if (clntdetails) {
                for (var i = 0; i < clntdetails.length; i++) {
                    this.setState({ clientCurPass: clntdetails[i]['Password'] }, () => { console.log(this.state.clientCurPass, this.props.state.clientCode) })
                }
            }
        }

    }
    componentDidMount() {
        this.getHistoricalData();
    }
    ChangePassword = async () => {
        if (this.props.state.clientCode) {
            this.fetchClientInfo()
            if (this.state.oldPwd && this.state.newPwd && this.state.newConfPwd) {
                if ((this.state.oldPwd).toString() === (this.state.clientCurPass).toString()) {
                    const updateClnt = await updatePassword(this.props.state.clientCode, this.state.newPwd)
                    if (updateClnt.toString().includes("2")) {
                        toast.success("Successfully Changed Password")
                        this.fetchClientInfo()
                        this.setState({
                            oldPwd: "", newPwd: "", newConfPwd: ""
                        })
                    }
                }
                else {
                    toast.warn("Check Old Password..")
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
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                <div class="login-page bg-light">
                    <div class="container" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', marginTop: "25px" }} >
                        <div class="row">
                            <div class="col-lg-10 offset-lg-1">
                                <h3 class="mb-3">Change Password</h3>
                                <div class="bg-white shadow rounded">
                                    <div class="row">
                                        <div style={{ width: "100%", padding: '50px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                                                <div style={{ width: 'auto', padding: '5px' }}>
                                                    <label>Old Password<span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><IoIosUnlock /></div>
                                                        <input type="password" name="oldPwd" maxLength={20} value={this.state.oldPwd ? this.state.oldPwd : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Old Password..." />
                                                    </div>
                                                </div>
                                                <div style={{ width: 'auto', padding: '5px' }}>
                                                    <label>New Password<span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><IoIosUnlock /></div>
                                                        <input type="password" name="newPwd" maxLength={20} value={this.state.newPwd ? this.state.newPwd : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter New Password..." />
                                                    </div>
                                                </div>
                                                <div style={{ width: 'auto', padding: '5px' }}>
                                                    <label>New Conf. Password<span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><IoIosUnlock /></div>
                                                        <input type="password" name="newConfPwd" maxLength={20} value={this.state.newConfPwd ? this.state.newConfPwd : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Confirm Password..." />
                                                    </div>
                                                </div>
                                                {/* <div style={{ width: "100%" }}>
                                                    <div className={styles.legGrid1}>
                                                        <div style={{ width: 'auto', padding: '5px' }}>
                                                            <label>Name<span class="text-danger">*</span></label>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><IoIosPerson /></div>
                                                                <input type="text" name="userName" maxLength={20} value={this.state.userName ? this.state.userName : ""} onChange={(evt) => { this.handleChange(evt) }} class="form-control" placeholder="Enter Name" />
                                                            </div>
                                                        </div>

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
*/}

                                                <div style={{ width: "100%" }}>
                                                    <div class="col-12">
                                                        <button onTouchStartCapture={() => { this.ChangePassword() }} onClick={() => { this.ChangePassword() }} class="btn btn-primary px-4 float-end mt-4">Change Password</button>
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
export default ChangePasswordPage;
//regular expression for check password