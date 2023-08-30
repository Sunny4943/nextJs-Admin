'use client'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React from "react";
import { PiStrategyBold } from "react-icons/pi"
import { IoIosMenu } from "react-icons/io"
import { MdAdd, MdClose, MdDashboard, MdDone, MdLogout, MdOutlineMiscellaneousServices, MdRemove } from "react-icons/md"
import { FaCcAmazonPay } from "react-icons/fa"
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBFooter, MDBNavbar } from '../../node_modules/mdb-react-ui-kit';
import Dashboard from './client_Compoenent/dashboard';
import Strategies from './client_Compoenent/strategies';
import Services from './client_Compoenent/services';
import BillPay from './client_Compoenent/billPay';
import EditCLient from './client_Compoenent/edit';
import ChangePasswordPage from './client_Compoenent/changePassword';
import { fetchCompletedList, fetchPendingList, wait, fetchOnCompletedRowClick, updateClientSubscription, fethClientDetails } from '../../src/admin/supportFunction'
import { store } from '../../src/store'
import * as Action from '../../src/actions'
import Router from 'next/router'
import { Popover, Whisper, Modal, Pagination, Input, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const CompactCell = props => <Cell wordWrap='keep-all' {...props} style={{ padding: 6, fontWeight: 'bold' }} />;
var loginStoreValue = store.getState()
console.log(loginStoreValue)
if (typeof window !== 'undefined') {
    const { localStorage, sessionStorage } = window;
    var testStore = localStorage.getItem("ReduxStore") ? JSON.parse(localStorage.getItem("ReduxStore")) : []
    // console.log(JSON.parse(localStorage.getItem("ReduxStore")))
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        //console.log(loginStoreValue["auth"]["subscriptionExpiry"])
        this.state = {
            profileName: testStore["auth"]["userName"] ? testStore["auth"]["userName"] : "", subsExpiry: testStore["auth"]["subscriptionExpiry"] ? testStore["auth"]["subscriptionExpiry"] : "",
            clientCode: testStore["auth"]["userCode"] ? testStore["auth"]["userCode"] : "",
            complatedModalVisible: false, pendingModalVisible: false, showDepthModalVisible: false,
            showToggle: false, autoSyncToggle: false,
            pendingList: [], pendinListLimit: 5, pendingListPage: 1
            , completedList: [], completedListLimit: 5, completedListPage: 1,
            width: 0, height: 0, completedModalArray: [],
            pendingModalArray: [], fromDate: new Date(), toDate: new Date(), clientList: [{ label: 'ALL', value: 'ALL' }],
            clientName: "", dashBoardPage: true, strategyPage: false, servicePage: false, billPayPage: false,
            completedListRowArray: [], completedListRowLimit: 10, completedListRowPage: 1, RealisedPNL: 0, UnRealisedPNL: 0,
            pendingListRowArray: [], pendingListRowLimit: 10, pendingListRowPage: 1, NetPNL: 0, comletedRowTotalPNL: 0, pendingRowTotalPNL: 0,
            isLoading: false, subscribeModal: false, clientDetails: [], profileModal: false, changeSubscription: false,
            clientCurMonPos: parseInt(new Date(testStore["auth"]["subscriptionExpiry"]).getMonth() - new Date().getMonth()),
            editPage: false, changePWDPage: false
        }
        // this.fetchClientName();
        this.fetchClientDetail()
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
        // this.setState({ profileName: testStore["auth"]["userName"], subsExpiry: testStore["auth"]["userName"], clientCode: store.getState().auth.userCode })
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        // this.setState({ profileName: loginStoreValue["auth"]["userName"], subsExpiry: loginStoreValue["auth"]["subscriptionExpiry"], clientCode: store.getState().auth.userCode })
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateNavigationButton() {
        const list = document.querySelectorAll('.list');
        function activeLink() {
            list.forEach((item) => {
                let testClass = item.className;
                const testArray = testClass.split(" ");
                if (testArray[1]) {
                    // this.classList.add(testArray[1]);
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
    fetchClientDetail = async () => {
        const clntdetails = await fethClientDetails(this.state.clientCode).then(function (result) {
            //console.log(JSON.stringify(result))
            return result ? result : [];
        }).catch((err) => { console.log(err) });
        if (clntdetails) {
            for (var i = 0; i < clntdetails.length; i++) {
                this.state.clientDetails.push({ Userid: clntdetails[i]['Userid'], subscribed: (new Date(clntdetails[i]['SubscriptionExpiry']) < new Date()) ? 0 : 1, month: parseInt(new Date(clntdetails[i]['SubscriptionExpiry']).getMonth() - new Date().getMonth()), expiry: clntdetails[i]['SubscriptionExpiry'] })
            }
        }
    }
    onChangeSubscriptionMonth = async (type, clientId) => {
        if (type === "INCREASE") {
            this.setState({ changeSubscription: true })
            for (var i = 0; i < this.state.clientDetails.length; i++) {
                if (this.state.clientDetails[i]['Userid'] === clientId) {
                    // clientdata[i]['expiry'] = new Date(new Date(clientdata[i]['expiry']).getMonth() + 1)
                    var tempdate = new Date(this.state.clientDetails[i]['expiry']);
                    // tempdate.setMonth(tempdate.getMonth() + 1);
                    this.state.clientDetails[i]['expiry'] = tempdate.setMonth(tempdate.getMonth() + 1);
                    this.state.clientDetails[i]['month'] = parseInt(this.state.clientDetails[i]['month']) + 1
                    if (parseInt(this.state.clientDetails[i]['month']) > 0) {
                        this.state.clientDetails[i]['subscribed'] = 1
                    }
                    else {
                        this.state.clientDetails[i]['subscribed'] = 0
                    }

                    break;
                }
            }
        } else if (type = "DECREASE") {
            this.setState({ changeSubscription: true })
            for (var i = 0; i < this.state.clientDetails.length; i++) {
                if (this.state.clientDetails[i]['Userid'] === clientId) {
                    // clientdata[i]['expiry'] = new Date(new Date(clientdata[i]['expiry']).getMonth() + 1)
                    if (parseInt(this.state.clientCurMonPos) < parseInt(this.state.clientDetails[i]['month'])) {
                        var tempdate = new Date(this.state.clientDetails[i]['expiry']);
                        // tempdate.setMonth(tempdate.getMonth() + 1);
                        this.state.clientDetails[i]['expiry'] = tempdate.setMonth(tempdate.getMonth() - 1);
                        this.state.clientDetails[i]['month'] = parseInt(this.state.clientDetails[i]['month']) - 1
                        if (parseInt(this.state.clientDetails[i]['month']) > 0) {
                            this.state.clientDetails[i]['subscribed'] = 1
                        }
                        else {
                            this.state.clientDetails[i]['subscribed'] = 0
                        }

                        break;
                    }
                    else {
                        toast.warn("Can not decrease month from current Position.")
                    }
                }
            }
        }
    }
    onUpdateSubscription = async () => {
        var expiry = new Date(this.state.clientDetails[0]["expiry"]).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
        const updateClnt = await updateClientSubscription(this.state.clientCode, expiry)
        if (updateClnt.toString().includes("2")) {
            // if (parseInt(new Date(this.state.clientDetails[0]["expiry"]).getMonth()) > parseInt(new Date(this.state.clientCurMonPos).getMonth())) {
            toast.success("Successfully Updated....")
            //}
            store.dispatch(Action.default.login({ login: true, userName: this.state.profileName, subscriptionExpiry: expiry, userCode: this.state.clientCode }));
            store.subscribe(() => {
                saveState(store.getState());
            })
            setTimeout(() => window.location.reload(), 150);
        }

    }
    /* fetchClientName = async () => {
         const clntList = await fetchClientList().then(function (result) {
             console.log(JSON.stringify(result))
             return result ? result : [];
         }).catch((err) => { console.log(err) });
         var tempArray = [{ label: 'ALL', value: 'ALL' }];
         if (clntList) {
             clntList.map((data) => {
                 //tempArray.push({ label: data['ClientCode'] + "-" + data['ClientName'], value: data['ClientCode'] })
                 tempArray.push({ label: data['ClientName'], value: data['ClientCode'] })
             })
         }
         this.setState({
             clientList: tempArray
         })
     }*/
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
                if (this.state.clientCode !== "") {

                    const completedList = await fetchCompletedList(strFromDate, strToDate, this.state.clientCode).then(function (result) {
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
                    console.log("Rpnl=> " + tempRePNL + " " + "URpnl=> " + tempUnRePNL)
                    this.setState({ completedList: completedList, RealisedPNL: (tempRePNL.toFixed(2)), UnRealisedPNL: (tempUnRePNL.toFixed(2)) }, () => { console.log(this.state.completedList) })
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
            localStorage.setItem('token', JSON.stringify(""))
            Router.router.push("/")
            Router.reload()

        }

    }
    render() {
        const completedData = this.state.completedList.filter((v, i) => {
            const start = this.state.completedListLimit * (this.state.completedListPage - 1);
            const end = start + this.state.completedListLimit;
            return i >= start && i < end;
        });
        const lang = navigator.language || navigator.languages[0];
        var options = {
            day: "2-digit",
            year: "numeric",
            month: "short",
            //hour: "2-digit",
            //minute: "2-digit",
            //second: "2-digit",
        }
        if (this.state.changeSubscription) {
            setInterval(() => {
                if (this.state.changeSubscription) {
                    this.setState({ clientDetails: this.state.clientDetails, clientCurMonPos: parseInt(new Date(testStore["auth"]["subscriptionExpiry"]).getMonth() - new Date().getMonth()), changeSubscription: false }, () => { console.log(this.state.clientCurMonPos) });
                }
            }, 1000);
        }

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
                {/* Main Div for align content in column */}
                {this.state.width > 768 ? <MDBNavbar fixed='top' style={{ width: '100%', boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px" }} >
                    <div style={{ width: '100%', }}>
                        <div className={styles.header} style={{ width: 'auto', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <Whisper
                                //followCursor
                                // delayClose={true}
                                open={this.state.profileModal}
                                trigger="click"
                                placement="bottomStart"
                                // style={{ margin: "5px" }}
                                speaker={
                                    <Popover arrow={false} style={{ marginLeft: "5px" }} ><div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'space-between' }}>
                                        <div onClick={() => { this.setState({ subscribeModal: true, profileModal: false }, () => { console.log(this.state.subscribeModal) }) }}><span style={{ color: "#333", fontWeight: 'bold', fontSize: 18, padding: '10px', cursor: 'pointer' }} onClick={() => { this.setState({ subscribeModal: true }) }}>Subscribe </span></div>
                                        {<div onClick={() => {
                                            this.setState({ editPage: true, dashBoardPage: false, servicePage: false, billPayPage: false, strategyPage: false, profileModal: false, changePWDPage: false }); window.scroll(0, 0)
                                        }}><span style={{ color: "#333", fontWeight: 'bold', fontSize: 18, padding: '10px', cursor: 'pointer' }}>Edit Profile</span></div>}
                                        <div onClick={() => {
                                            this.setState({ editPage: false, dashBoardPage: false, servicePage: false, billPayPage: false, strategyPage: false, profileModal: false, changePWDPage: true }); window.scroll(0, 0)
                                        }}><span style={{ color: "#333", fontWeight: 'bold', fontSize: 18, padding: '10px', cursor: 'pointer' }}>Change Password</span></div>
                                        <div onClick={() => { this.logout() }}><span style={{ color: "#333", fontWeight: 'bold', fontSize: 20, padding: '10px', cursor: 'pointer' }}>Logout</span></div>
                                    </div></Popover>
                                }
                            >

                                <span className={styles.header_profile} style={{ fontSize: 20, fontWeight: 'bold', padding: "10px", curosr: 'pointer' }} onClick={() => { this.setState({ profileModal: !(this.state.profileModal) }) }}>Hello {this.state.profileName}</span>
                            </Whisper>
                            <Modal overflow={false} size="lg" height="90%" open={this.state.subscribeModal} onClose={() => { this.setState({ subscribeModal: false }) }} >
                                <Modal.Header style={{ padding: '0px', margin: "0px", width: '100%' }}>
                                    <Modal.Title style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        Subscribe
                                    </Modal.Title>
                                    <hr style={{ background: '#ACACAC', color: '#ACACAC', borderColor: '#ACACAC', height: '1px', padding: '0px', margin: "3px", witdh: '100%' }} />
                                </Modal.Header>
                                <Modal.Body style={{ padding: '0px', margin: "0px", width: "100%", height: "100%" }}>
                                    <div style={{ width: "auto", height: "auto" }}>
                                        <Table height={200} data={this.state.clientDetails} hover={true} virtualized onRowClick={(rowData, rowIndex) => {
                                            // console.log(rowIndex);
                                        }}
                                            rowClassName={(rowData) => {
                                                return rowData ? styles.rs_table_row_pending : "";
                                            }}
                                            bordered cellBordered rowHeight={38}

                                        >
                                            <Column width={this.state.width > 600 ? 'auto' : 250} flexGrow={this.state.width > 600 ? 1 : 0} resizable>
                                                <HeaderCell wordWrap='keep-all' align="left" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Subscription Date</HeaderCell>
                                                <Cell align="left" style={{ color: "#333", fontWeight: 'bold' }}>
                                                    {rowData =>
                                                        <span style={{ color: new Date(rowData.expiry) < new Date() ? "red" : "green" }}>{new Date(rowData.expiry).toLocaleString(lang, options)}</span>
                                                    }
                                                </Cell>
                                            </Column>
                                            <Column width={this.state.width > 600 ? 'auto' : 120} flexGrow={this.state.width > 600 ? 2 : 0} resizable>
                                                <HeaderCell wordWrap='keep-all' align="center" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Increase Subscription (In Months)</HeaderCell>
                                                <Cell align="center" style={{ color: "#333", fontWeight: 'bold', cursor: 'pointer', padding: '5px' }}>
                                                    {rowData =>
                                                        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-around" }}>
                                                            <div><span style={{ padding: '5px' }} onClick={() => { this.onChangeSubscriptionMonth('DECREASE', rowData.Userid) }} aria-disabled ><MdRemove style={{ color: 'red', fontSize: 30, fontWeight: 'bold' }} /></span></div>
                                                            <div><span style={{ padding: '5px', color: "#333", fontSize: 20, fontWeight: 'bold' }} >{parseInt(rowData.month)}</span></div>
                                                            <div><span style={{ padding: '5px' }} onClick={() => { this.onChangeSubscriptionMonth('INCREASE', rowData.Userid) }}><MdAdd style={{ color: 'green', fontSize: 30, fontWeight: 'bold' }} /></span></div>
                                                        </div>

                                                    }
                                                </Cell>
                                            </Column>

                                            <Column width={this.state.width > 600 ? 'auto' : 200} flexGrow={this.state.width > 600 ? 1 : 0} resizable >
                                                <HeaderCell wordWrap='keep-all' style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Subscribed</HeaderCell>
                                                {/* <Cell dataKey="StrategyCode" style={{ color: "#333", fontWeight: 'bold', fontSize: 18 }} />*/}
                                                <Cell align="left" style={{ color: "#333", fontWeight: 'bold', padding: '5px' }}>
                                                    {rowData =>
                                                        <span style={{ width: "100%", height: '100%', padding: '5px' }}>{rowData.subscribed ? <MdDone style={{ color: 'green', fontSize: 30, fontWeight: 'bold' }} /> : <MdClose style={{ color: 'red', fontSize: 30, fontWeight: 'bold' }} />}</span>
                                                    }
                                                </Cell>
                                            </Column>

                                            <Column width={this.state.width > 600 ? 'auto' : 'auto'} flexGrow={this.state.width > 600 ? 1 : 2} resizable>
                                                <HeaderCell wordWrap='keep-all' align="center" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Action</HeaderCell>
                                                <Cell align="center" style={{ color: "#333", fontWeight: 'bold', padding: '7px' }}>
                                                    {rowData =>
                                                        <span style={{ padding: '20px', paddingLeft: "15px", paddingRight: "15px", backgroundColor: 'orange', color: '#FFFFFF', fontWeight: 'bold', border: '0px', cursor: 'pointer', borderRadius: "30px", padding: '7px' }} onClick={() => { this.onUpdateSubscription() }}>Update</span>
                                                    }
                                                </Cell>
                                            </Column>

                                        </Table>
                                    </div>

                                </Modal.Body>
                                {/* <Modal.Footer style={{ padding: '0px', margin: "0px" }}>
                                    <hr style={{ background: '#ACACAC', color: '#ACACAC', borderColor: '#ACACAC', height: '1px', padding: '0px', margin: "3px", witdh: '100%' }} color='red' />
                                    <div style={{ width: 'auto', display: 'flex', justifyContent: 'flex-end', paddingRight: "30px" }}>
                                        <div><span style={{ color: "#333", fontWeight: 'bold', fontSize: 18 }}>Total : </span><span style={{ color: parseInt(this.props.state.pendingRowTotalPNL) > 0 ? 'green' : 'red', fontWeight: 'bold', fontSize: 18 }}>{this.props.state.pendingRowTotalPNL}</span></div>
                                    </div>
                            </Modal.Footer>*/}
                            </Modal>

                            {((new Date(this.state.subsExpiry)) < (new Date())) ? < div >
                                <marquee width="auto" direction="left" height="auto">
                                    <span style={{ color: "red", fontWeight: 'bold', fontSize: 20 }}>Subscription Expired !!!</span>
                                </marquee>
                            </div> : <></>/*((new Date(this.state.subsExpiry).getDate()) === (new Date().getDate()) ?
                                < div >
                                    <marquee width="auto" direction="left" height="auto">
                                        <span style={{ color: "red", fontWeight: 'bold', fontSize: 20 }}>Subscription Expired  Today!!!</span>
                                    </marquee>
                            </div> : <></>)*/}
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '30px' }}>
                                <div><span onClick={() => { this.setState({ editPage: false, dashBoardPage: true, servicePage: false, billPayPage: false, strategyPage: false, changePWDPage: false, profileModal: false }) }} style={{ fontSize: 20, fontWeight: 'bold', padding: "10px", paddingLeft: '30px' }}>Dashboard</span></div>
                                <div><span style={{ fontSize: 20, padding: "10px", paddingLeft: '30px' }}>Services</span></div>
                                <div><span style={{ fontSize: 20, padding: "10px", paddingLeft: '30px' }}>Strategies</span></div>
                                <div><span style={{ fontSize: 20, padding: "10px", paddingLeft: '30px' }}>Bill Pay</span></div>
                                <div> <button className='button button4' style={{ padding: '20px', paddingLeft: "20px", paddingRight: "20px", marginLeft: "20px", marginRight: "20px", backgroundColor: 'orange', color: '#FFFFFF', fontWeight: 'bold', border: '0px', cursor: 'pointer', borderRadius: "30px", padding: '7px' }} onClick={() => { this.logout() }}><span> Logout</span></button></div>
                            </div>
                        </div>
                    </div>

                </MDBNavbar> : <div className={styles.header} style={{ width: 'auto', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div>
                        {<span className={styles.header_profile} style={{ fontSize: 20, fontWeight: 'bold', padding: "10px", curosr: 'pointer' }} onClick={() => { this.setState({ profileModal: !(this.state.profileModal) }) }}><IoIosMenu /></span>}</div>
                </div>
                }
                <main className={styles.main1} style={{ paddingTop: this.state.width > 768 ? '60px' : '10px', paddingBottom: this.state.width > 768 ? '10px' : '100px' }}>
                    {this.state.dashBoardPage ?
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
                    {this.state.editPage ? <EditCLient state={this.state} /> : <></>}
                    {this.state.changePWDPage ? <ChangePasswordPage state={this.state} /> : <></>}

                </main>
                {/*End of  Main Div for align content in column*/}
                {
                    this.state.width < 768 ? <MDBFooter className="fixed-bottom" style={{ backgroundColor: '#FFFFFF', paddingLeft: "5px", paddingRight: "5px", paddingBottom: "5px" }}>
                        <div className={styles.navigation} style={{ borderRadius: "20px" }}>
                            <ui onClick={() => { this.updateNavigationButton(); }}>
                                <li className={"list"}>
                                    <a onClick={() => { this.setState({ servicePage: false, dashBoardPage: false, billPayPage: false, strategyPage: true, editPage: false, changePWDPage: false }) }}>
                                        <span className={styles.icon}>
                                            <PiStrategyBold />
                                        </span>
                                        <span className={styles.text}>Strategies</span>
                                    </a>
                                </li>
                                <li className={"list"}>
                                    <a onClick={() => { this.setState({ servicePage: true, dashBoardPage: false, billPayPage: false, strategyPage: false, editPage: false, changePWDPage: false }) }} >
                                        <span className={styles.icon}>
                                            <MdOutlineMiscellaneousServices />
                                        </span>
                                        <span className={styles.text}>Services</span>
                                    </a>
                                </li>
                                <li className={"list " + styles.active}>
                                    <a onClick={() => { this.setState({ servicePage: false, dashBoardPage: true, billPayPage: false, strategyPage: false, editPage: false, changePWDPage: false }) }}>
                                        <span className={styles.icon}>
                                            <MdDashboard />
                                        </span>
                                        <span className={styles.text}>Dashboard</span>
                                    </a>
                                </li>
                                <li className={"list"}>
                                    <a onClick={() => { this.setState({ servicePage: false, dashBoardPage: false, billPayPage: true, strategyPage: false, editPage: false, changePWDPage: false }) }}>
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


