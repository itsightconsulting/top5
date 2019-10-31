var moment = require("moment");
const _MS_PER_DAY = (1000 * 60 * 60 * 24);
const _MS_PER_HOUR = (1000 * 60 * 60 * 24);
const _MS_PER_MINUTE = 1000 * 60;
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
        // references: {
        //     model: 'Usuario',
        //     key: 'id'
        // }
    };
    object.updatedBy = {
        type: DataTypes.INTEGER,
        allowNull: true,
    };

    object.updatedAtStr = {
        type: DataTypes.VIRTUAL,
        get() {
            let date = new Date(this.updatedAt);
            let dateStr = "";
            if (date) {
                let dateNow = new Date();
                let hourFormat = formatAMPM(date);

                if (dateNow.getFullYear() === date.getFullYear())
                    dateStr = date.getDate() + ' ' + monthNamefromDate(date) + ' ' + hourFormat;
                else dateStr = date.getDate() + ' ' + monthNamefromDate(date) + ' del ' + date.getFullYear() + ' ' + hourFormat;
            }
            return dateStr;
        }
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

String.prototype.Format = function (b) {
    var a = arguments;
    return b.replace(/(\{\{\d\}\}|\{\d\})/g, function (b) {
        if (b.substring(0, 2) == "{{") return b;
        var c = parseInt(b.match(/\d/)[0]);
        return a[c + 1]
    })
};
function formatoPublicacion(datePublicadoStr = "") {
    // let datePublicadoStr = "";
    if (datePublicadoStr) {
        const dateNow = new Date();
        const datePublicado = new Date(datePublicadoStr);

        const utcNow = Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
        const utcPublicado = Date.UTC(datePublicado.getFullYear(), datePublicado.getMonth(), datePublicado.getDate());

        const durationDays = Math.floor((utcNow - utcPublicado) / _MS_PER_DAY);
        const durationHours = Math.ceil(Math.abs(dateNow - datePublicado) / _MS_PER_HOUR);
        const durationMinutes = Math.round((dateNow.getTime() - datePublicado.getTime()) / _MS_PER_MINUTE);

        console.log(durationDays, durationHours, durationMinutes);
        if (durationDays > 0 && durationHours >= 24) {
            // SI se registro hace más de un día en el formato: Publicado hace x días
            datePublicadoStr = `Publicado hace ${durationDays} día${durationDays == 1 ? "" : "s"}`;
        } else if (durationHours > 0 && durationMinutes >= 60) {
            datePublicadoStr = `Publicado hace ${durationHours} hora${durationHours == 1 ? "" : "s"}`;
        } else if (durationMinutes > 0) {
            // Si se registro hace menos de una hora en el formato: Publicado hace x minutos
            datePublicadoStr = `Publicado hace ${durationMinutes} minuto${durationMinutes == 1 ? "" : "s"}`;
        } else {
            datePublicadoStr = `Publicado hace un momento`;
        }

        return datePublicadoStr;
    }
}
function formatoMeEncanta(cant = 0) {
    let formatoMeEncantaStr = "";
    let millon = 10e5;
    if (cant < millon) {
        formatoMeEncantaStr = cant;
    } else if (cant >= millon) {
        formatoMeEncantaStr = (cant / millon) + " millones";
    }
    return formatoMeEncantaStr = formatoMeEncantaStr + " me encanta";
}
function alwaysParseString(word = "") {
    return `${word}`;
};
module.exports = {
    agregarCamposBaseAuditoria,
    agregarCamposBase,
    get_Date,
    monthNamefromDate,
    formatAMPM,
    formatoPublicacion,
    alwaysParseString,
    formatoMeEncanta
}