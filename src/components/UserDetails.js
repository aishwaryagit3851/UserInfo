import React, { useState } from 'react';
import Album from './Album';
import Post from './Post'

const UserDetails = (props) => {
    const { person } = props;
    const [albumToggle, setAlbumToggle] = useState(false)
    const [postToggle, setPostToggle] = useState(false)
    return (
        <>

            <div className='containers p-3'>
                
                    <div className='details'>
                        <div><h3>User Detsils</h3></div>
                        <div className='details-container'>
                        <p>ID      :{person.id}</p>
                        <p>NAME    :{person.name}</p>
                        <p>USERNAME:{person.username}</p>
                       <p>EMAIL    :{person.email}</p>
                        <p>PHONE   :{person.phone}</p>
                        <p>ADDRESS :{person.address.city}</p>
                        <p>COMPANY :{person.company.name}</p>
                        </div>


                    </div>
                    
                    <div className='album'>
                        <button className="btn mt-2 px-3 py-2 btn-dark" onClick={() => {
                            setAlbumToggle(!albumToggle);
                        }}>Albums</button>{
                            albumToggle && <Album id={person.id} />
                        }

                    </div>
                
                <div className='post'>
                <button className="btn mt-2 px-3 py-2 btn-dark" onClick={() => {
                            setPostToggle(!postToggle);
                        }}>Posts</button>{
                            postToggle && <Post id={person.id} />
                        }
                
                </div>
                
                
            </div>
        </>
    )


}
export default UserDetails;