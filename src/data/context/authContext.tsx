import {createContext, useEffect, useState} from "react";
import firebase from '../../firebase/config';
import User from "../../model/user";
import route from "next/router";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
interface iAuthContext {
    user?: User|null;
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
    login?: (email: string, password: string) => Promise<void>;
    register?: (email: string, password: string) => Promise<void>;
    isLoading?: boolean
}

const COOKIE_NAME = 'adminUser';
const AuthContext = createContext<iAuthContext>({});

async function firebaseUserToAppUser(user: firebase.User | null): Promise<User|null> {
    if (!user) return null;
    const token = await user.getIdToken();
    return {
        token,
        uid: user.uid,
        email: user.email!,
        nome: user.displayName!,
        imageProfile: user.photoURL!,
        provider: user.providerData.at(0)!.providerId
    }
}

function managerCookie(logged: boolean) {
    if (logged) {
        setCookie(COOKIE_NAME, true);
    } else {
        deleteCookie(COOKIE_NAME);
    }
}
export function AuthProvider({children}: any) {
    const [user, setUser] = useState<User|null>(null);
    const [isLoading, setIsLoading] = useState(true);

    async function configSession(userFirebase: firebase.User|null): Promise<string|null> {
        if (userFirebase?.email) {
            const user = await firebaseUserToAppUser(userFirebase);
            managerCookie(true);
            setIsLoading(false);
            setUser(user);
            return user?.email ?? null;
        } else {
            managerCookie(false);
            setIsLoading(false);
            return null;
        }
    }

    async function loginGoogle() {
        try {
            setIsLoading(true);
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            );

            await configSession(resp.user)
            await route.push('/');

        } catch (e) {
            throw e;
        } finally {
            setIsLoading(false);
        }
    }

    async function login(email: string, password: string) {
        try {
            setIsLoading(true);
            const resp = await firebase.auth().signInWithEmailAndPassword(email, password);
            await configSession(resp.user)
            await route.push('/');
        } catch (e) {
            throw e;
        } finally {
            setIsLoading(false);
        }
    }

    async function register(email: string, password: string) {
        try {
            setIsLoading(true);
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await configSession(resp.user)
            await route.push('/');
        } catch (e) {
            throw e;
        } finally {
            setIsLoading(false);
        }
    }

    async function logout() {
        try {
            setIsLoading(true);
            await firebase.auth().signOut();
            await configSession(null);
            await route.push('/login');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(getCookie(COOKIE_NAME)) {
            const subscribe = firebase.auth().onIdTokenChanged(
                (user) => configSession(user)
            );
            return () => subscribe();
        } else {
            setIsLoading(false);
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loginGoogle,
            logout,
            login,
            isLoading,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;