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
        type: DataTypes.STRING(100),
        allowNull: false,
    };
    // object.FechaCreacion = {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // };
    object.updatedBy = {
        type: DataTypes.STRING(100),
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

module.exports = {
    agregarCamposBaseAuditoria,
    agregarCamposBase,
    get_Date
}