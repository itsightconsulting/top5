var moment = require("moment");

function agregarCamposBaseAuditoria(object, DataTypes) {

    object.flagActive = {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    };
    object.flagEliminate = {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    };
    object.createdBy = {
        type: DataTypes.INTEGER,
        allowNull: true,
    };
    object.updatedBy = {
        type: DataTypes.INTEGER,
        allowNull: true,
    };
    // object.createdHourAt = {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // };    
    // object.updatedHourAt = {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    // };
    return object;
}
function agregarCamposBase(object, DataTypes) {
    object.flagActive = {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    };
    object.flagEliminate = {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    };
    return object;
}
function get_Date() {
    let today = new Date();
    let milliseconds = today.getMilliseconds()
    let seconds = today.getSeconds();
    let minutes = today.getMinutes();
    let hour = today.getHours();

    let month = parseInt(today.getMonth() + 1);
    let day = today.getDate();
    let year = today.getFullYear();

    let dateFormat = [month, day, year].join("/");
    let timeFormat = [hour, minutes, seconds, milliseconds].join(":");
    // console.log(dateFormat, timeFormat);
    let date = dateFormat + " " + timeFormat;
    // let date = parseInt(today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    return date;
}
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function monthNamefromDate(date) {
    var monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];

    // var day = date.getDate();
    var monthIndex = date.getMonth();
    // var year = date.getFullYear();
    return monthNames[monthIndex];
}

String.Format = function (b) {
    var a = arguments;
    return b.replace(/(\{\{\d\}\}|\{\d\})/g, function (b) {
        if (b.substring(0, 2) == "{{") return b;
        var c = parseInt(b.match(/\d/)[0]);
        return a[c + 1]
    })
};
function formatoPublicacion(datePublicado) {
    let datePublicadoStr = "";
    if (datePublicado) {
        let dateNow = new moment();
        var datePublicado = moment(datePublicado).format();
        console.log(datePublicado, dateNow);
        // let durationDays = moment(dateNow).isAfter(datePublicado, 'day');
        // let durationHours = moment(dateNow).isAfter(datePublicado, 'hour');
        // let durationMinutes = moment(dateNow).isAfter(datePublicado, 'minute');

        // let durationDays = duration.asDays(); 
        // let durationHours = duration.asHours();
        // let durationMinutes = duration.asMinutes();

        let durationDays = moment.duration().asDays(dateNow.diff(datePublicado));
        let durationHours = moment.duration().asHours(dateNow.diff(datePublicado));
        let durationMinutes = moment.duration().asMinutes(dateNow.diff(datePublicado));
        console.log(durationDays, durationHours, durationMinutes);
        if (durationDays) {
            // SI se registro hace más de un día en el formato: Publicado hace x días
            datePublicadoStr = `Publicado hace ${durationDays} día${durationDays == 1 ? "" : "s"}`;
        } else if (durationHours) {
            datePublicadoStr = `Publicado hace ${durationHours} horas${durationHours == 1 ? "" : "s"}`;
        } else if (durationMinutes) {
            // Si se registro hace menos de una hora en el formato: Publicado hace x minutos
            datePublicadoStr = `Publicado hace ${durationMinutes} minuto${durationMinutes == 1 ? "" : "s"}`;
        } else {
            datePublicadoStr = `Publicado hace un momento`;
        }

        return datePublicadoStr;
    }
}
module.exports = {
    agregarCamposBaseAuditoria,
    agregarCamposBase,
    get_Date,
    monthNamefromDate,
    formatAMPM,
    formatoPublicacion
}