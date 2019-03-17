module.exports = {
    name = 'Permissions',
    alias =['permissions'],
    helptext = 'Check permissions for user',
    helphide = false,
    permissions =['MANAGE_ROLES_OR_PERMISSIONS'],
    args =['@Tag'],
    category = 'admin',
    command = (client, msg) => {
        if (msg.mentions.members.array().length != 1)
            return;

        var perms = msg.mentions.members.first().permissions.toArray(true);

        var message = "";
        for (var i = 0; i < perms.length; i++) {
            message += perms[i];
            if (i != perms.length - 1)
                message += ", ";
        }
        msg.reply(message);
    }
}