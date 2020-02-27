import { decode } from 'jwt-simple';
import { injectable } from 'inversify';
import { User } from '../models/user.model';

@injectable()
export class UserService {

    public isAuthenticated(): boolean {
        const token = this.getDecodedToken();
        if(!token) {
            return false;
        }

        return true;
    }

    public getUser(): User {
        if(!this.isAuthenticated()) {
            return User.guest();
        }

        const token = this.getDecodedToken();
        return new User(token.name, 'Student');
    }

    private getDecodedToken(): any {
        const token = localStorage.getItem('access_token');
        if(!token) {
            return null;
        }
        return decode(token, null, true);
    }
}