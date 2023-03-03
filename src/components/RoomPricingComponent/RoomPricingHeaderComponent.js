import { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import ContainerEditComponent from "../../CommonComponents/ContainerEditComponent/ContainerEditComponent";
import _ from 'lodash'

class RoomPricingHeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data, isAdmin} = this.props;
        const containerHeader = data.containerHeader;
        const containertextLabelValue = data.containerTextInfo[0].containertextLabelValue;

        

        return (
            <div className="section-title">
                <h2>{containerHeader}{isAdmin?<ContainerEditComponent data={data}/>:""}</h2>
                <p>{containertextLabelValue}</p>
            </div>
        );
    }
}

const mapStateToPros = state => {
    return {
        isAdmin: _.isEqual(state?.userInfo?.role, "Admin"),
        // isAdmin:true,
        token: state.userInfo.token
    };
};
const mapDispatchToProps = dispatch => {
    return {
        handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
        handleDecrementClick: () => dispatch({ type: 'DECREMENT' })
    }
};

export default connect(mapStateToPros, undefined)(RoomPricingHeaderComponent);