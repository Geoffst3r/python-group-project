import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { deleteServer, getServers } from '../../store/servers';
import AddServerModal from '../AddServerModal';
import './ServerPage.css'


const Server = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    const handleDelete = () => {
        dispatch(deleteServer())
    }

    let servers = useSelector(state => {
        return state.servers.serversArray
    })

    if (servers) {
        return (
            <>

                <div className='ServerContainer'>
                    <ul className="Bar">
                        {servers.map(server => {
                            return (
                                <li>
                                    <NavLink to={`/channels/${server.serverId}`}><button className='server-buttons'>{server.title}</button></NavLink>
                                    <button onClick={handleDelete}>Delete</button>
                                </li>
                            )
                        })}
                        <li>
                            <AddServerModal />
                        </li>
                        <li>
                            <button className='add-server-button server-buttons'>Add Server</button>
                        </li>
                    </ul >

                </div>
            </>
        )
    }
    return ('no servers :(')
}

export default Server;
