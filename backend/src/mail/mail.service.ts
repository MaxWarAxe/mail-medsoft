import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateLetterDto } from './dto/create-letter-dto';
import { response, Response } from 'express';
import { Places } from './emums/place-enum';

@Injectable()
export class MailService {
    constructor(@InjectDataSource() private dataSource: DataSource){}

    async getInboxLetters(): Promise<string>{
        return await this.dataSource.query("select * from letters where place='inbox' order by date desc")
    }

    async getDraftLetters(): Promise<string>{
        return await this.dataSource.query("select * from letters where place='draft' order by date desc")
    }

    async getSendedLetters(): Promise<string>{
        return await this.dataSource.query("select * from letters where place='sended' order by date desc")
    }   

    async createLetter(createLetterDTO: CreateLetterDto): Promise<string>{
        let dbReponse: string
        dbReponse = await this.dataSource.query("insert into letters(sender,reciever,topic,body,date,place) values (?,?,?,?,?,?)",
                    [
                        createLetterDTO.sender,
                        createLetterDTO.reciever,
                        createLetterDTO.topic,
                        createLetterDTO.body,
                        createLetterDTO.date,
                        createLetterDTO.place
                    ]);
        return dbReponse;
    }

    async updateLetter(letterId: number, createLetterDTO: CreateLetterDto){
        let dbReponse: string
        dbReponse = await this.dataSource.query("update letters set sender=?,reciever=?,topic=?,body=?,date=?,place=? where id=?",
                    [
                        createLetterDTO.sender,
                        createLetterDTO.reciever,
                        createLetterDTO.topic,
                        createLetterDTO.body,
                        createLetterDTO.date,
                        createLetterDTO.place,
                        letterId
                    ]);
        return dbReponse;
    }

    async deleteLetter(letterId: number){
        let dbReponse: string
        dbReponse = await this.dataSource.query("delete from letters where id=?",
                    [
                        letterId
                    ]);
        return dbReponse;
    }

    async moveLetterToPlace(letterId: number,place: Places){
        let dbReponse: string
        dbReponse = await this.dataSource.query("update letters set place=? where id=?",
                    [
                        place,
                        letterId
                    ]);
        return dbReponse;
    }

    async addRandomMail(){
        let randomAmount = Math.floor(Math.random() * 4)
        let dbReponse: string
        for(let i = 0; i < randomAmount; i++){
            dbReponse = await this.dataSource.query("insert into letters(sender,reciever,topic,body,date,place) values (?,?,?,?,?,?)",
                        [
                            (Math.random() + 1).toString(36).substring(7) + "@mail.ru",
                            "me@mail.ru",
                            (Math.random() + 1).toString(36).substring(6),
                            (Math.random() + 1).toString(36).substring(6),
                            new Date().toLocaleString('ru'),
                            Places.inbox,
                        ]);
        }

        return dbReponse;
    }
}
