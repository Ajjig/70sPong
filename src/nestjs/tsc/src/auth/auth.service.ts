import { Injectable } from '@nestjs/common';
import { User, Prisma, PrismaClient } from '.prisma/client';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

export type UserFilted = {
  id: number;
  email: string;
  name: string;
  username: string | null;
  avatarUrl: string;
  onlineStatus: string;
  blockedUsernames: string[];
  createdAt: Date;
  updatedAt: Date;
  confirmed: boolean;
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private JwtService: JwtService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        username: data.username,
        Userstats: {
          create: {
            wins: 0,
            losses: 0,
            ladder: 'bronze',
            achievements: [],
          },
        },
        blockedUsernames: [],
      },
    });
  }

  async findUserById(id: number): Promise<UserFilted> {
    return this.prisma.user.findUnique({
      where: { id: id },

      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        avatarUrl: true,
        onlineStatus: true,
        blockedUsernames: true,
        createdAt: true,
        updatedAt: true,
        confirmed: true,
      },
    });
  }

  async findUserByUsername(username: string): Promise<UserFilted> {
    return this.prisma.user.findUnique({
      where: { username: username },

      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        avatarUrl: true,
        onlineStatus: true,
        blockedUsernames: true,
        createdAt: true,
        updatedAt: true,
        confirmed: true,
      },
    });
  }

  async findOrCreateUser(profile: any): Promise<UserFilted> {
    let user: User | UserFilted = await this.findUserByUsername(
      profile.username,
    );

    if (!user) {
      user = await this.createUser({
        email: profile.emails[0].value,
        name: profile.displayName,
        username: profile.username,
        oauthId: '',
      });
    }
    return user as UserFilted;
  }

  async login(user: any) {
    const payload = { name: user.name, username: user.username, sub: user.id };
    return { access_token: this.JwtService.sign(payload) };
  }
}