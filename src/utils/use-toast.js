import React from "react";
import { Toast, Alert } from "react-bootstrap";

import "./ToastStyle.css";

const toastContext = React.createContext();

export function ProvideToast({children}){
    const toaster = useProvideToast();

    const closeToast = (event, toast) => {
        if(event){
            // We closed it with a click
            const toastElement = event.target.parentElement.parentElement.parentElement;
            toastElement.classList.add("removing-toast");

            setTimeout(() => toaster.hide(toast), 200);
        } else {
            toaster.hide(toast);
        }
    }

    return (
        <toastContext.Provider value={toaster}>
            {/* Render the toasts on top of all other content. Don't show more than 5 at a time. */}
            {toaster.currentAlert !== null &&<div className="alert-wrapper">
                <Alert 
                    variant={toaster.currentAlert.type ? toaster.currentAlert.type : "danger"}
                    show={toaster.showAlert}
                    onClose={toaster.hideAlert} dismissible>
                    <Alert.Heading>{toaster.currentAlert.header}</Alert.Heading>
                    <p>
                    {toaster.currentAlert.message}
                    </p>
                </Alert>
            </div>}
            <div className="toast-wrapper">
                {toaster.toastList.map((toast, index) => {
                    return (<>
                        {index < 5 &&
                        (<Toast
                            key={toast.header + toast.message}
                            className="adding-toast custom-toast"
                            show={toaster.showToastList[index]}
                            onClose={(event) => closeToast(event, toast)}
                            animation={false}
                            delay={toast.getRemainingTime()}
                            autohide
                        >
                            <Toast.Header>
                            <strong className="mr-auto">{toast.header}</strong>
                            <small></small>
                            </Toast.Header>
                            <Toast.Body>{toast.message}</Toast.Body>
                        </Toast>)}
                        {index === 5 &&
                        (<Toast
                            key={toast.header + toast.message}
                            className="adding-toast custom-toast"
                            show={toaster.showToastList[index]}
                            onClose={() => closeToast(undefined, toast)}
                            delay={1}
                            autohide>
                            <Toast.Header>
                            <strong className="mr-auto">{toast.header}</strong>
                            <small></small>
                            </Toast.Header>
                            <Toast.Body>{toast.message}</Toast.Body>
                        </Toast>)}
                    </>)
                    })}
            </div>
            {children}
        </toastContext.Provider>
    )
}

export const useToast = () => {
    return React.useContext(toastContext);
}

export class ToastData {
    constructor(header, message) {
        this.header = header;
        this.message = message;
        this.initTime = Date.now();
        this.lifetime = 5000;
    }

    getRemainingTime = () => {
        return this.lifetime - (Date.now() - this.initTime);
    }

    isAlive = () => {
        return this.lifetime < (Date.now() - this.initTime);
    }
}

export class AlertData {
    constructor(header, message, type) {
        this.header = header;
        this.message = message;
        this.type = type;
    }
}

function useProvideToast(){
    const [toastList, setToastList] = React.useState([]);
    const [showToastList, setShowToastList] = React.useState([]);
    const [currentAlert, setAlert] = React.useState(null);
    const [showAlert, setShowAlert] = React.useState(false);

    const notify = (header, message) => {
        let toast = new ToastData(header, message)

        // Add a toast
        const newToastList = [toast, ...toastList];

        // Show it by default
        const newShowToastList = [true, ...showToastList];

        setToastList(newToastList);
        setShowToastList(newShowToastList);
    }

    const hide = (toast) => {
        const index = toastList.indexOf(toast);
        const newShowToastList = [...showToastList];
        newShowToastList[index] = false;
        setShowToastList(newShowToastList);
    }

    const alert = (header, message, type) => {
        let alert = new AlertData(header, message, type);
        setAlert(alert);
        setShowAlert(true);
    }

    const hideAlert = () => {
        setShowAlert(false);
    }

    return {
        toastList,
        showToastList,
        notify,
        hide,
        currentAlert,
        showAlert,
        alert,
        hideAlert
    }
}
