import React from "react";
class BillPay extends React.Component {
    constructor(props) {
        super(props);
        this.onHandleChange.bind(this);
        this.onHandleButtonClick.bind(this);

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
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                <h1> Bill Pay Page</h1>
            </div>


        );
    }
}

export default BillPay;
