var Scrolly = React.createClass({
    getDefaultProps: function() {
        return {
            params: {}
        }
    },
    componentDidMount: function () {
        if (typeof scrolly === 'undefined') {
            return;
        }

        var area = this.refs.area.getDOMNode();

        scrolly.barNode(area, this.props.params);
    },
    render: function() {
        return (
            <div {...this.props}>
                <div className="scrolly react">
                    <div ref="area" className="area">
                        { this.props.children }
                    </div>
                </div>
                <div className="bar">
                    <div className="thumb" />
                </div>
            </div>
        );
    }
});
