import { RoomInterface } from './IRoom';
import { RoomTypesRoomRankInterface } from './IRoomTypesRoomRank';

export interface RoomTypesInterface {
  ID: number;
  Name: string;
  PricePerNight: number;
  HowLongTime: number;
  PaymentMethod: string;
  Description: string;
  Rooms?: RoomInterface[];
  RoomTypesRoomRanks?: RoomTypesRoomRankInterface[];
}
