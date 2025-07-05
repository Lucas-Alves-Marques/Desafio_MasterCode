import { createContext, useContext, useEffect, useState } from 'react';
import dataInicial from '../../public/Database.json';

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {

    const [dataBase, setDatabase] = useState(dataInicial);

    const adicionarUsuario = (novoUsuario) => {

        setDatabase(prev => ({

            ...prev,
            users: [...prev.users, novoUsuario]

        }));

    };

    const editarUsuario = (index, dadosAtualizados) => {

        setDatabase(prev => {

            const novosUsuarios = [...prev.users];

            novosUsuarios[index] = { ...novosUsuarios[index], ...dadosAtualizados };

            return { ...prev, users: novosUsuarios };

        });

    };

    const removerUsuario = (index) => {

        setDatabase(prev => {

            const novosUsuarios = [...prev.users];

            novosUsuarios.splice(index, 1);

            return { ...prev, users: novosUsuarios };

        });

    };

    return (

        <DatabaseContext.Provider
            value={{ dataBase, adicionarUsuario, editarUsuario, removerUsuario }}>

            {children}

        </DatabaseContext.Provider>

    );

}

export function useDatabase() {

    return useContext(DatabaseContext);

}