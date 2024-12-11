import {Places} from '../emums/place-enum'

export class CreateLetterDto{
    sender: string;
    reciever: string;
    topic: string;
    body: string;
    date: Date;
    place: Places;
}