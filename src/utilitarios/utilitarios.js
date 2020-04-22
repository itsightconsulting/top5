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
<<<<<<< HEAD
    object.createdDate = {
        type: DataTypes.DATE,
        allowNull: true
    };
    object.updatedDate = {
        type: DataTypes.DATE,
        allowNull: true
    };
    object.updatedDateStr = {
        type: DataTypes.VIRTUAL,
        get() {
            let date = new Date(this.updatedDate);
=======

    object.updatedAtStr = {
        type: DataTypes.VIRTUAL,
        get() {
            let date = new Date(this.updatedAt);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
=======
    // object.createdHourAt = {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // };    
    // object.updatedHourAt = {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    // };
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
<<<<<<< HEAD
    object.createdDate = {
        type: DataTypes.DATE,
        allowNull: true
    };
    object.updatedDate = {
        type: DataTypes.DATE,
        allowNull: true
    };
=======
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
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
function formatoFechaStr(dateDb) {
    let date = new Date(dateDb);
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

        // console.log(durationDays, durationHours, durationMinutes);
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
<<<<<<< HEAD
=======
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
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
function alwaysParseString(word = "") {
    if (word) {
        return CleanWord(word).trim()
    } else {
        return "";
    }
};
function CleanWord(filtro) {
    return replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(
        replace(replace(replace(replace(replace(replace(replace(replace(
            replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(
                replace(filtro.toLowerCase(), 'Á', 'A'),
                'á', 'a'),
                'à', 'a'),
                'â', 'a'),
                'ä', 'a'),
                'ã', 'a'),
                'å', 'a'),
                'À', 'A'),
                'Â', 'A'),
                'Ä', 'A'),
                'Ã', 'A'),
                'Å', 'A'),
                'É', 'E'),
                'ò', 'o'),
                'ô', 'o'),
                'ö', 'o'),
                'õ', 'o'),
                'Ú', 'U'),
                'Ù', 'U'),
                'Û', 'U'),
                'Ü', 'U'),
                'ú', 'u'),
                'ù', 'u'),
                'û', 'u'),
                'ü', 'u'),
                'Ý', 'Y'),
                'ý', 'y'),
                'ÿ', 'y'),
                'ñ', 'n'),
            'Ñ', 'N'),
            'È', 'E'),
            'Ê', 'E'),
            'Ë', 'E'),
            'é', 'e'),
            'è', 'e'),
            'ê', 'e'),
            'ë', 'e'),
        'Í', 'I'),
        'Ì', 'I'),
        'Î', 'I'),
        'Ï', 'I'),
        'í', 'i'),
        'ì', 'i'),
        'î', 'i'),
        'ï', 'i'),
        'ó', 'o'),
        'Ó', 'O'),
        'Ò', 'O'),
        'Ô', 'O'),
        'Ö', 'O'),
        'Õ', 'O')

}
function replace(filtro, char, newChar) {
    return filtro.replace(char, newChar);
}
module.exports = {
    agregarCamposBaseAuditoria,
    agregarCamposBase,
    get_Date,
    monthNamefromDate,
    formatAMPM,
<<<<<<< HEAD
    alwaysParseString,
=======
    formatoPublicacion,
    alwaysParseString,
    formatoMeEncanta,
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    formatoFechaStr
}