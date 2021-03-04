import {Component} from 'react'
import connect from "react-redux/es/connect/connect"
import axios from "axios"
import {withRouter} from "react-router-dom";
import {logout} from "../state/actions/session.actions";

const mapStateToProps = (state, ownProps) => {
    return {
        authToken: (state.session.currentUser || {}).access,
        ...ownProps
    }
};

class Config extends Component {
    getToken = () => {
        return this.props.authToken;
    };

    componentWillMount(){
        const getToken = this.getToken;
        const getDispatcher = this.props.dispatch;
        axios.interceptors.request.use(function (config) {
            try{
                const authToken =  getToken();
                if(!!authToken){
                    config.headers['Authorization'] = `Bearer ${authToken}`;
                }
            }catch(e){}
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error && error.response && error.response.status === 401) {
                getDispatcher(logout());
            }
            return Promise.reject(error);
        });
    }
    render() {
        return this.props.children
    }
}

export default withRouter(connect(mapStateToProps)(Config));