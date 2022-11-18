import {useState} from "react";
import {Box} from "@mui/material";
import PartyCard from "./PartyCard";
import PlayerSummaryDialog from "./Dialogs/PlayerSummaryDialog";
import NewPartyCard from "./NewPartyCard";
import ScoringCard from "./ScoringCard";
import LeavePartyDialog from "./Dialogs/LeavePartyDialog";

function ListParties({user, parties, onRefreshParties, onDisplaySnackbar}) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isPlayerDialogOpen, setPlayerDialogOpen] = useState(false);
    const [isLeaveDialogOpen, setLeaveDialogOpen] = useState(false);
    const [selectedParty, setSelectedParty] = useState(null);

    const handleLeaveDialogClose = () => {
        setLeaveDialogOpen(false);
        setSelectedParty(null);
    }

    const handlePartyRowClicked = (party, player) => {
        setSelectedParty(party);
        setSelectedPlayer(player);
        setPlayerDialogOpen(true);
    }

    const handlePlayerDialogClose = () => {
        setPlayerDialogOpen(false);
        setSelectedPlayer(null);
        setSelectedParty(null);
    }

    const handleLeaveParty = (party) => {
        setSelectedParty(party);
        setLeaveDialogOpen(true);
    }

    const isPartyOwner = selectedParty && selectedParty.owner.id === user.uid;
    const didSelectSelf = selectedPlayer && selectedPlayer.id === user.uid;

    return (
        <Box>
            <NewPartyCard onDisplaySnackbar={onDisplaySnackbar} onRefreshParties={onRefreshParties}/>
            {parties.map(party => <PartyCard key={party.code} user={user} party={party}
                                             onRefreshParties={onRefreshParties} onLeaveParty={handleLeaveParty}
                                             onPartyRowClicked={handlePartyRowClicked}
                                             onDisplaySnackbar={onDisplaySnackbar}/>)}
            <ScoringCard/>
            <PlayerSummaryDialog player={selectedPlayer} isPartyOwner={isPartyOwner} didSelectSelf={didSelectSelf}
                                 open={isPlayerDialogOpen} onLeaveParty={handleLeaveParty}
                                 onClose={handlePlayerDialogClose}/>
            <LeavePartyDialog user={user} party={selectedParty} open={isLeaveDialogOpen}
                              onClose={handleLeaveDialogClose} onDisplaySnackbar={onDisplaySnackbar}
                              onRefreshParties={onRefreshParties}/>
        </Box>
    )
}

export default ListParties;