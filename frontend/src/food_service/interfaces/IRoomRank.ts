import { RoomTypesRoomRankInterface } from './IRoomTypesRoomRank';

export interface RoomRankInterface {
  ID: number;
  Name: string;
  NumberPerRank: number;
  Description: string;
  RoomTypesRoomRanks?: RoomTypesRoomRankInterface[];
}
