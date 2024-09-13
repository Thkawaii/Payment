import { RoomRankInterface } from './IRoomRank';
import { RoomTypesInterface } from './IRoomTypes';

export interface RoomTypesRoomRankInterface {
  ID: number;
  RoomRankID: number | null;
  RoomRank?: RoomRankInterface;
  RoomTypesID: number | null;
  RoomTypes?: RoomTypesInterface;
}
