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
    // object.FechaCreacion = {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // };
    object.updatedBy = {
        type: DataTypes.INTEGER,
        allowNull: true,
    };
    // object.FechaModificacion = {
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

module.exports = {
    agregarCamposBaseAuditoria,
    agregarCamposBase,
    get_Date,
    monthNamefromDate
}