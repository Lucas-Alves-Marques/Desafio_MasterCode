import { createContext, useContext, useEffect, useState } from 'react';
import dataInicial from '../../public/Database.json';

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {

    const [dataBase, setDatabase] = useState(dataInicial);

    const adicionarUsuario = (novoUsuario) => {

        setDatabase(prev => {

            const ultimoId = prev.users.length > 0
                ? Math.max(...prev.users.map(user => user.id))
                : 0;

            const usuarioComId = {

                ...novoUsuario,
                id: ultimoId + 1
            };

            return {
                ...prev,
                users: [...prev.users, usuarioComId]
            };
        });

    };

    const editarUsuario = (id, dadosAtualizados) => {

        setDatabase(prev => {

            const novosUsuarios = prev.users.map(user =>

                user.id === id ? { ...user, ...dadosAtualizados } : user

            );

            return { ...prev, users: novosUsuarios };

        });

    };

    const removerUsuario = (id) => {

        setDatabase(prev => {

            const novosUsuarios = prev.users.filter(user => user.id !== id);

            return { ...prev, users: novosUsuarios };

        });

    };

    const updateCustomerSer = (data) => {

        setDatabase(prev => ({

            ...prev,

            customerService: data

        }));

    };

    const updateCustomerSat = (data) => {

        setDatabase(prev => ({

            ...prev,

            satisfaction: data

        }));

    };

    const updateEquipment = (data) => {

        setDatabase(prev => ({

            ...prev,

            equipment: data

        }));

    };

    return (

        <DatabaseContext.Provider
            value={{
                dataBase, adicionarUsuario, editarUsuario, removerUsuario,
                updateCustomerSer, updateCustomerSat, updateEquipment
            }}>

            {children}

        </DatabaseContext.Provider>

    );

}

export function useDatabase() {

    return useContext(DatabaseContext);

}