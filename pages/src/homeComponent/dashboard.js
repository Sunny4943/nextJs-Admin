
import React from "react";
import styles from '../../../styles/Home.module.css'
import { DatePicker, InputPicker } from "rsuite";
import { Modal, Pagination } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { Table } from "rsuite";
import { Switch } from "evergreen-ui";
const { Column, HeaderCell, Cell } = Table;
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.onHandleChange.bind(this);
        this.onHandleButtonClick.bind(this);
        // this.onModalClick.bind(this);
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
            this.props.openModal(modalName, value);
        }

    }
    render() {
        const completedData = this.props.completedList.filter((v, i) => {
            const start = this.props.completedListLimit * (this.props.completedListPage - 1);
            const end = start + this.props.completedListLimit;
            return i >= start && i < end;
        });
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                {/* First row Div*/}
                <div style={{ width: "100%", padding: "10px" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: "100%", height: "auto", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 15px 12px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff' }}>
                        <div style={{ width: "100%" }}>
                            <div className={styles.legGrid}>
                                <div style={{ width: 'auto', padding: '5px' }}> From Date</div>
                                <div style={{ width: 'auto', padding: '5px' }}>
                                    <DatePicker oneTap defaultValue={this.props.fromDate ? this.props.fromDate : new Date()} onChange={(date) => { this.onHandleChange('fromDate', date) }} format={"dd-MMM-yyyy"} size="sm" style={{ width: "100%" }} placeholder='From Date' id={"FromDate"} name="FromDate" />
                                    {/*<input type="text" name={"FromDate"} value={this.state[`Fromrenderthis.Date`] ? this.state[`FromDate`] : new Date().toLocaleDateString('en-GB')} onChange={(e) => this.handleChange(e)} onFocus={(e) => (e.target.type = "date")} format="DD/MM / YYYY" onBlur={(e) => (e.target.type = "text")}></input>*/}
                                </div>
                                <div style={{ width: 'auto', padding: '5px' }}> To Date</div>
                                <div style={{ width: 'auto', padding: '5px' }}>
                                    <DatePicker oneTap defaultValue={this.props.toDate ? this.props.toDate : new Date()} onChange={(date) => { this.onHandleChange('toDate', date) }} format={"dd-MMM-yyyy"} size="sm" style={{ width: "100%" }} placeholder='To Date' id={"ToDate"} name="ToDate" />
                                    {/*<input type="text" name={"ToDate"} value={this.state[`ToDate`] ? this.state[`ToDate`] : new Date().toLocaleDateString('en-GB')} onChange={(e) => this.handleChange(e)} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}></input>*/}
                                </div>
                                <div style={{ width: 'auto', padding: '5px' }}> Client</div>
                                <div style={{ width: 'auto', padding: '5px' }}>
                                    <InputPicker value={this.props.clientName} onSelect={(value) => { this.onClientChange('clientName', value) }} onChange={(value) => { this.onClientChange('clientName', value) }} size="sm" placeholder="Client" id={"Client"} style={{ width: "100%" }} data={this.props.clientList} />
                                    {/* <input type='text' style={{ width: "100%" }} ></input>*/}
                                </div>
                                <div style={{ width: 'auto', padding: "5px", height: 'auto' }}>
                                    <button className='button button4' style={{ backgroundColor: '#1e90ff', paddingTop: '1px', paddingBottom: '1px', borderRadius: '20px', cursor: 'pointer', color: '#ffffff', fontWeight: 'bold', width: "70%" }} onClick={() => { this.onHandleButtonClick('SUBMIT') }} > <span className={styles.span_Button}>Submit </span></button>
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
                            <div style={{ paddingRight: '10px' }}><Switch checked={this.props.showToggle} onChange={(e) => { this.onHandleChange('showToggle', !(this.props.showToggle)) }}></Switch></div>
                            <div>Show</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
                            <div style={{ paddingRight: '10px' }}><Switch checked={this.props.autoSyncToggle} onChange={() => { this.onHandleChange('autoSyncToggle', !(this.props.autoSyncToggle)) }}></Switch></div>
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
                                        total={this.props.pendingList.length}
                                        limitOptions={[5, 10, 30, 50]}
                                        limit={this.props.pendinListLimit}
                                        activePage={this.props.pendingListPage}
                                        onChangePage={(value) => { this.onHandleChange('pendingListPage', value) }}
                                        onChangeLimit={(value) => { this.onHandleChange('pendinListLimit', value), this.onHandleChange('pendingListPage', 1) }}
                                    />
                                </div>
                            </div>
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
                                <Table height={180} data={completedData} onRowClick={(rowData) => { this.onModalClick("openModal", "COMPLETED", rowData.StrategyCode) }}>
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
                                        total={this.props.completedList.length}
                                        limitOptions={[5, 10, 30, 50]}
                                        limit={this.props.completedListLimit}
                                        activePage={this.props.completedListPage}
                                        onChangePage={(value) => { this.onHandleChange('completedListPage', value) }}
                                        onChangeLimit={(value) => { this.onHandleChange('completedListLimit', value), this.onHandleChange('completedListPage', 1) }}
                                    />
                                </div>
                            </div>

                            <Modal overflow={false} size="lg" height="90%" open={this.props.complatedModalVisible} onClose={() => { this.onHandleChange('complatedModalVisible', !(this.props.complatedModalVisible)) }}>
                                <Modal.Header style={{ padding: '0px', margin: "0px", width: '100%' }}>
                                    <Modal.Title>
                                        {this.props.completedModalArray.length > 0 ? this.props.completedModalArray[0]['StrategyName'] : ''}
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


        );
    }
}

export default Dashboard;
