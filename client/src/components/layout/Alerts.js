import React,{useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertContext from '../context/alert/alertContext';

const Alerts = () => {
const alertContext = useContext(AlertContext);
const {alerts} = alertContext;    
    return (
      <div className="container mt-3">        
           {alerts.length > 0 && alerts.map((alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`} role="alert">
            <FontAwesomeIcon icon={['fas', 'exclamation-circle']}/> {alert.msg}
            </div>
        )))}
      </div>
    )
}


export default Alerts;