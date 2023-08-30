
import React from "react";
import styles from '../../../styles/Home.module.css'
import { DatePicker, InputPicker } from "rsuite";
import { Modal, Pagination, Input } from 'rsuite';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import { MdDone, MdClose, MdAdd, MdRemove } from 'react-icons/md'
import "rsuite/dist/rsuite.css";
import { Table } from "rsuite";
import { Switch } from "evergreen-ui";
import { Checkbox } from "rsuite";
import LoadingSpinner from "../component/LoadingSpinner";
const { Column, HeaderCell, Cell } = Table;
const CompactCell = props => <Cell wordWrap='keep-all' {...props} style={{ padding: 6, fontWeight: 'bold' }} />;

class Subscribe_User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientdata: []
        }

        this.onHandleChange.bind(this);
        this.onHandleButtonClick.bind(this);
        // this.onModalClick.bind(this);
        this.onChangeSubscriptionMonth.bind(this)

        for (var i = 0; i < this.props.state.clientdetails.length; i++) {
            this.state.clientdata.push({ Userid: this.props.state.clientdetails[i]['Userid'], subscribed: (new Date(this.props.state.clientdetails[i]['SubscriptionExpiry']) < new Date()) ? 0 : 1, month: parseInt(new Date(this.props.state.clientdetails[i]['SubscriptionExpiry']).getMonth() - new Date().getMonth()), expiry: this.props.state.clientdetails[i]['SubscriptionExpiry'] })
        }
        //console.log(clientdata)
    }

    onHandleChange = (name, value) => {
        this.props.homeCallback(name, value);
    };
    onClientChange = (name, value) => {
        this.props.homeCallback(name, value);
    }
    onHandleButtonClick = (name) => {
        if (name === "SUBMIT") {
            this.props.submitCallBack();
        }
    }
    onModalClick = (modalType, modalName, value) => {
        if (modalType === "openModal") {
            if (modalName === "COMPLETED") {
                this.props.completedRowClick(value);
                this.props.openModal(modalName, value);
                this.props.homeCallback('completedListRowLimit', 10)
                this.props.homeCallback('completedListRowPage', 1)
            }
            else if (modalName === "PENDING") {
                this.props.pendingRowClick(value);
                this.props.openModal(modalName, value);
                this.props.homeCallback('pendingListRowLimit', 10)
                this.props.homeCallback('pendingListRowPage', 1)
            }
        }

    }
    onChangeSubscriptionMonth = async (type, clientId) => {
        if (type === "INCREASE") {
            for (var i = 0; i < this.state.clientdata.length; i++) {
                if (this.state.clientdata[i]['Userid'] === clientId) {
                    // clientdata[i]['expiry'] = new Date(new Date(clientdata[i]['expiry']).getMonth() + 1)
                    var tempdate = new Date(this.state.clientdata[i]['expiry']);
                    // tempdate.setMonth(tempdate.getMonth() + 1);
                    this.state.clientdata[i]['expiry'] = tempdate.setMonth(tempdate.getMonth() + 1);
                    this.state.clientdata[i]['month'] = parseInt(this.state.clientdata[i]['month']) + 1
                    if (parseInt(this.state.clientdata[i]['month']) > 0) {
                        this.state.clientdata[i]['subscribed'] = 1
                    }
                    else {
                        this.state.clientdata[i]['subscribed'] = 0
                    }

                    break;
                }
            }
        } else if (type = "DECREASE") {
            for (var i = 0; i < this.state.clientdata.length; i++) {
                if (this.state.clientdata[i]['Userid'] === clientId) {
                    // clientdata[i]['expiry'] = new Date(new Date(clientdata[i]['expiry']).getMonth() + 1)
                    var tempdate = new Date(this.state.clientdata[i]['expiry']);
                    // tempdate.setMonth(tempdate.getMonth() + 1);
                    this.state.clientdata[i]['expiry'] = tempdate.setMonth(tempdate.getMonth() - 1);
                    this.state.clientdata[i]['month'] = parseInt(this.state.clientdata[i]['month']) - 1
                    if (parseInt(this.state.clientdata[i]['month']) > 0) {
                        this.state.clientdata[i]['subscribed'] = 1
                    }
                    else {
                        this.state.clientdata[i]['subscribed'] = 0
                    }

                    break;
                }
            }
        }
    }
    componentDidMount() {
        //this.updateWindowDimensions();
        //window.addEventListener('resize', this.updateWindowDimensions);
        this.setState({ clientdata: this.state.clientdata })
    }
    componentWillUnmount() {
        // clientdata = clientdata
    }
    //componentDidMount()

    render() {
        const lang = navigator.language || navigator.languages[0];
        var options = {
            day: "2-digit",
            year: "numeric",
            month: "short",
            //hour: "2-digit",
            //minute: "2-digit",
            //second: "2-digit",
        }

        setInterval(() => {

            this.setState({ clientdata: this.state.clientdata });
        }, 1000);


        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', marginTop: "20px" }}>
                {/* First row Div*/}
                <div style={{ padding: '10px' }}>
                    <span style={{ color: "#333", fontWeight: 'bold', fontSize: 20 }}> Subscribe User</span>
                </div>
                <div style={{ padding: '10px', paddingTop: '1px', width: '100%' }}>
                    <div>
                        <Table height={200} data={this.state.clientdata} hover={true} virtualized onRowClick={(rowData, rowIndex) => {
                            // console.log(rowIndex);
                        }}
                            rowClassName={(rowData) => {
                                return rowData ? styles.rs_table_row_pending : "";
                            }}
                            bordered cellBordered rowHeight={38}

                        >
                            <Column width={this.props.state.width > 600 ? 'auto' : 90} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                <HeaderCell wordWrap='keep-all' style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Client Id</HeaderCell>
                                <Cell dataKey="Userid" style={{ color: "#333", fontWeight: 'bold', }} />
                            </Column>

                            <Column width={this.props.state.width > 600 ? 'auto' : 200} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable >
                                <HeaderCell wordWrap='keep-all' style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Subscribed</HeaderCell>
                                {/* <Cell dataKey="StrategyCode" style={{ color: "#333", fontWeight: 'bold', fontSize: 18 }} />*/}
                                <Cell align="left" style={{ color: "#333", fontWeight: 'bold', padding: '5px' }}>
                                    {rowData =>
                                        <span style={{ width: "100%", height: '100%', padding: '5px' }}>{rowData.subscribed ? <MdDone style={{ color: 'green', fontSize: 30, fontWeight: 'bold' }} /> : <MdClose style={{ color: 'red', fontSize: 30, fontWeight: 'bold' }} />}</span>
                                    }
                                </Cell>
                            </Column>

                            <Column width={this.props.state.width > 600 ? 'auto' : 120} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                <HeaderCell wordWrap='keep-all' align="center" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Increase Subscription (In Months)</HeaderCell>
                                <Cell align="center" style={{ color: "#333", fontWeight: 'bold', cursor: 'pointer', padding: '5px' }}>
                                    {rowData =>
                                        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-around" }}>
                                            <div><span style={{ padding: '5px' }} onClick={() => { this.onChangeSubscriptionMonth('DECREASE', rowData.Userid) }} ><MdRemove style={{ color: 'red', fontSize: 30, fontWeight: 'bold' }} /></span></div>
                                            <div><span style={{ padding: '5px', color: "#333", fontSize: 20, fontWeight: 'bold' }} >{parseInt(rowData.month)}</span></div>
                                            <div><span style={{ padding: '5px' }} onClick={() => { this.onChangeSubscriptionMonth('INCREASE', rowData.Userid) }}><MdAdd style={{ color: 'green', fontSize: 30, fontWeight: 'bold' }} /></span></div>
                                        </div>

                                    }
                                </Cell>
                            </Column>
                            <Column width={this.props.state.width > 600 ? 'auto' : 250} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                <HeaderCell wordWrap='keep-all' align="left" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Subscription Date</HeaderCell>
                                <Cell align="left" style={{ color: "#333", fontWeight: 'bold' }}>
                                    {rowData =>
                                        <span style={{ color: new Date(rowData.expiry) < new Date() ? "red" : "green" }}>{new Date(rowData.expiry).toLocaleString(lang, options)}</span>
                                    }
                                </Cell>
                            </Column>
                            <Column width={this.props.state.width > 600 ? 'auto' : 250} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                <HeaderCell wordWrap='keep-all' align="center" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Action</HeaderCell>
                                <Cell align="center" style={{ color: "#333", fontWeight: 'bold', padding: '7px' }}>
                                    {rowData =>
                                        <span style={{ padding: '20px', paddingLeft: "15px", paddingRight: "15px", backgroundColor: 'orange', color: '#FFFFFF', fontWeight: 'bold', border: '0px', cursor: 'pointer', borderRadius: "30px", padding: '7px' }}>Update</span>
                                    }
                                </Cell>
                            </Column>

                        </Table>
                        {/*<div style={{ padding: 20 }}>
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
                                total={this.props.state.pendingList.length}
                                limitOptions={[5, 10, 30, 50]}
                                limit={this.props.state.pendinListLimit}
                                activePage={this.props.state.pendingListPage}
                                onChangePage={(value) => { this.onHandleChange('pendingListPage', value) }}
                                onChangeLimit={(value) => { this.onHandleChange('pendinListLimit', value), this.onHandleChange('pendingListPage', 1) }}
                            />
                                </div>*/}
                    </div>
                </div>

                {/* end of  Last row Div Decision,Orders,Trades Button  div*/}
            </div >


        );
    }
}

export default Subscribe_User;
/**"url": "https://next-js-admin-sunny4943.vercel.app",**/