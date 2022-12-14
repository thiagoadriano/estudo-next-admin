import InputGroup from "../components/inputGroup";
import {FormEvent, useEffect, useState} from "react";
import {IcoWarn} from "../icons";
import NotifyError from "../components/notifyError";
import useAuth from "../data/hook/useAuth";

enum TypeMode {
    login,
    register
}

export default function LoginPage() {
    const {loginGoogle, login, register} = useAuth();

    const [typeMode, setTypeMode] = useState<TypeMode>(TypeMode.login);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msgError, setMsgError] = useState<string|null>(null);

    const title = typeMode === TypeMode.login ? 'Entre com a sua conta' : 'Cadastre-se na plataforma';
    const btnLabel = typeMode === TypeMode.login ? 'Entrar' : 'Cadastrar';
    const labelBtnMode = typeMode === TypeMode.login ? 'Quero me cadastrar' : 'Quero logar';

    async function submit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setMsgError(null);

        try {
            if (typeMode === TypeMode.login) {
               await login!(email, pass);
            } else {
               await register!(email, pass);
            }
        } catch (e) {
            setMsgError((e as Error).message)
        }

    }


    return (
        <div className={`
            flex flex-row h-screen 
            items-center justify-center
        `}>
            <div className="md:w-1/2 hidden md:block lg:w-2/3">
                <img
                    src="https://source.unsplash.com/random?count=1&topics=4"
                    alt="Belas imagens. Fonte: unsplash"
                    className="h-screen w-full object-cover"
                    loading="eager"
                />
            </div>
            <form onSubmit={submit} className="w-full p-4 md:w-1/2 md:p-20 lg:w-1/3">
                <h1 className="text-3xl font-bold mb-5">{title}</h1>
                <NotifyError error={msgError}/>
                <InputGroup label="Email" value={email} type="email" onChange={setEmail} required/>
                <InputGroup label="Senha" value={pass} type="password" onChange={setPass} required/>
                <div className="flex flex-col">
                    <button type="submit" className={`
                        w-full bg-indigo-500 hover:bg-indigo-400
                        text-white rounded-lg px-4 py-3 mt-6
                    `}>{btnLabel}</button>

                    <hr className="my-6 border-gray-300 w-full" />

                    <button type="button" className={`
                        w-full bg-red-500 hover:bg-red-400
                        text-white rounded-lg px-4 py-3
                    `} onClick={loginGoogle}>{typeMode === TypeMode.login ? 'Entrar' : 'Cadastrar' } com Google</button>

                    <div className="flex justify-center mt-5 text-sm cursor-pointer text-blue-500">
                        {
                            typeMode === TypeMode.login ? (
                                    <p onClick={() => setTypeMode(TypeMode.register)}>Novo por aqui? Crie uma conta gratuita.</p>
                                ) :
                                (
                                    <p onClick={() => setTypeMode(TypeMode.login)}>Já faz parte da comunidade? Acesse a sua conta.</p>
                                )
                        }
                    </div>


                </div>
            </form>
        </div>
    );
}
