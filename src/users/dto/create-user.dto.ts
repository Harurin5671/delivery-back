import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ValidRoles } from "src/auth/interfaces";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEnum(ValidRoles)
    @IsOptional()
    role?: ValidRoles;
}
