import NotificatioAntd from 'antd/lib/notification';
import styles from './styles.scss';

var notificationList = [];

export default class NotificationApi {

    static open (key, message, description, duration, btn) {
        notificationList.push(key);
        NotificatioAntd.open({
            key,
            message: message,
            description: description,
            duration: duration,
            btn
        });
    }

    static success (key, message, description, duration, btn) {
        notificationList.push(key);
        NotificatioAntd.success({
            key,
            message: message,
            description: description,
            duration: duration,
            btn
        });
    }

    static warning (key, message, description, duration, btn) {
        notificationList.push(key);
        NotificatioAntd.warning({
            key,
            message: message,
            description: description,
            duration: duration,
            btn
        });
    }

    static error (key, message, description, duration, btn) {
        notificationList.push(key);
        NotificatioAntd.error({
            key,
            message: message,
            description: description,
            duration: duration,
            btn
        });
    }

    static close (key) {
        NotificatioAntd.close(key);
        var array = [2, 5, 9];
        var index = notificationList.indexOf(key);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    static destroy () {
        // Esse metodo "quebra" todo o sistema de notificação
        // NotificatioAntd.destroy();
        notificationList.forEach((key) => {
            NotificatioAntd.close(key);
        });
        notificationList = [];
    }

}
