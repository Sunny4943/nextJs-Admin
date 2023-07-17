'use client'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react";
//import 'react-responsive-combo-box/dist/index.css'
import { PiStrategyBold } from "react-icons/pi"
import { MdDashboard, MdLogout, MdOutlineMiscellaneousServices } from "react-icons/md"
import { FaCcAmazonPay } from "react-icons/fa"
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch } from 'evergreen-ui';
//import { Table } from 'evergreen-ui'
import { Checkbox } from 'evergreen-ui'
import { MDBFooter, MDBNavbar } from '../node_modules/mdb-react-ui-kit';
import { Modal, Toggle, Button, ButtonToolbar, Placeholder, Pagination } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { Table } from "rsuite";
//import * as fun1 from './module/supportFunction'
//import { fetchCompletedList, fetchPendingList, wait } from '../src/admin/supportFunction'
import { DatePicker, InputPicker } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
class Dashboard1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complatedModalVisible: false, pendingModalVisible: false, showDepthModalVisible: false,
      showToggle: false, autoSyncToggle: false,
      pendingList: [], pendinListLimit: 5, pendingListPage: 1
      , completedList: [], completedListLimit: 5, completedListPage: 1,
      width: 0, height: 0, completedModalArray: [],
      pendingModalArray: [], fromDate: new Date(), toDate: new Date(), clientList: [{ label: 'ALL', value: 'ALL' }],
      clientName: ""
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateNavigationButton = this.updateNavigationButton.bind(this);
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

  fetchCompletedList = async (fromDate, toDate, Client) => {
    var completedList = [];
    let tempQuery = ""
    var fromDate1 = new Date(fromDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    var toDate1 = new Date(toDate).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let strClient = Client
    if (strClient.match("ALL")) {
      tempQuery = "select st.ClientCode as ClientID,st.StrategyCode, Max(FillQuantity) as Quantity,SUM(case when BuySellIndicator=1 then FillQuantity*(1) else FillQuantity*(-1) end)as Net from TRADE_CONFIRM as tc left join ScriptTrans as st on tc.Token = st.Token where cast(tc.InsertTime as DATE) >= '" + fromDate1 + "' and cast(tc.InsertTime as DATE) <= '" + toDate1 + "' group by st.StrategyCode,st.ClientCode order by st.ClientCode,st.StrategyCode";
    }
    else {
      console.log("Not Found....");
    }
    completedList = await fetch('/api/ctcl_strategyquery', {
      // completedList = await fetch('https://335b-103-221-76-177.ngrok-free.app/api/ctcl_strategyquery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: tempQuery, type: "select" }),
    })
      .then((result) => result.json()) // here
      .then((result) => {
        const tempArray = result['data'];
        return tempArray;

      }).catch((error) => {
        //completedList[1] = false
      });
    console.log(completedList)
    return completedList;
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
    var strFromDate = "", strToDate = "", strClient = ""
    strFromDate = document.getElementById("FromDate").value;
    strToDate = document.getElementById("ToDate").value;
    // strClient = document.getElementById("Client").value;
    //console.log(this.state.clientName)
    // alert(strFromDate + " " + strToDate + " " + this.state.clientName)
    if (strFromDate !== "" && strToDate !== "") {
      if (new Date(strFromDate) <= new Date(strToDate)) {
        if (this.state.clientName !== "") {

          const completedList = await this.fetchCompletedList(strFromDate, strToDate, this.state.clientName).then(function (result) {
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

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {/* First row Div*/}
            <div style={{ width: "100%", padding: "10px" }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: "100%", height: "auto", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 15px 12px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff' }}>
                <div style={{ width: "100%" }}>
                  <div className={styles.legGrid}>
                    <div style={{ width: 'auto', padding: '5px' }}> From Date</div>
                    <div style={{ width: 'auto', padding: '5px' }}>
                      <DatePicker oneTap defaultValue={this.state.fromDate ? this.state.fromDate : new Date()} onChange={(date) => { this.setState({ fromDate: date }) }} format={"dd-MMM-yyyy"} size="sm" style={{ width: "100%" }} placeholder='From Date' id={"FromDate"} name="FromDate" />
                      {/*<input type="text" name={"FromDate"} value={this.state[`Fromrenderthis.Date`] ? this.state[`FromDate`] : new Date().toLocaleDateString('en-GB')} onChange={(e) => this.handleChange(e)} onFocus={(e) => (e.target.type = "date")} format="DD/MM / YYYY" onBlur={(e) => (e.target.type = "text")}></input>*/}
                    </div>
                    <div style={{ width: 'auto', padding: '5px' }}> To Date</div>
                    <div style={{ width: 'auto', padding: '5px' }}>
                      <DatePicker oneTap defaultValue={this.state.toDate ? this.state.toDate : new Date()} onChange={(date) => { this.setState({ toDate: date }) }} format={"dd-MMM-yyyy"} size="sm" style={{ width: "100%" }} placeholder='To Date' id={"ToDate"} name="ToDate" />
                      {/*<input type="text" name={"ToDate"} value={this.state[`ToDate`] ? this.state[`ToDate`] : new Date().toLocaleDateString('en-GB')} onChange={(e) => this.handleChange(e)} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}></input>*/}
                    </div>
                    <div style={{ width: 'auto', padding: '5px' }}> Client</div>
                    <div style={{ width: 'auto', padding: '5px' }}>
                      <InputPicker value={this.state.clientName ? this.state.clientName : ""} onSelect={(value) => { this.setState({ clientName: value }) }} onChange={(value) => { this.setState({ clientName: value }) }} size="sm" placeholder="Client" id={"Client"} style={{ width: "100%" }} data={this.state.clientList} />
                      {/* <input type='text' style={{ width: "100%" }} ></input>*/}
                    </div>
                    <div style={{ width: 'auto', padding: "5px", height: 'auto' }}>
                      <button className='button button4' style={{ backgroundColor: '#1e90ff', paddingTop: '1px', paddingBottom: '1px', borderRadius: '20px', cursor: 'pointer', color: '#ffffff', fontWeight: 'bold', width: "70%" }} onClick={() => this.onSubmitButtonClick()} > <span className={styles.span_Button}>Submit </span></button>
                    </div>
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <div className={styles.legGrid} style={{ padding: "15px" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: "10px", margin: '10px', width: "auto", height: "auto", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                      <div><span style={{ color: '#333', fontWeight: 'bold' }}>UnRealised P/L</span></div>
                      <div>0.00</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: "auto", padding: "10px", margin: '10px', height: "auto", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                      <div><span style={{ color: '#333', fontWeight: 'bold' }}>Realised P/L</span></div>
                      <div>0.00</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: "auto", padding: "10px", margin: '10px', height: "auto", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                      <div><span style={{ color: '#333', fontWeight: 'bold' }}>Net Profit</span></div>
                      <div>0.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End of first Row Div*/}
            {/*Switch Button Div */}
            <div style={{ width: "100%" }}>
              <div style={{ display: 'flex', flexDirection: 'row', width: 'auto', paddingTop: '10px', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
                  <div style={{ paddingRight: '10px' }}><Switch checked={this.state.showToggle} onChange={(e) => { this.setState({ showToggle: !(this.state.showToggle) }) }}></Switch></div>
                  <div>Show</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
                  <div style={{ paddingRight: '10px' }}><Switch checked={this.state.autoSyncToggle} onChange={() => { this.setState({ autoSyncToggle: !(this.state.autoSyncToggle) }) }}></Switch></div>
                  <div>Auto Sync</div>
                </div>

              </div>
            </div>
            {/*end of Switch Button Div */}
            {/*pending Table div */}
            <div style={{ width: "100%" }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'auto', }}>
                <div style={{ padding: '10px', paddingTop: '2px' }}><span style={{ color: '#333', fontWeight: 'bold' }}>Currently Running</span></div>
                <div style={{ padding: '10px', paddingTop: '1px', width: '100%' }}>
                  <div>
                    <Table height={180} data={completedData} onRowClick={(rowData, dataKey) => {
                      console.log(rowData);

                    }}>
                      <Column width="auto" flexGrow={2} resizable>
                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Client Id</HeaderCell>
                        <Cell dataKey="ClientID" />
                      </Column>

                      <Column width="auto" flexGrow={2} resizable>
                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Strategy Name</HeaderCell>
                        <Cell dataKey="StrategyCode" />
                      </Column>

                      <Column width="auto" flexGrow={1} resizable>
                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>QTY</HeaderCell>
                        <Cell dataKey="Quantity" />
                      </Column>

                      <Column width="auto" flexGrow={1} resizable>
                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Profit/LOSS</HeaderCell>
                        <Cell>
                          {rowData =>
                            <span style={{ color: parseInt(rowData.Net) > 0 ? "green" : "red" }}>{rowData.Net}</span>
                          }
                        </Cell>
                      </Column>
                      <Column width="auto" flexGrow={2} resizable >
                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", alignContent: 'start', wordWrap: "break-word" }}><span style={{ width: "100%", padding: '5px', paddingLeft: "4px", paddingRight: "4px", marginLeft: "5px", marginRight: "5px", backgroundColor: 'orange', color: '#FFFFFF', fontWeight: 'bold', border: '0px', cursor: 'pointer', borderRadius: "30px", padding: '7px' }}>Modify</span></HeaderCell>
                        <Cell style={{ padding: '6px' }}>

                        </Cell>
                      </Column>
                    </Table>
                    <div style={{ padding: 20 }}>
                      <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        size="xs"
                        layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                        total={this.state.pendingList.length}
                        limitOptions={[5, 10, 30, 50]}
                        limit={this.state.pendinListLimit}
                        activePage={this.state.pendingListPage}
                        onChangePage={(value) => { this.setState({ pendingListPage: value }) }}
                        onChangeLimit={(value) => { this.setState({ pendinListLimit: value, pendingListPage: 1 }) }}
                      />
                    </div>
                  </div>
                  {/*<Table>
                    <Table.Head style={{ width: 'auto' }} overflowX="scroll" whiteSpace="normal"  >
                      <Table.TextHeaderCell fontWeight='bold'>Client Id</Table.TextHeaderCell>
                      <Table.TextHeaderCell fontWeight='bold'>Strategy Name</Table.TextHeaderCell>
                      <Table.TextHeaderCell fontWeight='bold'>Quantity</Table.TextHeaderCell>
                      <Table.TextHeaderCell fontWeight='bold'>Profit/LOSS</Table.TextHeaderCell>
                      <Table.TextHeaderCell fontWeight='bold' ><span style={{ backgroundColor: 'orange', color: '#FFFFFF', fontWeight: 'bold', border: '0px', cursor: 'pointer', borderRadius: '20px', padding: '7px' }}>Modify</span></Table.TextHeaderCell>

                    </Table.Head>
                    <Table.Body height={180}>
                      {Array(5)
                        .fill("")
                        .map((e, index) => (
                          <Table.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#e9e9e9', margin: '0px', padding: '0px', height: '35px', width: 'auto' }}>
                            <Table.TextCell fontWeight='bold'>{index}</Table.TextCell>
                            <Table.TextCell fontWeight='bold'>{`Test ${index + 1}`}</Table.TextCell>
                            <Table.TextCell fontWeight='bold'>{index}</Table.TextCell>
                            <Table.TextCell fontWeight='bold'>{index}</Table.TextCell>
                            <Table.TextCell fontWeight='bold' textAlign='center'><Checkbox name={`CheckBox${index}`} checked={this.state[`CheckBox${index}`] ? true : false} onChange={(evt) => { this.handleCheckBox(evt) }}></Checkbox></Table.TextCell>

                          </Table.Row>
                        ))}
                    </Table.Body>
                        </Table>*/}

                </div>
              </div>
            </div>
            {/*End of pending Table div */}
            {/*Completed Table div */}
            <div style={{ width: "100%" }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'auto', }}>
                <div style={{ padding: '10px', paddingTop: '2px' }}><span style={{ color: '#333', fontWeight: 'bold' }}>Completed</span></div>
                <div style={{ padding: '10px', paddingTop: '1px', width: 'auto' }}>
                  <div>
                    <Table height={180} data={completedData} onRowClick={(rowData) => { this.openModal("COMPLETED", rowData.StrategyCode) }}>
                      <Column width="auto" flexGrow={1} resizable>
                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Client Id</HeaderCell>
                        <Cell dataKey="ClientID" />
                      </Column>

                      <Column width="auto" flexGrow={2} resizable>
                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Strategy Name</HeaderCell>
                        <Cell dataKey="StrategyCode" />
                      </Column>

                      <Column width="auto" flexGrow={1} resizable>
                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>QTY</HeaderCell>
                        <Cell dataKey="Quantity" />
                      </Column>

                      <Column width="auto" flexGrow={1} resizable>
                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Profit/LOSS</HeaderCell>
                        <Cell>
                          {rowData =>
                            <span style={{ color: parseInt(rowData.Net) > 0 ? "green" : "red" }}>{rowData.Net}</span>
                          }
                        </Cell>
                      </Column>

                    </Table>
                    <div style={{ padding: 20 }}>
                      <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        size="xs"
                        layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                        total={this.state.completedList.length}
                        limitOptions={[5, 10, 30, 50]}
                        limit={this.state.completedListLimit}
                        activePage={this.state.completedListPage}
                        onChangePage={(value) => { this.setState({ completedListPage: value }) }}
                        onChangeLimit={(value) => { this.setState({ completedListLimit: value, completedListPage: 1 }) }}
                      />
                    </div>
                  </div>

                  {/*<Table width='auto'>
                    <Table.Head>
                      <Table.TextHeaderCell>Client Id</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Strategy Name</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
                      <Table.TextHeaderCell>Profit/LOSS</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body height={this.state.completedList.length > 0 ? 180 : 50}>
                      {(this.state.completedList) ? this.state.completedList.map((e, index) => (
                        <Table.Row onClick={() => { this.openModal("COMPLETED", e['StrategyCode']) }} key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#e9e9e9', cursor: 'pointer', margin: '0px', padding: '0px', height: '35px' }}>
                          <Table.TextCell fontWeight='bold'>{e['ClientID']}</Table.TextCell>
                          <Table.TextCell fontWeight='bold'>{e['StrategyCode']}</Table.TextCell>
                          <Table.TextCell fontWeight='bold'>{e['Quantity']}</Table.TextCell>
                          <Table.TextCell fontWeight='bold' textProps={{ color: (e['Net']) > 0 ? "green" : "red", fontWeight: 'bold' }}   >{e['Net']}</Table.TextCell>
                        </Table.Row>

                      ))
                        : <Table.Row style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#e9e9e9', cursor: 'pointer', margin: '0px', padding: '0px', height: '35px' }}>
                          <Table.TextCell fontWeight='bold'>No Record Found... </Table.TextCell>
                        </Table.Row>

                      }
                    </Table.Body>

                    </Table>*/}
                  <Modal overflow={false} size="lg" height="90%" open={this.state.complatedModalVisible} onClose={() => { this.closeModal("COMPLETED") }}>
                    <Modal.Header style={{ padding: '0px', margin: "0px", width: '100%' }}>
                      <Modal.Title>
                        {this.state.completedModalArray.length > 0 ? this.state.completedModalArray[0]['StrategyName'] : ''}
                      </Modal.Title>
                      <hr style={{ background: '#ACACAC', color: '#ACACAC', borderColor: '#ACACAC', height: '1px', padding: '0px', margin: "3px", witdh: '100%' }} />
                    </Modal.Header>
                    <Modal.Body style={{ padding: '0px', margin: "0px", width: "100%" }}>
                      <div>
                        <Table width='auto' data={[]} >
                          <Column width="auto" flexGrow={1} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Instrument</HeaderCell>
                            <Cell dataKey="ClientID" />
                          </Column>

                          <Column width="auto" flexGrow={2} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Entry Time</HeaderCell>
                            <Cell dataKey="StrategyCode" />
                          </Column>

                          <Column width="auto" flexGrow={1} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Entry Qty</HeaderCell>
                            <Cell dataKey="Quantity" />
                          </Column>

                          <Column width="auto" flexGrow={1} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Entry Price</HeaderCell>
                            <Cell dataKey="Quantity" />
                          </Column>
                          <Column width="auto" flexGrow={1} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Exit Time</HeaderCell>
                            <Cell dataKey="Quantity" />
                          </Column>
                          <Column width="auto" flexGrow={1} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Exit Qty</HeaderCell>
                            <Cell dataKey="Quantity" />
                          </Column>
                          <Column width="auto" flexGrow={1} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Exit Price</HeaderCell>
                            <Cell dataKey="Quantity" />
                          </Column>
                          <Column width="auto" flexGrow={1} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Trade Type</HeaderCell>
                            <Cell dataKey="Quantity" />
                          </Column>
                          <Column width="auto" flexGrow={1} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>Status</HeaderCell>
                            <Cell dataKey="Quantity" />
                          </Column>
                          <Column width="auto" flexGrow={1} resizable>
                            <HeaderCell style={{ background: "#1e90ff", color: "#ffffff" }}>P&L</HeaderCell>
                            <Cell dataKey="Quantity" />
                          </Column>


                        </Table>
                        <div style={{ padding: 20 }}>
                          <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={5}
                            size="xs"
                            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                            //total={this.state.completedList.length}
                            limitOptions={[5, 10, 30, 50]}
                          //limit={this.state.completedListLimit}
                          //activePage={this.state.completedListPage}
                          // onChangePage={(value) => { this.setState({ completedListPage: value }) }}
                          //onChangeLimit={(value) => { this.setState({ completedListLimit: value, completedListPage: 1 }) }}
                          />
                        </div>
                      </div>

                    </Modal.Body>
                    <Modal.Footer style={{ padding: '0px', margin: "0px" }}>
                      <hr style={{ background: '#ACACAC', color: '#ACACAC', borderColor: '#ACACAC', height: '1px', padding: '0px', margin: "3px", witdh: '100%' }} color='red' />
                      <div style={{ width: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                        <div><span style={{ color: "#333", fontWeight: 'bold' }}>Total : </span><span>0.00</span></div>
                      </div>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
            {/*End of pending Table div */}


            {/* end of  Last row Div Decision,Orders,Trades Button  div*/}
          </div>
        </main >
        {/*End of  Main Div for align content in column*/}
        {
          this.state.width < 768 ? <MDBFooter className="fixed-bottom" style={{ backgroundColor: '#FFFFFF', paddingLeft: "5px", paddingRight: "5px", paddingBottom: "5px" }}>
            <div className={styles.navigation} style={{ borderRadius: "20px" }}>
              <ui onClick={() => { this.updateNavigationButton(); }}>
                <li className={"list"}>
                  <a onClick={() => { }}>
                    <span className={styles.icon}>
                      <PiStrategyBold />
                    </span>
                    <span className={styles.text}>Strategies</span>
                  </a>
                </li>
                <li className={"list"}>
                  <a >
                    <span className={styles.icon}>
                      <MdOutlineMiscellaneousServices />
                    </span>
                    <span className={styles.text}>Services</span>
                  </a>
                </li>
                <li className={"list " + styles.active}>
                  <a>
                    <span className={styles.icon}>
                      <MdDashboard />
                    </span>
                    <span className={styles.text}>Dashboard</span>
                  </a>
                </li>
                <li className={"list"}>
                  <a >
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
export default Dashboard1;


