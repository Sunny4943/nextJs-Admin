'use client'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React from "react";
import { PiStrategyBold } from "react-icons/pi"
import { MdDashboard, MdLogout, MdOutlineMiscellaneousServices } from "react-icons/md"
import { FaCcAmazonPay } from "react-icons/fa"
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBFooter, MDBNavbar } from '../../node_modules/mdb-react-ui-kit';
import Dashboard from './home/dashboard';
import Strategies from './home/strategies';
import Services from './home/services';
import BillPay from './home/billPay';
import Subscribe_User from './home/subscribeUser';
import { store } from '../../src/store'
import * as Action from '../../src/actions'
import Router from 'next/router'
import { Popover, Whisper, Button } from "rsuite";
import { fetchCompletedList, fetchPendingList, wait, fetchOnCompletedRowClick, fetchClientList, fetchALLCLient } from '../../src/admin/supportFunction'

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
            completedListRowArray: [], completedListRowLimit: 10, completedListRowPage: 1, RealisedPNL: 0, UnRealisedPNL: 0,
            pendingListRowArray: [], pendingListRowLimit: 10, pendingListRowPage: 1, NetPNL: 0, comletedRowTotalPNL: 0, pendingRowTotalPNL: 0,
            isLoading: false, SubscribePage: false, clientdetails: []
        }
        this.fetchClientName();
        this.fetchAllClientDetails();
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
            var tempArray = [];
            tempArray[0] = { "StrategyName": list }
            this.setState({
                pendingModalVisible: true, pendingModalArray: tempArray
            });
            //this.setState({ : true })
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
                this.classList.add(styles.active);
                item.classList.remove(styles.active);
                this.classList.add(styles.active);
                /* if (testArray[1]) {
                     // this.classList.add(testArray[1]);
                     item.classList.remove(testArray[1]);
                     this.classList.add(testArray[1]);
                     // console.log(item.className)
                 }*/
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
    onPendingRowClick = async (strategy) => {
        //console.log(strategy)
        var tempNetPNL = 0;
        if (strategy) {
            const pendingList = await fetchOnCompletedRowClick(strategy).then(function (result) {
                console.log(JSON.stringify(result))
                return result ? result : [];
            }).catch((err) => { console.log(err) });

            if (pendingList) {
                for (var i = 0; i < pendingList.length; i++) {
                    tempNetPNL = parseInt(tempNetPNL) + parseInt(pendingList[i]['Net'])
                }
                console.log((tempNetPNL))
            }
            this.setState({ pendingListRowArray: pendingList, pendingRowTotalPNL: (tempNetPNL.toFixed(2)) }, () => {
                console.log(this.state.pendingListRowArray)
            })
        }
    }
    onCompletedRowClick = async (strategy) => {

        var tempNetPNL = 0;
        if (strategy) {
            const completedList = await fetchOnCompletedRowClick(strategy).then(function (result) {
                console.log(JSON.stringify(result))
                return result ? result : [];
            }).catch((err) => { console.log(err) });

            if (completedList) {
                for (var i = 0; i < completedList.length; i++) {
                    tempNetPNL = parseInt(tempNetPNL) + parseInt(completedList[i]['Net'])
                }
                console.log((tempNetPNL))
            }
            this.setState({ completedListRowArray: completedList, comletedRowTotalPNL: (tempNetPNL.toFixed(2)) })
        }
    }
    fetchAllClientDetails = async () => {
        const clntdetails = await fetchALLCLient().then(function (result) {
            // console.log(JSON.stringify(result))
            return result ? result : [];
        }).catch((err) => { console.log(err) });
        this.setState({ clientdetails: clntdetails })

    }
    fetchClientName = async () => {
        const clntList = await fetchClientList().then(function (result) {
            console.log(JSON.stringify(result))
            return result ? result : [];
        }).catch((err) => { console.log(err) });
        var tempArray = [{ label: 'ALL', value: 'ALL' }];
        if (clntList) {
            clntList.map((data) => {
                tempArray.push({ label: data["ClientName"] + " - " + data['ClientCode'], value: data['ClientCode'] })
            })
        }
        this.setState({
            clientList: tempArray
        })
    }
    onSubmitButtonClick = async () => {
        this.setState({ isLoading: true })
        var tempUnRePNL = 0, tempRePNL = 0, tempNetPNL = 0;
        var tempRElquantity = 0;
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
                    if (completedList) {
                        for (var i = 0; i < completedList.length; i++) {
                            tempRePNL = parseFloat(tempRePNL) + ((parseInt(completedList[i]['SellQty']) * parseFloat(completedList[i]['SellPrice']).toFixed(2)) - (parseInt(completedList[i]['SellQty']) * parseFloat(completedList[i]['BuyPrice']).toFixed(2)));
                            // tempNetPNL = tempNetPNL + parseInt(completedList[i]['Net'])
                            if ((parseInt(completedList[i]['BuyQty'])) > (parseInt(completedList[i]['SellQty']))) {
                                tempUnRePNL = parseFloat(tempUnRePNL) + ((parseInt(completedList[i]['Quantity']) * parseFloat(completedList[i]['LTP']).toFixed(2)) - (parseInt(completedList[i]['Quantity']) * parseFloat(completedList[i]['BuyPrice']).toFixed(2)));
                            }
                            else {
                                tempUnRePNL = parseFloat(tempUnRePNL) + ((parseInt(completedList[i]['Quantity']) * parseFloat(completedList[i]['SellPrice']).toFixed(2)) - (parseInt(completedList[i]['Quantity']) * parseFloat(completedList[i]['LTP']).toFixed(2)));
                            }

                        }
                        // console.log(JSON.stringify(completedList))
                    }

                    this.setState({ completedList: completedList, RealisedPNL: (tempRePNL.toFixed(2)), UnRealisedPNL: (tempUnRePNL.toFixed(2)) }, () => { console.log(this.state.completedList) })
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

        this.setState({ isLoading: false })
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
            store.dispatch(Action.default.login({ login: false, userName: "", subscriptionExpiry: "", userCode: "" }));
            Router.router.push("/")
            localStorage.setItem('token', JSON.stringify(""))
        }

    }
    render() {

        /*const completedData = this.state.completedList.filter((v, i) => {
            const start = this.state.completedListLimit * (this.state.completedListPage - 1);
            const end = start + this.state.completedListLimit;
            return i >= start && i < end;
        });*/
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
                            <div style={{ cursor: 'pointer' }}>
                                <Whisper
                                    //followCursor
                                    trigger="click"
                                    placement="bottomStart"
                                    speaker={
                                        <Popover arrow={false} ><div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'space-between' }}>
                                            <div onClick={() => { this.setState({ SubscribePage: true, servicePage: false, dashBoaedPage: false, billPayPage: false, strategyPage: false, }, () => { console.log(this.state.SubscribePage) }) }}><span style={{ color: "#333", fontWeight: 'bold', fontSize: 20, padding: '10px', cursor: 'pointer' }} onClick={() => { this.setState({ SubscribePage: true }) }}>Subscribe User</span></div>
                                            <div onClick={() => { this.logout() }}><span style={{ color: "#333", fontWeight: 'bold', fontSize: 20, padding: '10px', cursor: 'pointer' }}>Logout</span></div>
                                        </div></Popover>
                                    }
                                >
                                    <span style={{ fontSize: 20, fontWeight: 'bold', padding: "10px" }}>Hello Admin</span>
                                </Whisper>

                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '30px' }}>
                                <div><span style={{ fontSize: 20, fontWeight: 'bold', padding: "10px", paddingLeft: '30px' }}>Dashboard</span></div>
                                <div><span style={{ fontSize: 20, padding: "10px", paddingLeft: '30px' }}>Services</span></div>
                                <div><span style={{ fontSize: 20, padding: "10px", paddingLeft: '30px' }}>Strategies</span></div>
                                <div><span style={{ fontSize: 20, padding: "10px", paddingLeft: '30px' }}>Bill Pay</span></div>
                                <div> <button className='button button4' style={{ padding: '20px', paddingLeft: "20px", paddingRight: "20px", marginLeft: "20px", marginRight: "20px", backgroundColor: 'orange', color: '#FFFFFF', fontWeight: 'bold', border: '0px', cursor: 'pointer', borderRadius: "30px", padding: '7px' }} onClick={() => { this.logout() }}><span> Logout</span></button></div>
                            </div>
                        </div>
                    </div>

                </MDBNavbar> : <></>}
                <main className={styles.main1} style={{ paddingTop: this.state.width > 768 ? '60px' : '10px', paddingBottom: this.state.width > 768 ? '10px' : '100px' }}>
                    {this.state.dashBoaedPage ?
                        <Dashboard
                            homeCallback={this.handleCallback}
                            openModal={this.openModal}
                            state={this.state}
                            submitCallBack={this.onSubmitButtonClick}
                            completedRowClick={this.onCompletedRowClick}
                            pendingRowClick={this.onPendingRowClick}
                        /> : <></>}
                    {this.state.servicePage ? <Services /> : <></>}
                    {this.state.billPayPage ? <BillPay /> : <></>}
                    {this.state.strategyPage ? <Strategies /> : <></>}
                    {this.state.SubscribePage ? <Subscribe_User state={this.state} /> : <></>}

                </main>
                {/*End of  Main Div for align content in column*/}
                {
                    this.state.width < 768 ? <MDBFooter className="fixed-bottom" style={{ backgroundColor: '#FFFFFF', paddingLeft: "5px", paddingRight: "5px", paddingBottom: "5px" }}>
                        <div className={styles.navigation} style={{ borderRadius: "20px" }}>
                            <ui onClick={() => { this.updateNavigationButton(); }}>
                                <li className={"list"}>
                                    <a onClick={() => { this.setState({ servicePage: false, dashBoaedPage: false, billPayPage: false, strategyPage: true, SubscribePage: false }) }}>
                                        <span className={styles.icon}>
                                            <PiStrategyBold />
                                        </span>
                                        <span className={styles.text}>Strategies</span>
                                    </a>
                                </li>
                                <li className={"list"}>
                                    <a onClick={() => { this.setState({ servicePage: true, dashBoaedPage: false, billPayPage: false, strategyPage: false, SubscribePage: false }) }} >
                                        <span className={styles.icon}>
                                            <MdOutlineMiscellaneousServices />
                                        </span>
                                        <span className={styles.text}>Services</span>
                                    </a>
                                </li>
                                <li className={"list " + styles.active}>
                                    <a onClick={() => { this.setState({ servicePage: false, dashBoaedPage: true, billPayPage: false, strategyPage: false, SubscribePage: false }) }}>
                                        <span className={styles.icon}>
                                            <MdDashboard />
                                        </span>
                                        <span className={styles.text}>Dashboard</span>
                                    </a>
                                </li>
                                <li className={"list"}>
                                    <a onClick={() => { this.setState({ servicePage: false, dashBoaedPage: false, billPayPage: true, strategyPage: false, SubscribePage: false }) }}>
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
            </div >

        )
    }
}
export default Home;



