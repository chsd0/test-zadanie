import { GroupInt } from "@api";

interface maplike {
    [key: string]: number
}

interface maplikeString {
    [key: string]: string
}

const hierarchy: maplike = {
    'UNREACHABLE': 5,
    'SHUTDOWN': 4,
    'UP': 1,
    'WARNING': 2,
    'CRITICAL': 3,
    'DOWN': 6,
}

export const statusToColor: maplikeString = {
    'UNREACHABLE': 'black',
    'SHUTDOWN': 'grey',
    'UP': 'lightgreen',
    'WARNING': 'yellow',
    'CRITICAL': 'red',
    'DOWN': 'darkred',
}

export const getStatus = (group: GroupInt | null): undefined | string => {
    if(!group) {
        return undefined;
    }
    let status = 0;
    let currentCaption= 'aa';
    for(let node of group.nodes) {
        const currentLevel = hierarchy[node.status.description];
        if(currentLevel > status) {
            status = currentLevel;
            currentCaption = node.status.description;
            
            if(status === 6) {
                return node.status.description;
            }
        }
    };

    return currentCaption;
}