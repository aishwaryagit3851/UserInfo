import React, { useEffect, useState } from 'react'
import Popup from './Popup';
import UserDetails from './UserDetails';


const UserList = () => {
    const [user, setUser] = useState([]);
    const [popup,setPopup]=useState(false);
    const [tempUser, setTempUser] = useState({});
    const [popupUser,setPopupUser]=useState({});
    const fetchData = async () => {
        try {
            let url = 'https://jsonplaceholder.typicode.com/users';
            let data = await fetch(url);
            let parsedData = await data.json();
            setUser(parsedData);

        } catch (error) {
            console.log("error", error);
        }

    }
    useEffect(() => {
        fetchData();

    }, []);
    const handleClick = async (id) => {
        const url2 = `https://jsonplaceholder.typicode.com/users/${id}`;
        let data = await fetch(url2);
        let parsedData = await data.json();

        setTempUser(parsedData);
    }
    const handleMouseEnter=(person)=>{
        setPopup(true);
        setPopupUser(person);


    }


    return (
        <div className="userlistcontainer">
            <Popup trigger={popup} person={popupUser} setTrigger={setPopup}/>
            <div id='userList' className="userlist">
                <h3 className='mb-5'>USER LIST</h3>

                <table>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((element) => {
                                return <tr key={element.id} className='focus' onMouseEnter={()=>handleMouseEnter(element)}><td>{element.id}</td><td onClick={() => handleClick(element.id)}>{element.name}</td></tr>
                            })

                        }
                    </tbody>

                </table>
            </div>

            <div className='details'>
                {
                    Object.keys(tempUser).length !== 0 && <UserDetails person={tempUser} />
                }
            </div>
               
          



        </div>
    )

}

export default UserList;