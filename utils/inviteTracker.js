const invitesCache = new Map();

async function updateInvitesCache(guild) {
    const invites = await guild.invites.fetch();
    invitesCache.set(guild.id, new Map(invites.map(invite => [invite.code, invite.uses])));
}

async function checkInviter(member) {
    const cachedInvites = invitesCache.get(member.guild.id);
    const newInvites = await member.guild.invites.fetch();

    for (const [code, invite] of newInvites) {
        const oldUses = cachedInvites.get(code);
        if (oldUses < invite.uses) {
            return invite.inviter;
        }
    }

    return null;
}

module.exports = { updateInvitesCache, checkInviter };