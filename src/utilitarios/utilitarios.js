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
        type: DataTypes.BOOLEAN,
        allowNull: false,
    };
    object.ModificadoPor = {
        type: DataTypes.STRING(100),
        allowNull: true,
    };
    object.FechaModificacion = {
        type: DataTypes.STRING(100),
        allowNull: true,
    };
    return object;
}

module.exports = {
    agregarCamposBase
}