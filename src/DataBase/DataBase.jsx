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

    const adicionarServiço = (novoServiço) => {

        setDatabase(prev => {

            const ultimoId = prev.services.length > 0
                ? Math.max(...prev.services.map(serv => serv.id))
                : 0;

            const serviceComId = {

                ...novoServiço,
                id: ultimoId + 1
            };

            return {
                ...prev,
                services: [...prev.services, serviceComId]
            };
        });

    };

    const editarServiço = (id, dadosAtualizados) => {

        setDatabase(prev => {

            const novosServicos = prev.services.map(service =>

                service.id === id ? { ...service, ...dadosAtualizados } : service

            );

            return { ...prev, services: novosServicos };

        });

    };

    const removerServiço = (id) => {

        setDatabase(prev => {

            const novosServicos = prev.services.filter(service => service.id !== id);

            return { ...prev, services: novosServicos };

        });

    };

    const adicionarCurso = (novoCurso) => {

        setDatabase(prev => {

            const ultimoId = prev.courses.length > 0
                ? Math.max(...prev.courses.map(course => course.id))
                : 0;

            const cursoComId = {

                ...novoCurso,
                id: ultimoId + 1
            };

            return {
                ...prev,
                courses: [...prev.courses, cursoComId]
            };
        });

    };

    const editarCurso = (id, dadosAtualizados) => {

        setDatabase(prev => {

            const novosCursos = prev.courses.map(course =>

                course.id === id ? { ...course, ...dadosAtualizados } : course

            );

            return { ...prev, courses: novosCursos };

        });

    };

    const removerCurso = (id) => {

        setDatabase(prev => {

            const novosCursos = prev.courses.filter(course => course.id !== id);

            return { ...prev, courses: novosCursos };

        });

    };

    return (

        <DatabaseContext.Provider
            value={{
                dataBase, adicionarUsuario, editarUsuario, removerUsuario,
                updateCustomerSer, updateCustomerSat, updateEquipment,
                adicionarServiço, editarServiço, removerServiço,
                adicionarCurso, editarCurso, removerCurso
            }}>

            {children}

        </DatabaseContext.Provider>

    );

}

export function useDatabase() {

    return useContext(DatabaseContext);

}