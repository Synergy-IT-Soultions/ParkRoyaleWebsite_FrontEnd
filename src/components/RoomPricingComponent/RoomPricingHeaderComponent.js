import { Component } from "react";

class RoomPricingHeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data} = this.props;
        const containerHeader = data.containerHeader;
        const containertextLabelValue = data.containerTextInfo[0].containertextLabelValue;

        return (
            <div className="section-title">
                <h2>{containerHeader}</h2>
                <p>{containertextLabelValue}</p>
            </div>
        );
    }
}

export default RoomPricingHeaderComponent;