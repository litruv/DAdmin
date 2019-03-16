exports.name = 'Permissions'
exports.alias = ['permissions']
exports.helptext = 'Check permissions for user'
exports.helphide = false
exports.permissions = ['MANAGE_ROLES_OR_PERMISSIONS']
exports.args = ['@Tag']
exports.category = 'admin'
exports.command = (client, msg) => {
    if(msg.mentions.members.array().length != 1)
        return;
    
    var perms = msg.mentions.members.first().permissions.toArray(true);

    var message = "";
    for (var i = 0; i < perms.length; i++) {
        message += perms[i];
        if (i != perms.length -1)
        message += ", ";
    }
    msg.reply(message);
}