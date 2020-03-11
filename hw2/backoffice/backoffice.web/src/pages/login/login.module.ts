import { Module } from '@framework';

import { LoginPage } from './pages';
import { LoginEmailComponent, LoginPasswordComponent } from './components';

@Module({
    pages: [LoginPage],
    components: [LoginEmailComponent, LoginPasswordComponent]
})
export class LoginModule {
}