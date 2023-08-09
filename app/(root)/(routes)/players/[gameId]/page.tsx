"use client";

import { useParams } from "next/navigation";

interface IPlayersGamePageProps {
}

const PlayersGamePage: React.FunctionComponent<IPlayersGamePageProps> = (props) => {
    const params = useParams();
    return (<div>Players game: {params.gameId}</div>);
};

export default PlayersGamePage;
