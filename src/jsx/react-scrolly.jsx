var Scrolly = React.createClass({
    getDefaultProps: function() {
        return {
            params: {}
        }
    },
    getID: function () {
        return this.id;
    },
    componentDidMount: function () {
        if (typeof scrolly === 'undefined') {
            return;
        }

        // test
        this.id = scrolly.barNode(
            this.refs.area,
            this.props.params
        );
    },
    componentWillUnmount: function() {
        if (this.id) {
            scrolly.dispose(this.id);
            this.id = false;
        }
    },
    componentDidUpdate: function() {
        if (this.id) {
            scrolly.update(this.id);
        }
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

if (typeof module !== 'undefined') {
    module.exports = Scrolly;
}
