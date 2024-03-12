import { IAreaRepository } from "../../domain/repositoryInterfaces/areaRepositoryInterface";
import { IHotelRepository } from "../../domain/repositoryInterfaces/hotelRepositoryInterface";
import { IOnsenRepository } from "../../domain/repositoryInterfaces/onsenRepositoryInterface";
import { IUserRepository } from "../../domain/repositoryInterfaces/userRepositoryInterface";

export const AreaRepositoryMock = (): IAreaRepository => ({
  read: vi.fn(),
  readAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
});
export const OnsenRepositoryMock = (): IOnsenRepository => ({
  read: vi.fn(),
  readAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
});
export const HotelRepositoryMock = (): IHotelRepository => ({
  read: vi.fn(),
  readAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
});
export const UserRepositoryMock = (): IUserRepository => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
});
