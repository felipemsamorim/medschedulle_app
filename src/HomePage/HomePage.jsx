import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DataGrid, GridColumn } from 'rc-easyui';
import { medAvActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedIni: new Date()
        }
    }
  
    componentDidMount() {
        this.props.dispatch(medAvActions.getAll());
    }
    componentDidUpdate() {
        let p = this.props
        console.log(p)
    }

    render() {
        const { ma } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>Dashboard - availabilities</h3>
                <div>
                    <DataGrid data={ma.items} style={{ height: 250 }}>
                        <GridColumn field="id" title="Item ID"></GridColumn>
                        <GridColumn field="start" title="dt_start"></GridColumn>
                        <GridColumn field="end" title="dt_end" align="right"></GridColumn>
                        <GridColumn field="med" title="name" align="right"></GridColumn>
                    </DataGrid>
                </div>

                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };