import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const [accessToken, refreshToken] = this.getJwtTokens({
      id: user.id,
    });

    delete user.password;
    delete user.isActive;

    return {
      user,
      accessToken,
      refreshToken,
      type: 'Bearer',
    };
  }

  async signup(signupDto: SignupDto) {
    const { email } = signupDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    try {
      const { password, ...userData } = signupDto;

      const newUser = this.userRepository.create({
        ...userData,
        password: await bcrypt.hash(password, 10),
      });

      await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDBExceptions(error);
    }

    return {
      success: true,
      message: 'User created successfully',
    };
  }

  refreshTokens(user: User) {
    const [accessToken, refreshToken] = this.getJwtTokens({ id: user.id });
    return { user, accessToken, refreshToken, type: 'Bearer' };
  }

  private getJwtTokens(payload: JwtPayload): string[] {
    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    });
    return [token, refreshToken];
  }

  private handleDBExceptions(error: any) {
    console.log(error);
    this.logger.error(`${error.code} - ${error.detail}`);
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(
      'An error occurred, please try again, if the problem persists, contact the support team.',
    );
  }
}
