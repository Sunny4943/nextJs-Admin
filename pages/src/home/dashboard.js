
import React from "react";
import styles from '../../../styles/Home.module.css'
import { DatePicker, InputPicker } from "rsuite";
import { Modal, Pagination, Input } from 'rsuite';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import "rsuite/dist/rsuite.css";
import { Table } from "rsuite";
import { Switch } from "evergreen-ui";
import { Checkbox } from "rsuite";
import LoadingSpinner from "../component/LoadingSpinner";
const { Column, HeaderCell, Cell } = Table;
const CompactCell = props => <Cell wordWrap='keep-all' {...props} style={{ padding: 6, fontWeight: 'bold' }} />;
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

    render() {
        var completedData = []
        var completedRowData = []
        if (this.props.state.completedList) {
            completedData = this.props.state.completedList.filter((v, i) => {
                const start = this.props.state.completedListLimit * (this.props.state.completedListPage - 1);
                const end = start + this.props.state.completedListLimit;
                return i >= start && i < end;
            });
        }
        if (this.props.state.completedListRowArray) {
            completedRowData = this.props.state.completedListRowArray.filter((v, i) => {
                const start = this.props.state.completedListRowLimit * (this.props.state.completedListRowPage - 1);
                const end = start + this.props.state.completedListRowLimit;
                return i >= start && i < end;
            });
        }
        const pendingRowData = this.props.state.pendingListRowArray.filter((v, i) => {
            const start = this.props.state.pendingListRowLimit * (this.props.state.pendingListRowPage - 1);
            const end = start + this.props.state.pendingListRowLimit;
            return i >= start && i < end;
        });
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                {/* First row Div*/}
                <div style={{ width: "100%", padding: "10px" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: "100%", height: "auto", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 15px 12px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff' }}>
                        <div style={{ width: "100%" }}>
                            <div className={styles.legGrid}>
                                <div style={{ width: 'auto', padding: '5px', fontWeight: 'bold', fontSize: 18 }}> From Date</div>
                                <div style={{ width: 'auto', padding: '5px' }}>
                                    <DatePicker oneTap defaultValue={this.props.state.fromDate ? this.props.state.fromDate : new Date()} onChange={(date) => { this.onHandleChange('fromDate', date) }} format={"dd-MMM-yyyy"} size="sm" style={{ width: "100%" }} placeholder='From Date' id={"FromDate"} name="FromDate" />
                                    {/*<input type="text" name={"FromDate"} value={this.state[`Fromrenderthis.Date`] ? this.state[`FromDate`] : new Date().toLocaleDateString('en-GB')} onChange={(e) => this.handleChange(e)} onFocus={(e) => (e.target.type = "date")} format="DD/MM / YYYY" onBlur={(e) => (e.target.type = "text")}></input>*/}
                                </div>
                                <div style={{ width: 'auto', padding: '5px', fontWeight: 'bold', fontSize: 18 }}> To Date</div>
                                <div style={{ width: 'auto', padding: '5px' }}>
                                    <DatePicker oneTap defaultValue={this.props.state.toDate ? this.props.state.toDate : new Date()} onChange={(date) => { this.onHandleChange('toDate', date) }} format={"dd-MMM-yyyy"} size="sm" style={{ width: "100%" }} placeholder='To Date' id={"ToDate"} name="ToDate" />
                                    {/*<input type="text" name={"ToDate"} value={this.state[`ToDate`] ? this.state[`ToDate`] : new Date().toLocaleDateString('en-GB')} onChange={(e) => this.handleChange(e)} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}></input>*/}
                                </div>
                                <div style={{ width: 'auto', padding: '5px', fontWeight: 'bold', fontSize: 18 }}> Client</div>
                                <div style={{ width: 'auto', padding: '5px' }}>
                                    <InputPicker value={this.props.state.clientName} onSelect={(value) => { this.onClientChange('clientName', value) }} onChange={(value) => { this.onClientChange('clientName', value) }} size="sm" placeholder="Client" id={"Client"} style={{ width: "100%" }} data={this.props.state.clientList} />
                                    {/* <input type='text' style={{ width: "100%" }} ></input>*/}
                                </div>
                                <div style={{ width: 'auto', padding: "5px", height: 'auto' }}>
                                    <button className='button button4' style={{ backgroundColor: '#1e90ff', paddingTop: '1px', paddingBottom: '1px', borderRadius: '20px', cursor: 'pointer', color: '#ffffff', fontWeight: 'bold', width: "70%" }} onClick={() => { this.onHandleButtonClick('SUBMIT') }} > <span className={styles.span_Button}>Submit </span></button>
                                </div>
                                <div style={{ width: 'auto', padding: "5px", height: 'auto' }}>
                                    {this.props.state.isLoading ? <LoadingSpinner /> : <></>}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "100%" }}>
                            <div className={styles.legGrid} style={{ padding: "15px" }}>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: "10px", margin: '10px', width: "auto", height: "auto", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                                    <div><span style={{ color: '#333', fontWeight: 'bold', fontSize: 18 }}>UnRealised P/L</span></div>
                                    <div><span style={{ color: parseInt(this.props.state.UnRealisedPNL) < 0 ? 'red' : 'green', fontWeight: 'bold', fontSize: 18 }}>{this.props.state.UnRealisedPNL}</span> <span style={{ color: parseInt(this.props.state.UnRealisedPNL) < 0 ? 'red' : 'green', fontWeight: 'bold', fontSize: 22 }}> {parseInt(this.props.state.UnRealisedPNL) < 0 ? < BiDownArrowAlt /> : <BiUpArrowAlt />}</span></div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', width: "auto", padding: "10px", margin: '10px', height: "auto", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                                    <div><span style={{ color: '#333', fontWeight: 'bold', fontSize: 18 }}>Realised P/L</span></div>
                                    <div><span style={{ color: parseInt(this.props.state.RealisedPNL) < 0 ? 'red' : 'green', fontWeight: 'bold', fontSize: 18 }}>{this.props.state.RealisedPNL}</span> <span style={{ color: parseInt(this.props.state.RealisedPNL) < 0 ? 'red' : 'green', fontWeight: 'bold', fontSize: 22 }}> {parseInt(this.props.state.RealisedPNL) < 0 ? < BiDownArrowAlt /> : <BiUpArrowAlt />}</span></div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', width: "auto", padding: "10px", margin: '10px', height: "auto", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                                    <div><span style={{ color: '#333', fontWeight: 'bold', fontSize: 18 }}>Net Profit</span></div>
                                    <div><span style={{ color: parseInt(this.props.state.NetPNL) < 0 ? 'red' : 'green', fontWeight: 'bold', fontSize: 18 }}>{this.props.state.NetPNL}</span> </div>
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
                            <div style={{ paddingRight: '10px' }}><Switch checked={this.props.state.showToggle} onChange={(e) => { this.onHandleChange('showToggle', !(this.props.state.showToggle)) }}></Switch></div>
                            <div style={{ color: '#333', fontWeight: 'bold', fontSize: 18 }}>Show</div>
                            <Modal overflow={false} size="xs" height="90%" open={this.props.state.showToggle} onClose={() => { this.onHandleChange('showToggle', !(this.props.state.showToggle)) }} >
                                <Modal.Header style={{ padding: '0px', margin: "0px", width: 'auto' }}>
                                    <Modal.Title >
                                        <div><span style={{ fontSize: 22, fontWeight: 'bold' }}> Password Protection</span></div>
                                        <div><span style={{ color: "#ACACAC" }}>Please Enter Password</span></div>
                                    </Modal.Title>
                                    <hr style={{ background: '#ACACAC', color: '#ACACAC', borderColor: '#ACACAC', height: '1px', padding: '0px', margin: "0px", witdh: 'auto' }} />
                                </Modal.Header>
                                <Modal.Body style={{ paddingTop: '10px', margin: "0px", width: "100%", height: "100%" }}>
                                    <div style={{ width: "auto", height: "auto" }}>
                                        <Input placeholder="Password" type="password"></Input>
                                    </div>

                                </Modal.Body>
                                <Modal.Footer style={{ padding: '0px', margin: "0px" }}>

                                    <div style={{ width: 'auto', display: 'flex', justifyContent: 'flex-start', }}>
                                        <button onClick={() => { this.onHandleChange('showToggle', !(this.props.state.showToggle)) }} className='button button4' style={{ padding: '20px', paddingLeft: "20px", paddingRight: "20px", backgroundColor: 'orange', color: '#FFFFFF', fontWeight: 'bold', border: '0px', cursor: 'pointer', borderRadius: "30px", padding: '7px' }}><span> Submit</span></button>
                                    </div>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
                            <div style={{ paddingRight: '10px' }}><Switch checked={this.props.state.autoSyncToggle} onChange={() => { this.onHandleChange('autoSyncToggle', !(this.props.state.autoSyncToggle)) }}></Switch></div>
                            <div style={{ color: '#333', fontWeight: 'bold', fontSize: 18 }}>Auto Sync</div>
                        </div>

                    </div>
                </div>
                {/*end of Switch Button Div */}
                {/*pending Table div */}
                <div style={{ width: "100%" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'auto', }}>
                        <div style={{ padding: '10px', paddingTop: '2px' }}><span style={{ color: '#333', fontWeight: 'bold', fontSize: 18 }}>Currently Running</span></div>
                        <div style={{ padding: '10px', paddingTop: '1px', width: '100%' }}>
                            <div>
                                <Table height={200} data={completedData} hover={true} virtualized onRowClick={(rowData, rowIndex) => {
                                    // console.log(rowIndex);
                                }}
                                    rowClassName={(rowData) => {
                                        return rowData ? styles.rs_table_row_pending : "";
                                    }}
                                    bordered cellBordered rowHeight={38}

                                >
                                    <Column width={this.props.state.width > 600 ? 'auto' : 90} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                        <HeaderCell wordWrap='keep-all' style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Client Id</HeaderCell>
                                        <Cell dataKey="ClientID" style={{ color: "#333", fontWeight: 'bold', }} />
                                    </Column>

                                    <Column width={this.props.state.width > 600 ? 'auto' : 200} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable >
                                        <HeaderCell wordWrap='keep-all' style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Strategy Name</HeaderCell>
                                        {/* <Cell dataKey="StrategyCode" style={{ color: "#333", fontWeight: 'bold', fontSize: 18 }} />*/}
                                        <Cell align="left" style={{ color: "#333", fontWeight: 'bold', cursor: 'pointer' }}>
                                            {rowData =>
                                                <span onClick={() => { this.onModalClick("openModal", "PENDING", rowData.StrategyCode) }} style={{ width: "100%", height: '100%' }}>{rowData.StrategyCode}</span>
                                            }
                                        </Cell>
                                    </Column>

                                    <Column width={this.props.state.width > 600 ? 'auto' : 120} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                        <HeaderCell wordWrap='keep-all' align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Qty</HeaderCell>
                                        <Cell align="right" dataKey="Quantity" style={{ color: "#333", fontWeight: 'bold' }} />
                                    </Column>

                                    <Column width={this.props.state.width > 600 ? 'auto' : 250} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                        <HeaderCell wordWrap='keep-all' align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Profit/Loss</HeaderCell>
                                        <Cell align="right" style={{ color: "#333", fontWeight: 'bold' }}>
                                            {rowData =>
                                                <span style={{ color: parseInt(rowData.Net) > 0 ? "green" : "red" }}>{rowData.Net}</span>
                                            }
                                        </Cell>
                                    </Column>
                                    <Column align="left" width={this.props.state.width > 600 ? 'auto' : 'auto'} flexGrow={this.props.state.width > 600 ? 1 : 1} resizable >
                                        <HeaderCell wordWrap='keep-all' align="left" style={{ background: "#1e90ff", color: "#ffffff", alignContent: 'start', wordWrap: "break-word" }}><span style={{ padding: '20px', paddingLeft: "15px", paddingRight: "15px", backgroundColor: 'orange', color: '#FFFFFF', fontWeight: 'bold', border: '0px', cursor: 'pointer', borderRadius: "30px", padding: '7px' }}>Modify</span></HeaderCell>
                                        <Cell align="left" style={{ padding: '6px' }}>
                                            {(rowData, rowIndex) => (<div> <Checkbox name={`CheckBox${rowIndex}`} checked={this.props.state[`CheckBox${rowIndex}`]} onChange={(value) => this.onHandleChange(`CheckBox${rowIndex}`, (value))} /></div>)}

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
                                        total={this.props.state.pendingList.length}
                                        limitOptions={[5, 10, 30, 50]}
                                        limit={this.props.state.pendinListLimit}
                                        activePage={this.props.state.pendingListPage}
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
                        <div style={{ padding: '10px', paddingTop: '2px' }}><span style={{ color: '#333', fontWeight: 'bold', fontSize: 18 }}>Completed</span></div>
                        <div style={{ padding: '10px', paddingTop: '1px', width: 'auto' }}>
                            <div>
                                <Table height={200} data={completedData} style={{ cursor: "pointer" }} rowClassName={(rowData) => {
                                    return rowData ? styles.rs_table_row_completed : "";
                                }} onRowClick={(rowData) => { this.onModalClick("openModal", "COMPLETED", rowData.StrategyCode) }} bordered cellBordered rowHeight={40}>
                                    <Column width={this.props.state.width > 600 ? 'auto' : 90} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Client Id</HeaderCell>
                                        <Cell dataKey="ClientID" style={{ color: "#333", fontWeight: 'bold', }} />
                                    </Column>

                                    <Column width={this.props.state.width > 600 ? 'auto' : 200} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                        <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Strategy Name</HeaderCell>
                                        <Cell dataKey="StrategyCode" style={{ color: "#333", fontWeight: 'bold' }} />
                                    </Column>

                                    <Column width={this.props.state.width > 600 ? 'auto' : 120} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                        <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Qty</HeaderCell>
                                        <Cell align="right" dataKey="Quantity" style={{ color: "#333", fontWeight: 'bold', textAlign: 'right' }} />
                                    </Column>

                                    <Column width={this.props.state.width > 600 ? 'auto' : 200} flexGrow={this.props.state.width > 600 ? 1 : 0} resizable>
                                        <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Profit/Loss</HeaderCell>
                                        <Cell align="right" style={{ color: "#333", fontWeight: 'bold' }}>
                                            {rowData =>
                                                <span style={{ color: parseInt(rowData.Net) > 0 ? "green" : "red", textAlign: 'right' }}>{rowData.Net}</span>
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
                                        total={this.props.state.completedList.length}
                                        limitOptions={[5, 10, 30, 50]}
                                        limit={this.props.state.completedListLimit}
                                        activePage={this.props.state.completedListPage}
                                        onChangePage={(value) => { this.onHandleChange('completedListPage', value) }}
                                        onChangeLimit={(value) => { this.onHandleChange('completedListLimit', value), this.onHandleChange('completedListPage', 1) }}
                                    />
                                </div>
                            </div>

                            <Modal overflow={false} size="lg" height="90%" open={this.props.state.complatedModalVisible} onClose={() => { this.onHandleChange('complatedModalVisible', !(this.props.state.complatedModalVisible)) }} >
                                <Modal.Header style={{ padding: '0px', margin: "0px", width: '100%' }}>
                                    <Modal.Title style={{ fontSize: 22, fontWeight: 'bold' }}>
                                        {this.props.state.completedModalArray.length > 0 ? this.props.state.completedModalArray[0]['StrategyName'] : ''}
                                    </Modal.Title>
                                    <hr style={{ background: '#ACACAC', color: '#ACACAC', borderColor: '#ACACAC', height: '1px', padding: '0px', margin: "3px", witdh: '100%' }} />
                                </Modal.Header>
                                <Modal.Body style={{ padding: '0px', margin: "0px", width: "100%", height: "100%" }}>
                                    <div style={{ width: "auto", height: "auto" }}>
                                        <Table width='auto' height={480} data={completedRowData}
                                            rowClassName={(rowData) => {
                                                return rowData ? styles.rs_table_row_completed_click : "";
                                            }} bordered cellBordered rowHeight={38}>
                                            <Column width={110} resizable fullText>
                                                <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Instrument</HeaderCell>
                                                <CompactCell dataKey="Instrument" />
                                            </Column>

                                            <Column width={145} resizable fullText>
                                                <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Entry Time</HeaderCell>
                                                <CompactCell dataKey="EntryTime" />
                                            </Column>

                                            <Column width={100} resizable fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Entry Qty</HeaderCell>
                                                <CompactCell align="right" dataKey="EntryQty" />
                                            </Column>

                                            <Column width={110} resizable fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Entry Price</HeaderCell>
                                                <CompactCell align="right" dataKey="EntryPrice" />
                                            </Column>
                                            <Column width={145} resizable fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Exit Time</HeaderCell>
                                                <CompactCell dataKey="ExitTime" />
                                            </Column>
                                            <Column width={100} resizable fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Exit Qty</HeaderCell>
                                                <CompactCell align="right" dataKey="ExitQty" />
                                            </Column>
                                            <Column width={110} resizable fullText >
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 18 }}>Exit Price</HeaderCell>
                                                <CompactCell align="right" dataKey="ExitPrice" />
                                            </Column>
                                            <Column width={110} resizable fullText>
                                                <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Trade Type</HeaderCell>
                                                <CompactCell dataKey="TradeType" />
                                            </Column>
                                            <Column width={100} resizable fullText>
                                                <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Status</HeaderCell>
                                                <CompactCell dataKey="Status" />
                                            </Column>
                                            <Column width={100} fixed='right' fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>P&L</HeaderCell>
                                                <CompactCell align="right">
                                                    {rowData =>
                                                        <span style={{ color: parseInt(rowData.Net) > 0 ? "green" : "red" }}>{rowData.Net}</span>
                                                    }
                                                </CompactCell>
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
                                                total={this.props.state.completedListRowArray.length}
                                                limitOptions={[10, 20, 30, 40, 50]}
                                                limit={this.props.state.completedListRowLimit ? this.props.state.completedListRowLimit : 10}
                                                activePage={this.props.state.completedListRowPage}
                                                //onChangePage={(value) => { this.onHandleChange('completedListPage', value) }}
                                                //onChangeLimit={(value) => { this.onHandleChange('completedListLimit', value), this.onHandleChange('completedListPage', 1) }}
                                                onChangePage={(value) => { this.onHandleChange('completedListRowPage', value) }}
                                                onChangeLimit={(value) => { this.onHandleChange('completedListRowLimit', value), this.onHandleChange('completedListRowPage', 1) }}
                                            />
                                        </div>
                                    </div>

                                </Modal.Body>
                                <Modal.Footer style={{ padding: '0px', margin: "0px" }}>
                                    <hr style={{ background: '#ACACAC', color: '#ACACAC', borderColor: '#ACACAC', height: '1px', padding: '0px', margin: "3px", witdh: '100%' }} color='red' />
                                    <div style={{ width: 'auto', display: 'flex', justifyContent: 'flex-end', paddingRight: "30px" }}>
                                        <div><span style={{ color: "#333", fontWeight: 'bold', fontSize: 18 }}>Total : </span><span style={{ color: parseInt(this.props.state.comletedRowTotalPNL) > 0 ? 'green' : 'red', fontWeight: 'bold', fontSize: 18 }}>{this.props.state.comletedRowTotalPNL}</span></div>
                                    </div>
                                </Modal.Footer>
                            </Modal>
                            <Modal overflow={false} size="lg" height="90%" open={this.props.state.pendingModalVisible} onClose={() => { this.onHandleChange('pendingModalVisible', !(this.props.state.pendingModalVisible)) }} >
                                <Modal.Header style={{ padding: '0px', margin: "0px", width: '100%' }}>
                                    <Modal.Title style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        {this.props.state.pendingModalArray.length > 0 ? this.props.state.pendingModalArray[0]['StrategyName'] : ''}
                                    </Modal.Title>
                                    <hr style={{ background: '#ACACAC', color: '#ACACAC', borderColor: '#ACACAC', height: '1px', padding: '0px', margin: "3px", witdh: '100%' }} />
                                </Modal.Header>
                                <Modal.Body style={{ padding: '0px', margin: "0px", width: "100%", height: "100%" }}>
                                    <div style={{ width: "auto", height: "auto" }}>
                                        <Table width='auto' height={480} data={pendingRowData}
                                            rowClassName={(rowData) => {
                                                return rowData ? styles.rs_table_row_completed_click : "";
                                            }} bordered cellBordered rowHeight={38}>
                                            <Column width={180} resizable fullText>
                                                <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Instrument</HeaderCell>
                                                <CompactCell dataKey="Instrument" />
                                            </Column>

                                            <Column width={145} resizable fullText>
                                                <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Entry Time</HeaderCell>
                                                <CompactCell dataKey="EntryTime" />
                                            </Column>

                                            <Column width={100} resizable fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Entry Qty</HeaderCell>
                                                <CompactCell align="right" dataKey="EntryQty" />
                                            </Column>

                                            <Column width={110} resizable fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Entry Price</HeaderCell>
                                                <CompactCell align="right" dataKey="EntryPrice" />
                                            </Column>
                                            <Column width={145} resizable fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Exit Time</HeaderCell>
                                                <CompactCell dataKey="ExitTime" />
                                            </Column>
                                            <Column width={100} resizable fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Exit Qty</HeaderCell>
                                                <CompactCell align="right" dataKey="ExitQty" />
                                            </Column>
                                            <Column width={110} resizable fullText >
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Exit Price</HeaderCell>
                                                <CompactCell align="right" dataKey="ExitPrice" />
                                            </Column>
                                            <Column width={110} resizable fullText>
                                                <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Trade Type</HeaderCell>
                                                <CompactCell dataKey="TradeType" />
                                            </Column>
                                            <Column width={100} resizable fullText>
                                                <HeaderCell style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>Status</HeaderCell>
                                                <CompactCell dataKey="Status" />
                                            </Column>
                                            <Column width={100} fixed='right' fullText>
                                                <HeaderCell align="right" style={{ background: "#1e90ff", color: "#ffffff", fontWeight: 'bold', fontSize: 15 }}>P&L</HeaderCell>
                                                <CompactCell align="right">
                                                    {rowData =>
                                                        <span style={{ color: parseInt(rowData.Net) > 0 ? "green" : "red" }}>{rowData.Net}</span>
                                                    }
                                                </CompactCell>
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
                                                total={this.props.state.pendingListRowArray.length}
                                                limitOptions={[10, 20, 30, 40, 50]}
                                                limit={this.props.state.pendingListRowLimit ? this.props.state.pendingListRowLimit : 10}
                                                activePage={this.props.state.pendingListRowPage}
                                                //onChangePage={(value) => { this.onHandleChange('completedListPage', value) }}
                                                //onChangeLimit={(value) => { this.onHandleChange('completedListLimit', value), this.onHandleChange('completedListPage', 1) }}
                                                onChangePage={(value) => { this.onHandleChange('pendingListRowPage', value) }}
                                                onChangeLimit={(value) => { this.onHandleChange('pendingListRowLimit', value), this.onHandleChange('pendingListRowPage', 1) }}
                                            />
                                        </div>
                                    </div>

                                </Modal.Body>
                                <Modal.Footer style={{ padding: '0px', margin: "0px" }}>
                                    <hr style={{ background: '#ACACAC', color: '#ACACAC', borderColor: '#ACACAC', height: '1px', padding: '0px', margin: "3px", witdh: '100%' }} color='red' />
                                    <div style={{ width: 'auto', display: 'flex', justifyContent: 'flex-end', paddingRight: "30px" }}>
                                        <div><span style={{ color: "#333", fontWeight: 'bold', fontSize: 18 }}>Total : </span><span style={{ color: parseInt(this.props.state.pendingRowTotalPNL) > 0 ? 'green' : 'red', fontWeight: 'bold', fontSize: 18 }}>{this.props.state.pendingRowTotalPNL}</span></div>
                                    </div>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
                {/*End of pending Table div */}


                {/* end of  Last row Div Decision,Orders,Trades Button  div*/}
            </div >


        );
    }
}

export default Dashboard;
/**"url": "https://next-js-admin-sunny4943.vercel.app",**/