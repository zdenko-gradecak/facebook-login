var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
export class FacebookLoginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'FacebookLogin',
            platforms: ['web'],
        });
    }
    login(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('FacebookLoginWeb.login', options);
            return new Promise((resolve, reject) => {
                var _a;
                FB.login(response => {
                    console.debug('FB.login', response);
                    if (response.status === 'connected') {
                        resolve({
                            accessToken: {
                                token: response.authResponse.accessToken,
                            },
                        });
                    }
                    else {
                        reject({
                            accessToken: {
                                token: null,
                            },
                        });
                    }
                }, {
                    scope: options.permissions.join(','),
                    auth_type: (_a = options.authType) !== null && _a !== void 0 ? _a : undefined,
                });
            });
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                FB.logout(() => resolve());
            });
        });
    }
    getCurrentAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                FB.getLoginStatus(response => {
                    if (response.status === 'connected') {
                        const result = {
                            accessToken: {
                                applicationId: null,
                                declinedPermissions: [],
                                expires: null,
                                isExpired: null,
                                lastRefresh: null,
                                permissions: [],
                                token: response.authResponse.accessToken,
                                userId: response.authResponse.userID,
                            },
                        };
                        resolve(result);
                    }
                    else {
                        reject({
                            accessToken: {
                                token: null,
                            },
                        });
                    }
                });
            });
        });
    }
}
const FacebookLogin = new FacebookLoginWeb();
export { FacebookLogin };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FacebookLogin);
//# sourceMappingURL=web.js.map