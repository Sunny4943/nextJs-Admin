'use client'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React from "react";
import { PiStrategyBold } from "react-icons/pi"
import { MdDashboard, MdLogout, MdOutlineMiscellaneousServices } from "react-icons/md"
import { FaCcAmazonPay } from "react-icons/fa"
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBFooter, MDBNavbar } from '../../node_modules/mdb-react-ui-kit';
import Dashboard from './homeComponent/dashboard';
import Strategies from './homeComponent/strategies';
import Services from './homeComponent/services';
import BillPay from './homeComponent/billPay';
import { fetchCompletedList, fetchPendingList, wait } from '../../src/admin/supportFunction'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            complatedModalVisible: false, pendingModalVisible: false, showDepthModalVisible: false,
            showToggle: false, autoSyncToggle: false,
            pendingList: [], pendinListLimit: 5, pendingListPage: 1
            , completedList: [], completedListLimit: 5, completedListPage: 1,
            width: 0, height: 0, completedModalArray: [],
            pendingModalArray: [], fromDate: new Date(), toDate: new Date(), clientList: [{ label: 'ALL', value: 'ALL' }],
            clientName: "", dashBoaedPage: true, strategyPage: false, servicePage: false, billPayPage: false,
        }
        this.onSubmitButtonClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.updateNavigationButton = this.updateNavigationButton.bind(this);
    }
    handleCallback = (name, value) => {
        this.setState({ [name]: value })
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
    handleCheckBox = (evt) => {
        const checked = evt.target.checked;
        if (checked) {
            this.setState({
                [evt.target.name]: checked
            });
            //}
        } else {
            this.setState({
                [evt.target.name]: false
            });
        }
        console.log(evt.target.name + " " + evt.target.checked)
    }
    openModal = async (val, list) => {
        if (val === "COMPLETED") {
            var tempArray = [];
            tempArray[0] = { "StrategyName": list }
            this.setState({
                complatedModalVisible: true, completedModalArray: tempArray
            });

        }
        else if (val === "PENDING") {
            this.setState({ pendingModalVisible: true })
        }
        else if (val === "ShowDepthModal") {
            this.setState({ showDepthModalVisible: true })
        }
    }
    closeModal(val) {
        if (val === "COMPLETED") {
            this.setState({
                complatedModalVisible: false,
            });
        }
        //ShowDepthModal
        else if (val === "PENDING") {
            this.setState({ pendingModalVisible: false })
        }
        else if (val === "ShowDepthModal") {
            this.setState({ showDepthModalVisible: false })
        }
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateNavigationButton() {
        const list = document.querySelectorAll('.list');
        function activeLink() {
            list.forEach((item) => {
                let testClass = item.className;
                const testArray = testClass.split(" ");
                if (testArray[1]) {
                    item.classList.remove(testArray[1]);
                    this.classList.add(testArray[1]);
                    // console.log(item.className)
                }
            })
        }
        list.forEach((item) => {
            item.addEventListener('click', activeLink);
        })
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight }, () => {
            console.log(this.state.width + " " + this.state.height)
        });
    }

    onSubmitButtonClick = async () => {
        console.log("clicked");
        var strFromDate = "", strToDate = "", strClient = ""
        strFromDate = document.getElementById("FromDate").value;
        strToDate = document.getElementById("ToDate").value;
        // strClient = document.getElementById("Client").value;
        //console.log(this.state.clientName)
        // alert(strFromDate + " " + strToDate + " " + this.state.clientName)
        if (strFromDate !== "" && strToDate !== "") {
            if (new Date(strFromDate) <= new Date(strToDate)) {
                if (this.state.clientName !== "") {

                    const completedList = await fetchCompletedList(strFromDate, strToDate, this.state.clientName).then(function (result) {
                        console.log(JSON.stringify(result))
                        return result ? result : [];
                    }).catch((err) => { console.log(err) });

                    this.setState({ completedList: completedList }, () => { console.log(this.state.completedList) })
                }
                else {
                    toast.warn("Select Client....")
                }
            }
            else {
                toast.warn("From date not be greater than To date...");
            }
        }
        else {
            toast.warn("Select Valid Date....")
        }


    }
    render() {
        const completedData = this.state.completedList.filter((v, i) => {
            const start = this.state.completedListLimit * (this.state.completedListPage - 1);
            const end = start + this.state.completedListLimit;
            return i >= start && i < end;
        });
        return (
            <div style={{ width: "100%", margin: "0px" }}>
                <ToastContainer />
                <Head>
                    <title>Dashboard</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" />
                    <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css' />

                </Head>
                {/* Main Div for align content in column*/}
                {this.state.width > 768 ? <MDBNavbar fixed='top' style={{ width: '100%', boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px" }} >
                    <div style={{ width: '100%', }}>
                        <div style={{ width: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                            <div><span style={{ fontSize: 20, fontWeight: 'bold', padding: "10px" }}>Profile</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '30px' }}>
                                <div><span style={{ fontSize: 20, fontWeight: 'bold', padding: "10px", paddingLeft: '30px' }}>Dashboard</span></div>
                                <div><span style={{ fontSize: 20, padding: "10px", paddingLeft: '30px' }}>Services</span></div>
                                <div><span style={{ fontSize: 20, padding: "10px", paddingLeft: '30px' }}>Strategies</span></div>
                                <div><span style={{ fontSize: 20, padding: "10px", paddingLeft: '30px' }}>Bill Pay</span></div>
                                <div> <button className='button button4' style={{ padding: '20px', paddingLeft: "20px", paddingRight: "20px", marginLeft: "20px", marginRight: "20px", backgroundColor: 'orange', color: '#FFFFFF', fontWeight: 'bold', border: '0px', cursor: 'pointer', borderRadius: "30px", padding: '7px' }}><span> Logout</span></button></div>
                            </div>
                        </div>
                    </div>

                </MDBNavbar> : <></>}
                <main className={styles.main1} style={{ paddingTop: this.state.width > 768 ? '60px' : '10px', paddingBottom: this.state.width > 768 ? '10px' : '100px' }}>
                    {this.state.dashBoaedPage ?
                        <Dashboard
                            fromDate={this.state.fromDate}
                            todate={this.state.toDate}
                            clientName={this.state.clientName}
                            showToggle={this.state.showToggle}
                            autoSyncToggle={this.state.autoSyncToggle}
                            completedList={this.state.completedList}
                            completedListLimit={this.state.completedListLimit}
                            completedListPage={this.state.completedListPage}
                            pendingList={this.state.pendingList}
                            pendingListPage={this.state.pendingListPage}
                            pendinListLimit={this.state.pendinListLimit}
                            homeCallback={this.handleCallback}
                            clientList={this.state.clientList}
                            openModal={this.openModal}
                            complatedModalVisible={this.state.complatedModalVisible}
                            completedModalArray={this.state.completedModalArray}
                            submitCallBack={this.onSubmitButtonClick}
                        /> : <></>}
                    {this.state.servicePage ? <Services /> : <></>}
                    {this.state.billPayPage ? <BillPay /> : <></>}
                    {this.state.strategyPage ? <Strategies /> : <></>}

                </main>
                {/*End of  Main Div for align content in column*/}
                {
                    this.state.width < 768 ? <MDBFooter className="fixed-bottom" style={{ backgroundColor: '#FFFFFF', paddingLeft: "5px", paddingRight: "5px", paddingBottom: "5px" }}>
                        <div className={styles.navigation} style={{ borderRadius: "20px" }}>
                            <ui onClick={() => { this.updateNavigationButton(); }}>
                                <li className={"list"}>
                                    <a onClick={() => { this.setState({ servicePage: false, dashBoaedPage: false, billPayPage: false, strategyPage: true }) }}>
                                        <span className={styles.icon}>
                                            <PiStrategyBold />
                                        </span>
                                        <span className={styles.text}>Strategies</span>
                                    </a>
                                </li>
                                <li className={"list"}>
                                    <a onClick={() => { this.setState({ servicePage: true, dashBoaedPage: false, billPayPage: false, strategyPage: false }) }} >
                                        <span className={styles.icon}>
                                            <MdOutlineMiscellaneousServices />
                                        </span>
                                        <span className={styles.text}>Services</span>
                                    </a>
                                </li>
                                <li className={"list " + styles.active}>
                                    <a onClick={() => { this.setState({ servicePage: false, dashBoaedPage: true, billPayPage: false, strategyPage: false }) }}>
                                        <span className={styles.icon}>
                                            <MdDashboard />
                                        </span>
                                        <span className={styles.text}>Dashboard</span>
                                    </a>
                                </li>
                                <li className={"list"}>
                                    <a onClick={() => { this.setState({ servicePage: false, dashBoaedPage: false, billPayPage: true, strategyPage: false }) }}>
                                        <span className={styles.icon}>
                                            <FaCcAmazonPay />
                                        </span>
                                        <span className={styles.text}>Bill Pay</span>
                                    </a>
                                </li>
                                <li className={"list"}>
                                    <a >
                                        <span className={styles.icon}>
                                            <MdLogout />
                                        </span>
                                        <span className={styles.text}>Logout</span>
                                    </a>
                                </li>
                                <div className={styles.indicator}></div>
                            </ui>
                        </div>

                    </MDBFooter> : <></>
                }
            </div>

        )
    }
}
export default Home;



