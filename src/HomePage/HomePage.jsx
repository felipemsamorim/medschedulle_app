import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DataGrid, GridColumn, Form, Dialog, TextBox, Calendar, Label, LinkButton, ButtonGroup } from 'rc-easyui';
import { medAvActions, medsActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editingRow: null,
            model: {},
            rules: {
                'start': 'required',
                'end': 'required',
            },
            errors: {},
            title: '',
            closed: true
        }
    }

    componentDidMount() {
        this.props.dispatch(medAvActions.getAll());
        this.props.dispatch(medsActions.getOneSession());
        this.setState({ data: this.props.ma })
    }
    componentDidUpdate() {
    }

    getError(name) {
        const { errors } = this.state;
        return errors[name] && errors[name].length
            ? errors[name][0]
            : null;
    }
    editRow(row) {
        row.start = this.formatDate(new Date(row.start))
        row.end = this.formatDate(new Date(row.end))
        this.setState({
            editingRow: row,
            model: Object.assign({}, row),
            title: 'Edit',
            closed: false
        });
    }
    newRow() {
        let row = {id: 0, start:new Date(), end: new Date(), med: 2}
        this.setState({
            editingRow: {},
            model: {},
            title: 'New Availability',
            closed: false
        });
    }
    saveRow() {
        this.form.validate(() => {
            if (this.form.valid()) {
                this.props.dispatch(medAvActions.update(this.state.model))
                this.props.dispatch(medAvActions.getAll())
                this.setState({ closed: true })
            }
        })
    }
    deleteRow(row) {
        this.setState({
            data: this.state.data.filter(r => r !== row)
        })
    }
    formatDate(date,add = false) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate() + (!add ? 1 : 0);
        return [d, m, y].join('/')
    }
    handleStartSelectionChange(selection) {
        let model = JSON.parse(JSON.stringify(this.state.model))
        model.start = this.formatDate(selection,true)
        this.setState({
            model: model
        })
    }
    handleEndSelectionChange(selection) {
        let model = JSON.parse(JSON.stringify(this.state.model))
        model.end = this.formatDate(selection,true)
        this.setState({
            model: model
        })
    }

    renderDialog() {
        const row = this.state.model;
        const { title, closed, rules } = this.state;
        return (
            <Dialog modal title={title} closed={closed} onClose={() => this.setState({ closed: true })}>
                <div className="f-full">
                    <Form className="f-full"
                        ref={ref => this.form = ref}
                        model={row}
                        rules={rules}
                        onValidate={(errors) => this.setState({ errors: errors })}
                    >

                        <div style={{ marginBottom: 10 }}>
                            <Label htmlFor="start">Name:</Label>
                            <Calendar
                                style={{ width: 250, height: 250 }}
                                onSelectionChange={this.handleStartSelectionChange.bind(this)}
                            />
                            <TextBox inputId="start" name="start" value={row.start} style={{ width: 220 }}></TextBox>
                            <div className="error">{this.getError('start')}</div>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <Label htmlFor="end">Name:</Label>

                            <Calendar
                                style={{ width: 250, height: 250 }}
                                onSelectionChange={this.handleEndSelectionChange.bind(this)}
                            />
                            <TextBox inputId="end" name="end" value={row.end} style={{ width: 220 }}></TextBox>
                            <div className="error">{this.getError('end')}</div>
                        </div>

                    </Form>
                </div>
                <div className="dialog-button">
                    <LinkButton style={{ width: 80 }} onClick={() => this.saveRow()}>Save</LinkButton>
                    <LinkButton style={{ width: 80 }} onClick={() => this.setState({ closed: true })}>Close</LinkButton>
                </div>
            </Dialog>
        )
    }

    render() {
        const { ma } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>Dashboard - availabilities</h3>
                <div>
                <LinkButton iconCls="icon-add" onClick={() => this.newRow()}>Add</LinkButton>
                    <DataGrid data={ma.items} style={{ height: 250 }}>
                        <GridColumn field="start" align="center" render={({ row }) => {
                            var d = new Date(row.start);
                            var y = d.getFullYear();
                            var m = d.getMonth() + 1;
                            var d = d.getDate() + 1;
                            return d + '/' + m + '/' + y;
                        }}
                            title="dt_start">
                        </GridColumn>
                        <GridColumn field="end" title="dt_end" align="center" render={({ row }) => {
                            var d = new Date(row.end);
                            var y = d.getFullYear();
                            var m = d.getMonth() + 1;
                            var d = d.getDate() + 1;
                            return d + '/' + m + '/' + y;
                        }}></GridColumn>
                        <GridColumn field="act" title="Actions" align="center" width={110}
                            render={({ row }) => (
                                <div>
                                    <ButtonGroup>
                                        <LinkButton onClick={() => this.editRow(row)}>Edit</LinkButton>
                                        <LinkButton onClick={() => this.deleteRow(row)}>Delete</LinkButton>
                                    </ButtonGroup>
                                </div>
                            )}
                        />
                    </DataGrid>
                    {this.renderDialog()}
                </div>

                <button>
                    <Link to="/login">Logout</Link>
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };