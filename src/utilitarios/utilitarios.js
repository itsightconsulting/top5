function agregarCamposBase(object, DataTypes) {

    object.FlagActivo = {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    };
    object.FlagEliminado = {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    };
    object.CreadoPor = {
        type: DataTypes.STRING(100),
        allowNull: false,
    };
    object.FechaCreacion = {
        type: DataTypes.DATE,
        allowNull: false,
    };
    object.ModificadoPor = {
        type: DataTypes.STRING(100),
        allowNull: true,
    };
    object.FechaModificacion = {
        type: DataTypes.DATE,
        allowNull: true,
    };
    return object;
}
function get_Date() {
    let today = new Date();
    let date = parseInt(today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    return date;
}
module.exports = {
    agregarCamposBase,
    get_Date
}